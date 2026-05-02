resource "cloudflare_pages_project" "app" {
  account_id        = var.cloudflare_account_id
  name              = var.project_name
  production_branch = "main"

  source {
    type = "github"
    config {
      owner                         = var.github_owner
      repo_name                     = var.github_repo
      production_branch             = "main"
      pr_comments_enabled           = true
      deployments_enabled           = true
      production_deployment_enabled = false
      preview_deployment_setting    = "custom"
      preview_branch_includes       = ["*"]
      preview_branch_excludes       = ["main"]
    }
  }

  build_config {
    build_command   = "npm run build:cf"
    destination_dir = ".vercel/output/static"
  }

  deployment_configs {
    production {
      compatibility_date  = "2024-12-30"
      compatibility_flags = ["nodejs_compat"]
      analytics_engine_datasets = {
        ANALYTICS = "good_luck_island_events"
      }
      environment_variables = {
        NEXT_PUBLIC_AUTH0_DOMAIN             = var.next_public_auth0_domain
        NEXT_PUBLIC_AUTH0_CLIENT_ID          = var.next_public_auth0_client_id
        NEXT_PUBLIC_SUPABASE_URL             = var.next_public_supabase_url
        NEXT_PUBLIC_SUPABASE_ANON_KEY        = var.next_public_supabase_anon_key
        NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN     = var.next_public_shopify_store_domain
        NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN = var.next_public_shopify_storefront_token
        NEXT_PUBLIC_SHOPIFY_COLLECTION_ID    = var.next_public_shopify_collection_id
      }
    }
    preview {
      compatibility_date  = "2024-12-30"
      compatibility_flags = ["nodejs_compat"]
      analytics_engine_datasets = {
        ANALYTICS = "good_luck_island_events"
      }
      environment_variables = {
        NEXT_PUBLIC_AUTH0_DOMAIN             = var.next_public_auth0_domain
        NEXT_PUBLIC_AUTH0_CLIENT_ID          = var.next_public_auth0_client_id
        NEXT_PUBLIC_SUPABASE_URL             = var.next_public_supabase_url
        NEXT_PUBLIC_SUPABASE_ANON_KEY        = var.next_public_supabase_anon_key
        NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN     = var.next_public_shopify_store_domain
        NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN = var.next_public_shopify_storefront_token
        NEXT_PUBLIC_SHOPIFY_COLLECTION_ID    = var.next_public_shopify_collection_id
      }
    }
  }
}
