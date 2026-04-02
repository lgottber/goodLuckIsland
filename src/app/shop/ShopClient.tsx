"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { createCart, type ShopifyVariant } from "../../lib/shopify.ts";
import "./shop.css";

const NavBar = dynamic(() => import("../../components/NavBar.jsx"), {
  ssr: false,
});

const DONATION_AMOUNTS = ["$5", "$10", "$25", "$50", "$100", "Custom"];

const FORMAT_ICONS: Record<string, string> = {
  paperback: "📖",
  ebook: "📱",
  bundle: "🎁",
};

type Props = {
  variants: ShopifyVariant[];
};

export default function ShopClient({ variants }: Props) {
  const formats = variants.map((v) => ({
    id: v.title.toLowerCase().replace(/\s+/g, "-"),
    icon: FORMAT_ICONS[v.title.toLowerCase()] ?? "📦",
    label: v.title,
    price: `$${parseFloat(v.priceV2.amount).toFixed(2)}`,
    variantId: v.id,
  }));

  const [selectedFormat, setSelectedFormat] = useState(
    formats[0]?.id ?? "paperback",
  );
  const [donationAmount, setDonationAmount] = useState("$25");
  const [customAmount, setCustomAmount] = useState("");
  const [frequency, setFrequency] = useState("one-time");
  const [buying, setBuying] = useState(false);
  const [buyError, setBuyError] = useState<string | null>(null);

  const activeFormat = formats.find((f) => f.id === selectedFormat) ??
    formats[0];

  const activeAmount = donationAmount === "Custom"
    ? customAmount ? `$${customAmount}` : "Custom"
    : donationAmount;

  async function handleBuy() {
    if (!activeFormat) return;
    setBuying(true);
    setBuyError(null);
    try {
      const checkoutUrl = await createCart(activeFormat.variantId);
      globalThis.location.href = checkoutUrl;
    } catch {
      setBuyError("Something went wrong. Please try again.");
      setBuying(false);
    }
  }

  return (
    <>
      <NavBar activePage="shop" />

      <div className="shop-page">
        <div className="shop-content">
          <ShopifyCollection />
        </div>
      </div>
    </>
  );
}
