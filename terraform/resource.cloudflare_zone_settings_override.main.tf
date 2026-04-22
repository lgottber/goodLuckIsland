resource "cloudflare_zone_settings_override" "main" {
  zone_id = var.cloudflare_zone_id

  settings {
    # TLS
    ssl              = "full"
    always_use_https = "on"
    min_tls_version  = "1.2"

    # Performance — caching is managed by Cloudflare Pages natively
    brotli = "on"

    # Security
    security_level = "medium"
  }
}
