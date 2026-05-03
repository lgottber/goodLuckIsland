ifneq (,$(wildcard ./.env.local))
  include .env.local
  export
endif

.PHONY: tf-init tf-plan tf-apply tf-destroy tf-import-pages sync-secrets delete-secrets

tf-init:
	terraform -chdir=terraform init

tf-import-pages:
	terraform -chdir=terraform import cloudflare_pages_project.app $(CLOUDFLARE_ACCOUNT_ID)/good-luck-island

tf-plan:
	terraform -chdir=terraform plan

tf-apply:
	terraform -chdir=terraform apply -auto-approve

tf-destroy:
	terraform -chdir=terraform destroy -auto-approve

sync-secrets:
	gh secret set -f .env.local

delete-secrets:
	gh secret list | awk '{print $$1}' | xargs -I {} gh secret delete {}
