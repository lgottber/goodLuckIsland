resource "cloudflare_zero_trust_access_application" "admin" {
  account_id       = var.cloudflare_account_id
  name             = "Good Luck Island — Admin"
  domain           = "${var.custom_domain}/admin*"
  type             = "self_hosted"
  session_duration = "24h"

  # Branding — defaults to the app's palette
  logo_url        = var.access_logo_url
  bg_color        = var.access_bg_color
  header_bg_color = var.access_header_bg_color

  # Shown on the default blocked/denied screen
  custom_deny_message = "you do not have access to this application"
}
