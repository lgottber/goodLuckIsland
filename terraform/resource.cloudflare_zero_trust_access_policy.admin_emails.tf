resource "cloudflare_zero_trust_access_policy" "admin_emails" {
  application_id = cloudflare_zero_trust_access_application.admin.id
  account_id     = var.cloudflare_account_id
  name           = "Admin email allowlist"
  precedence     = 1
  decision       = "allow"

  include {
    email = var.admin_emails
  }
}
