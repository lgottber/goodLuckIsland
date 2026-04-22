output "pages_url" {
  description = "Default Cloudflare Pages URL for the project"
  value       = "https://${cloudflare_pages_project.app.name}.pages.dev"
}

output "custom_domain_url" {
  description = "Custom domain URL once DNS propagates"
  value       = "https://${cloudflare_pages_domain.app.domain}"
}
