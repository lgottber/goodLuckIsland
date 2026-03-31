import process from "node:process";
export type ShopifyVariant = {
  id: string;
  title: string;
  priceV2: { amount: string; currencyCode: string };
};

type ShopifyProduct = {
  variants: { edges: { node: ShopifyVariant }[] };
};

const ENDPOINT =
  `https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}/api/2024-01/graphql.json`;
const TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN!;

async function storefrontFetch<T>(
  query: string,
  variables?: Record<string, unknown>,
  options?: RequestInit,
): Promise<T> {
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": TOKEN,
    },
    body: JSON.stringify({ query, variables }),
    ...options,
  });
  if (!res.ok) throw new Error(`Shopify fetch failed: ${res.status}`);
  const json = await res.json();
  if (json.errors) throw new Error(json.errors[0].message);
  return json.data as T;
}

const GET_PRODUCT = `
  query GetProduct($id: ID!) {
    node(id: $id) {
      ... on Product {
        variants(first: 10) {
          edges {
            node {
              id
              title
              priceV2 {
                amount
                currencyCode
              }
            }
          }
        }
      }
    }
  }
`;

export async function fetchProduct(numericId: string): Promise<ShopifyProduct> {
  const gid = `gid://shopify/Product/${numericId}`;
  const data = await storefrontFetch<{ node: ShopifyProduct }>(
    GET_PRODUCT,
    { id: gid },
  );
  if (!data.node) throw new Error(`Product ${numericId} not found in Shopify`);
  return data.node;
}

const CART_CREATE = `
  mutation CartCreate($variantId: ID!) {
    cartCreate(input: { lines: [{ merchandiseId: $variantId, quantity: 1 }] }) {
      cart {
        checkoutUrl
      }
      userErrors {
        field
        message
      }
    }
  }
`;

export async function createCart(variantId: string): Promise<string> {
  const data = await storefrontFetch<{
    cartCreate: {
      cart: { checkoutUrl: string } | null;
      userErrors: { field: string; message: string }[];
    };
  }>(CART_CREATE, { variantId });

  if (data.cartCreate.userErrors.length > 0) {
    throw new Error(data.cartCreate.userErrors[0].message);
  }
  if (!data.cartCreate.cart) throw new Error("Cart creation returned null");
  return data.cartCreate.cart.checkoutUrl;
}
