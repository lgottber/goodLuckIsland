import ShopClient from "./ShopClient.tsx";

export const revalidate = 3600;

export default function ShopPage() {
  return <ShopClient />;
}
