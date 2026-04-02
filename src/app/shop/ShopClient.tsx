"use client";

import dynamic from "next/dynamic";
import ShopifyCollection from "../../components/ShopifyCollection.tsx";
import "./shop.css";

const NavBar = dynamic(() => import("../../components/NavBar.jsx"), {
  ssr: false,
});

export default function ShopClient() {
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
