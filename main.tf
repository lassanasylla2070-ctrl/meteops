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

# Création d’un réseau privé OpenStack pour isoler l’infrastructure.
# Ce réseau permet de connecter les ressources entre elles de manière sécurisée.

resource "openstack_networking_network_v2" "meteops_network" {
  name           = "meteops-network"  # Nom du réseau
  admin_state_up = true               # Active le réseau dès sa création
}

#############################################
# SOUS-RÉSEAU OPENSTACK
#############################################

# Création d’un sous-réseau dans le réseau privé.
# Il définit une plage d’adresses IP utilisable par les ressources.

resource "openstack_networking_subnet_v2" "meteops_subnet" {

  name       = "meteops-subnet"

  # On lie le subnet au réseau créé précédemment
  network_id = openstack_networking_network_v2.meteops_network.id

  # Plage IP privée utilisée dans le réseau interne
  cidr       = "192.168.100.0/24"

  # IPv4 uniquement
  ip_version = 4
}

# Déclaration d’un groupe de sécurité OpenStack
# Ce groupe agit comme un firewall (pare-feu) pour contrôler le trafic réseau

resource "openstack_networking_secgroup_v2" "meteops_firewall" {

  # Nom du groupe de sécurité dans OpenStack
  # Attention : "default" est souvent déjà utilisé par OpenStack
  name        = "default"

  # Description du groupe de sécurité
  description = "Default security group"
}


