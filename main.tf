 
#############################################

# CONFIGURATION TERRAFORM - PROVIDERS

#############################################
 
# Ce bloc déclare les providers nécessaires à Terraform.

# Un provider = plugin qui permet à Terraform de communiquer avec une API (OVH, OpenStack, AWS, etc.)
 
terraform {

  required_providers {
 
    # Provider OVH : permet de gérer les ressources OVH (VPS, DNS, etc.)

    ovh = {

      source  = "ovh/ovh"

      version = "~> 0.34"   # Version compatible avec les mises à jour mineures

    }
 
    # Provider OpenStack : permet de gérer les ressources cloud OpenStack (réseau, VM, etc.)

    openstack = {

      source  = "terraform-provider-openstack/openstack"

      version = "~> 1.53"

    }

  }

}
 
#############################################

# CONFIGURATION DU PROVIDER OVH

#############################################
 
# Ce bloc configure l'accès à l'API OVH.

# Les identifiants sont stockés dans des variables (tfvars) pour éviter toute exposition sensible.
 
provider "ovh" {

  endpoint = "ovh-eu"  # Région OVH (Europe)
 
  # Authentification API OVH :

  # - application_key : identifiant de l'application

  # - application_secret : clé secrète

  # - consumer_key : autorise les actions sur le compte utilisateur

  application_key    = var.ovh_application_key

  application_secret = var.ovh_application_secret

  consumer_key       = var.ovh_consumer_key

}
 
#############################################

# CONFIGURATION DU PROVIDER OPENSTACK

#############################################
 
# Ce provider permet de gérer les ressources OpenStack hébergées chez OVH Cloud.

# Il sert notamment à créer des réseaux, sous-réseaux et machines virtuelles.
 
provider "openstack" {

  auth_url  = "https://auth.cloud.ovh.net/v3"  # Endpoint d'authentification OpenStack
 
  # Identifiants OpenStack (sécurisés via variables)

  user_name = var.os_username

  password  = var.os_password

  tenant_id = var.os_tenant_id
 
  # Région du datacenter utilisé (OVH Paris ici)

  region    = "EU-WEST-PAR"

}
 
#############################################

# RESSOURCE : VPS OVH EXISTANT

#############################################
 
# Cette ressource permet à Terraform de "reprendre en gestion" un VPS déjà existant.

# IMPORTANT : Terraform ne crée pas le VPS ici, il le référence et le pilote.
 
resource "ovh_vps" "meteops" {
 
  ovh_subsidiary = "FR"  # Indique la filiale OVH (France)
 
  # Bloc lifecycle :

  # Permet de contrôler le comportement de Terraform lors des changements.

  lifecycle {
 
    # On ignore certaines modifications pour éviter les conflits avec OVH

    # (ces paramètres peuvent être gérés directement côté OVH)

    ignore_changes = [

      display_name,

      plan,

      model,

      monitoring_ip_blocks

    ]

  }

}
 
#############################################

# RÉSEAU OPENSTACK

#############################################
 
# Création d'un réseau privé OpenStack pour isoler l'infrastructure.

# Ce réseau permet de connecter les ressources entre elles de manière sécurisée.
 
resource "openstack_networking_network_v2" "meteops_network" {

  name           = "meteops-network"  # Nom du réseau

  admin_state_up = true               # Active le réseau dès sa création

}
 
#############################################

# SOUS-RÉSEAU OPENSTACK

#############################################
 
# Création d'un sous-réseau dans le réseau privé.

# Il définit une plage d'adresses IP utilisable par les ressources.
 
resource "openstack_networking_subnet_v2" "meteops_subnet" {
 
  name = "meteops-subnet"
 
  # On lie le subnet au réseau créé précédemment

  network_id = openstack_networking_network_v2.meteops_network.id
 
  # Plage IP privée utilisée dans le réseau interne

  cidr = "192.168.100.0/24"
 
  # IPv4 uniquement

  ip_version = 4

}
 
#############################################

# ROUTEUR - CONNEXION AU RÉSEAU EXTERNE

#############################################
 
# Le sous-réseau privé créé ci-dessus n'a, par défaut, aucune route vers Internet.

# Ce routeur connecte le sous-réseau privé au réseau public OVH (Ext-Net),

# ce qui est indispensable pour pouvoir associer une floating IP à l'instance.
 
data "openstack_networking_network_v2" "ext_net" {

  name = "Ext-Net"

}
 
resource "openstack_networking_router_v2" "meteops_router" {

  name                = "meteops-router"

  external_network_id = data.openstack_networking_network_v2.ext_net.id

}
 
resource "openstack_networking_router_interface_v2" "meteops_router_interface" {

  router_id = openstack_networking_router_v2.meteops_router.id

  subnet_id = openstack_networking_subnet_v2.meteops_subnet.id

}
 
#############################################

# GROUPE DE SÉCURITÉ (PARE-FEU)

#############################################
 
# Déclaration d'un groupe de sécurité OpenStack

# Ce groupe agit comme un firewall (pare-feu) pour contrôler le trafic réseau.

# Ce groupe "default" existe déjà nativement sur le projet OVH (quota limité),

# il est donc importé et géré plutôt que recréé.
 
resource "openstack_networking_secgroup_v2" "meteops_firewall" {
 
  # Nom du groupe de sécurité dans OpenStack

  # Attention : "default" est souvent déjà utilisé par OpenStack

  name = "default"
 
  # Description du groupe de sécurité

  description = "Default security group"

}
 
#############################################

# CLÉ SSH

#############################################
 
# Clé SSH publique injectée dans l'instance à sa création,

# permettant de s'y connecter sans mot de passe.
 
resource "openstack_compute_keypair_v2" "meteops_keypair" {

  name       = "meteops-key"

  public_key = file("~/.ssh/id_rsa.pub")

}
 
#############################################

# INSTANCE COMPUTE (LE SERVEUR)

#############################################
 
# Création d'une nouvelle instance Cloud (machine virtuelle) depuis zéro,

# contrairement au VPS importé qui existait déjà.
 
resource "openstack_compute_instance_v2" "meteops_instance" {

  name            = "meteops-instance"

  image_id        = "b9fbb2e2-51d7-4ded-a8bb-c0442d101580" # Debian 12

  flavor_id       = "91fa3187-0f7d-489e-a75e-a7f6541482ee" # b3-8 (le plus petit format)

  key_pair        = openstack_compute_keypair_v2.meteops_keypair.name

  security_groups = [openstack_networking_secgroup_v2.meteops_firewall.name]
 
  network {

    uuid = openstack_networking_network_v2.meteops_network.id

  }

}
 
output "meteops_instance_ip" {

  value = openstack_compute_instance_v2.meteops_instance.network[0].fixed_ip_v4

}
 
#############################################

# IP FLOTTANTE (IP PUBLIQUE)

#############################################
 
# Une floating IP est nécessaire pour rendre l'instance accessible

# depuis Internet (l'IP créée par défaut sur le réseau privé ne l'est pas).
 
resource "openstack_networking_floatingip_v2" "meteops_floating_ip" {

  pool = "Ext-Net"

}
 
resource "openstack_compute_floatingip_associate_v2" "meteops_fip_associate" {

  floating_ip = openstack_networking_floatingip_v2.meteops_floating_ip.address

  instance_id = openstack_compute_instance_v2.meteops_instance.id
 
  depends_on = [

    openstack_networking_router_interface_v2.meteops_router_interface

  ]

}
 
output "meteops_floating_ip" {

  value = openstack_networking_floatingip_v2.meteops_floating_ip.address

}

 
