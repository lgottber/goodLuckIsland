.PHONY: tf-init tf-plan tf-apply tf-fix-state tf-import-pages sync-secrets delete-secrets

tf-init:
	terraform -chdir=terraform init
	$(MAKE) tf-fix-state

tf-fix-state:
	terraform -chdir=terraform state rm cloudflare_zone_settings_override.main || true
	terraform -chdir=terraform import cloudflare_zone_settings_override.main c2f88eebd6d4be35f7149a47b83a0513

tf-import-pages:
	terraform -chdir=terraform import cloudflare_pages_project.app $(CLOUDFLARE_ACCOUNT_ID)/good-luck-island

tf-plan:
	terraform -chdir=terraform plan

tf-apply:
	terraform -chdir=terraform apply -auto-approve

sync-secrets:
	gh secret set -f .env.local

delete-secrets:
	gh secret list | awk '{print $$1}' | xargs -I {} gh secret delete {}
