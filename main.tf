# Bloc de configuration de Terraform lui-même :
# on déclare ici quel "provider" (plugin) on va utiliser, et sa version.
terraform {
  required_providers {
    ovh = {
      source  = "ovh/ovh" # nom officiel du provider OVH dans le registre Terraform
      version = "~> 0.34" # accepte toute version 0.34.x (sécurité contre les ruptures de compatibilité)
    }
  }
}

# Configuration du provider OVH :
# c'est ce bloc qui permet à Terraform de s'authentifier auprès de l'API OVH.
# Les valeurs (var.xxx) viennent du fichier terraform.tfvars, jamais écrites en dur ici.
provider "ovh" {
  endpoint           = "ovh-eu"                   # zone OVH Europe (il existe aussi ovh-us, ovh-ca)
  application_key    = var.ovh_application_key    # clé publique de notre "token" API OVH
  application_secret = var.ovh_application_secret # secret associé (jamais à partager)
  consumer_key       = var.ovh_consumer_key       # clé qui autorise les actions sur notre compte
}
# Cette ressource permet à Terraform de gérer un VPS classique OVH déjà existant.
# "service_name" est l'identifiant unique du VPS (visible dans le Manager OVH,
# section Bare Metal Cloud > VPS) — il sert à dire à Terraform QUEL VPS gérer.
# "display_name" est juste le nom affiché dans l'interface OVH (cosmétique).
# Attention : cette ressource ne CRÉE pas de nouveau VPS, elle gère seulement
# certains attributs d'un VPS qui existe déjà sur ton compte.
resource "ovh_vps" "meteops" {
  ovh_subsidiary = "FR"
 
  lifecycle {
    ignore_changes = [display_name, plan, model, monitoring_ip_blocks]
  }
} 
