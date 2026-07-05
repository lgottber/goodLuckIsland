resource "cloudflare_pages_project" "app" {
  account_id        = var.cloudflare_account_id
  name              = var.project_name
  production_branch = "main"

  build_config = {
    build_command   = "npm run build:cf"
    destination_dir = ".vercel/output/static"
  }

  deployment_configs = {
    production = {
      compatibility_date  = "2024-12-30"
      compatibility_flags = ["nodejs_compat"]
      analytics_engine_datasets = {
        ANALYTICS = { dataset = "good_luck_island_events" }
      }
      env_vars = {
        NEXT_PUBLIC_AUTH0_DOMAIN             = { type = "plain_text", value = var.next_public_auth0_domain }
        NEXT_PUBLIC_AUTH0_CLIENT_ID          = { type = "plain_text", value = var.next_public_auth0_client_id }
        NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN     = { type = "plain_text", value = var.next_public_shopify_store_domain }
        NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN = { type = "plain_text", value = var.next_public_shopify_storefront_token }
        NEXT_PUBLIC_SHOPIFY_COLLECTION_ID    = { type = "plain_text", value = var.next_public_shopify_collection_id }
      }
    }
    preview = {
      compatibility_date  = "2024-12-30"
      compatibility_flags = ["nodejs_compat"]
      analytics_engine_datasets = {
        ANALYTICS = { dataset = "good_luck_island_events" }
      }
      env_vars = {
        NEXT_PUBLIC_AUTH0_DOMAIN             = { type = "plain_text", value = var.next_public_auth0_domain }
        NEXT_PUBLIC_AUTH0_CLIENT_ID          = { type = "plain_text", value = var.next_public_auth0_client_id }
        NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN     = { type = "plain_text", value = var.next_public_shopify_store_domain }
        NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN = { type = "plain_text", value = var.next_public_shopify_storefront_token }
        NEXT_PUBLIC_SHOPIFY_COLLECTION_ID    = { type = "plain_text", value = var.next_public_shopify_collection_id }
      }
    }
  }
}
