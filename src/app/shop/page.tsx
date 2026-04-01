import { fetchProduct } from "../../lib/shopify.ts";
import ShopClient from "./ShopClient.tsx";
import process from "node:process";

// export const revalidate = 3600; // re-fetch from Shopify at most once per hour
export const revalidate = 60;

export default async function ShopPage() {
  const product = await fetchProduct(
    process.env.SHOPIFY_PRODUCT_ID!,
  );
  const variants = product.variants.edges.map((e) => e.node);
  return <ShopClient variants={variants} />;
}
