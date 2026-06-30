#############################################
# VARIABLES OVH - AUTHENTIFICATION API
#############################################

# Ces variables contiennent les identifiants nécessaires pour se connecter à l’API OVH.
# Elles sont marquées "sensitive" pour éviter toute exposition dans les logs Terraform.

# Clé publique de l’application OVH
# Générée via : https://eu.api.ovh.com/createToken/
variable "ovh_application_key" {
  description = "Clé Application générée sur OVH API (token public)"
  type        = string
  sensitive   = true
}

# Secret associé à l’application OVH
# Permet de signer les requêtes API de manière sécurisée
variable "ovh_application_secret" {
  description = "Secret Application associé à la clé OVH"
  type        = string
  sensitive   = true
}

# Consumer Key : autorise l’accès et les actions sur le compte OVH
# Elle définit les permissions accordées lors de la création du token
variable "ovh_consumer_key" {
  description = "Consumer Key autorisant les actions sur le compte OVH"
  type        = string
  sensitive   = true
}

#############################################
# VARIABLES OPENSTACK - AUTHENTIFICATION
#############################################

# Ces variables permettent l’authentification auprès du cloud OpenStack OVH.

# Nom d’utilisateur OpenStack
variable "os_username" {
  description = "Nom d'utilisateur OpenStack"
  type        = string
  sensitive   = true   # Empêche l'affichage dans les logs Terraform
}

# Mot de passe OpenStack
variable "os_password" {
  description = "Mot de passe associé au compte OpenStack"
  type        = string
  sensitive   = true
}

# ID du projet OpenStack (tenant)
# Il identifie le projet dans lequel les ressources seront créées
variable "os_tenant_id" {
  description = "ID du projet OpenStack (tenant)"
  type        = string
  sensitive   = true
}
