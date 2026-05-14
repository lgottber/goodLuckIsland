# Good Luck Island Collective

A self-help education platform for Gen X professionals.

## Stack

- **Framework**: Next.js (TypeScript)
- **Auth**: Auth0
- **Database**: Supabase
- **Infrastructure**: Cloudflare Pages (deployed via Wrangler)
- **IaC**: Terraform (Cloudflare provider)

## Getting started

```bash
npm install
npm run dev
```

## Infrastructure

Terraform configs live in `terraform/`. Use the npm scripts to manage:

```bash
npm run tf:plan          # preview changes
npm run tf:apply         # apply changes
npm run secrets:sync     # push .env.local secrets to GitHub
```
