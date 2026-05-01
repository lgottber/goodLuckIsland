resource "cloudflare_pages_project" "app" {
  account_id        = var.cloudflare_account_id
  name              = var.project_name
  production_branch = "main"

  deployment_configs {
    production {
      compatibility_date  = "2024-12-30"
      compatibility_flags = ["nodejs_compat"]
      analytics_engine_datasets = {
        ANALYTICS = "good_luck_island_events"
      }
    }
    preview {
      compatibility_date  = "2024-12-30"
      compatibility_flags = ["nodejs_compat"]
      analytics_engine_datasets = {
        ANALYTICS = "good_luck_island_events"
      }
    }
  }
}
