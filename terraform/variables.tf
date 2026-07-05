variable "cloudflare_api_token" {
  description = "Cloudflare API token with Account:Cloudflare Pages:Edit, Zone:Edit, and Zone:Read permissions"
  type        = string
  sensitive   = true
}

variable "cloudflare_account_id" {
  description = "Cloudflare Account ID (found in the dashboard right sidebar)"
  type        = string
}

variable "cloudflare_zone_id" {
  description = "Cloudflare Zone ID for the domain"
  type        = string
}

variable "project_name" {
  description = "Cloudflare Pages project name (becomes <project>.pages.dev)"
  type        = string
  default     = "good-luck-island"
}

variable "subdomain" {
  description = "Subdomain to point to Pages (use @ for the root domain)"
  type        = string
  default     = "good-luck-island"
}

variable "custom_domain" {
  description = "Custom domain to attach to the Pages project (e.g. goodluckisland.com)"
  type        = string
}

variable "access_logo_url" {
  description = "URL of the logo shown on the Cloudflare Access login page (null = Cloudflare default)"
  type        = string
  default     = null
}

variable "access_bg_color" {
  description = "Page background colour on the Access login screen (hex)"
  type        = string
  default     = "#f0ebe0"  # --cream from globals.css
}

variable "access_header_bg_color" {
  description = "Header bar colour on the Access login screen (hex)"
  type        = string
  default     = "#1e2d5a"  # --navy from globals.css
}

# App environment variables — injected into both production and preview builds

variable "next_public_auth0_domain" {
  description = "Auth0 tenant domain (e.g. your-tenant.us.auth0.com)"
  type        = string
  sensitive   = true
}

variable "next_public_auth0_client_id" {
  description = "Auth0 SPA client ID"
  type        = string
  sensitive   = true
}

variable "next_public_shopify_store_domain" {
  description = "Shopify storefront domain (e.g. your-store.myshopify.com)"
  type        = string
  sensitive   = true
}

variable "next_public_shopify_storefront_token" {
  description = "Shopify Storefront API access token"
  type        = string
  sensitive   = true
}

variable "next_public_shopify_collection_id" {
  description = "Shopify collection GID to display in the shop"
  type        = string
  sensitive   = true
}
