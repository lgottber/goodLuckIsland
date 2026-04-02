import { fetchProduct, type ShopifyVariant } from "../../lib/shopify.ts";
import ShopClient from "./ShopClient.tsx";
import process from "node:process";

export const revalidate = 3600;

const FALLBACK_VARIANTS: ShopifyVariant[] = [
  {
    id: "paperback",
    title: "Paperback",
    priceV2: { amount: "24.99", currencyCode: "USD" },
  },
  {
    id: "ebook",
    title: "eBook",
    priceV2: { amount: "12.99", currencyCode: "USD" },
  },
  {
    id: "bundle",
    title: "Bundle",
    priceV2: { amount: "29.99", currencyCode: "USD" },
  },
];

export default async function ShopPage() {
  const productId = process.env.SHOPIFY_PRODUCT_ID;
  const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;

  let variants = FALLBACK_VARIANTS;
  if (productId && domain) {
    try {
      const product = await fetchProduct(productId);
      variants = product.variants.edges.map((e) => e.node);
    } catch {
      // Shopify not yet configured — use fallback prices
    }
  }

  return <ShopClient variants={variants} />;
}
