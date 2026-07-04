"use client";

import NavBar from "../../components/NavBarDynamic";
import ShopifyCollection from "../../components/ShopifyCollection";
import "./shop.css";

export default function ShopPage() {
  return (
    <>
      <NavBar activePage="shop" largeAvatar />

      <div className="shop-page">
        <div className="shop-content">
          <ShopifyCollection />
        </div>
      </div>
    </>
  );
}
