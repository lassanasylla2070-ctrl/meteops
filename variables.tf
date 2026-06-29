# ============================================================
# VARIABLES.TF — Déclaration des variables sensibles OVH
# ============================================================
# Ce fichier déclare les variables que Terraform attend.
# Il ne contient AUCUNE valeur réelle : juste le "type" et le fait
# qu'elles sont sensibles (donc masquées dans les logs/plan/apply).
# Les vraies valeurs sont remplies dans terraform.tfvars.
# ============================================================

# --- Clé Application OVH ---
variable "ovh_application_key" {
  description = "Clé Application générée sur https://eu.api.ovh.com/createToken/"
  type        = string
  sensitive   = true # Terraform masquera cette valeur dans les outputs/logs
}

# --- Secret Application OVH ---
variable "ovh_application_secret" {
  description = "Secret Application associé à la clé ci-dessus"
  type        = string
  sensitive   = true
}

# --- Consumer Key OVH ---
variable "ovh_consumer_key" {
  description = "Consumer Key qui autorise les actions sur ton compte OVH"
  type        = string
  sensitive   = true
}
