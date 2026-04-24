resource "cloudflare_pages_project" "app" {
  account_id        = var.cloudflare_account_id
  name              = var.project_name
  production_branch = "main"

  deployment_configs {
    production {
      compatibility_date  = "2024-09-23"
      compatibility_flags = ["nodejs_compat"]
    }
    preview {
      compatibility_date  = "2024-09-23"
      compatibility_flags = ["nodejs_compat"]
    }
  }
}
