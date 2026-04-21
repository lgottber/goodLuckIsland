resource "cloudflare_record" "app" {
  zone_id = var.cloudflare_zone_id
  name    = var.subdomain
  content = "${cloudflare_pages_project.app.name}.pages.dev"
  type    = "CNAME"
  proxied = true
  comment = "Good Luck Island — Cloudflare Pages via CDN"
}
