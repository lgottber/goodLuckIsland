.PHONY: tf-init tf-plan tf-apply tf-fix-state

tf-init:
	terraform -chdir=terraform init
	$(MAKE) tf-fix-state

tf-fix-state:
	terraform -chdir=terraform state rm cloudflare_zone_settings_override.main || true
	terraform -chdir=terraform import cloudflare_zone_settings_override.main c2f88eebd6d4be35f7149a47b83a0513

tf-plan:
	terraform -chdir=terraform plan

tf-apply:
	terraform -chdir=terraform apply -auto-approve
