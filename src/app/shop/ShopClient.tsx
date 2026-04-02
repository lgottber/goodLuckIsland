"use client";

import NavBar from "../../components/NavBar.jsx";
import ShopifyCollection from "../../components/ShopifyCollection.tsx";
import "./shop.css";

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
