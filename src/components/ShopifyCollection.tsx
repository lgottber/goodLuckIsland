"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";

declare global {
  export interface Window {
    ShopifyBuy: {
      buildClient: (
        config: { domain: string; storefrontAccessToken: string },
      ) => unknown;
      UI: {
        onReady: (
          client: unknown,
        ) => Promise<
          { createComponent: (type: string, options: unknown) => void }
        >;
      };
    };
  }
}

const BUTTON_STYLES = {
  "font-family": "Gill Sans, sans-serif",
  "font-size": "16px",
  "padding-top": "16px",
  "padding-bottom": "16px",
  color: "#f0ebe0",
  ":hover": { color: "#f0ebe0", "background-color": "#334d99" },
  "background-color": "#1e2d5a",
  ":focus": { "background-color": "#334d99" },
  "border-radius": "8px",
};

export default function ShopifyCollection() {
  const abortedRef = useRef(false);
  const initializedRef = useRef(false);

  function ShopifyBuyInit() {
    if (abortedRef.current || initializedRef.current) return;
    initializedRef.current = true;

    const client = globalThis.ShopifyBuy.buildClient({
      domain: process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN!,
      storefrontAccessToken: process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN!,
    });

    globalThis.ShopifyBuy.UI.onReady(client).then(function (ui) {
      if (abortedRef.current) return;
      ui.createComponent("collection", {
        id: process.env.NEXT_PUBLIC_SHOPIFY_COLLECTION_ID!,
        node: document.getElementById("collection-component-1775146534337"),
        moneyFormat: "%24%7B%7Bamount%7D%7D",
        options: {
          product: {
            styles: {
              product: {
                "@media (min-width: 601px)": {
                  "max-width": "calc(50% - 40px)",
                  "margin-left": "40px",
                  "margin-bottom": "50px",
                  width: "calc(50% - 40px)",
                },
                img: {
                  height: "calc(100% - 15px)",
                  position: "absolute",
                  left: "0",
                  right: "0",
                  top: "0",
                },
                imgWrapper: {
                  "padding-top": "calc(75% + 15px)",
                  position: "relative",
                  height: "0",
                },
              },
              title: {
                "font-family": "Gill Sans, sans-serif",
                "font-weight": "normal",
                "font-size": "20px",
                color: "#1e2d5a",
              },
              button: BUTTON_STYLES,
              quantityInput: {
                "font-size": "16px",
                "padding-top": "16px",
                "padding-bottom": "16px",
              },
              price: {
                "font-family": "Gill Sans, sans-serif",
                "font-size": "17px",
                color: "#1e2d5a",
              },
              compareAt: {
                "font-family": "Gill Sans, sans-serif",
                "font-size": "14.45px",
                color: "#1e2d5a",
              },
              unitPrice: {
                "font-family": "Gill Sans, sans-serif",
                "font-size": "14.45px",
                color: "#1e2d5a",
              },
            },
            text: { button: "Add to cart" },
          },
          productSet: {
            styles: {
              products: {
                "@media (min-width: 601px)": { "margin-left": "-40px" },
              },
            },
          },
          modalProduct: {
            contents: {
              img: false,
              imgWithCarousel: true,
              button: false,
              buttonWithQuantity: true,
            },
            styles: {
              product: {
                "@media (min-width: 601px)": {
                  "max-width": "100%",
                  "margin-left": "0px",
                  "margin-bottom": "0px",
                },
              },
              button: BUTTON_STYLES,
              quantityInput: {
                "font-size": "16px",
                "padding-top": "16px",
                "padding-bottom": "16px",
              },
              title: {
                "font-family": "Helvetica Neue, sans-serif",
                "font-weight": "bold",
                "font-size": "26px",
                color: "#4c4c4c",
              },
              price: {
                "font-family": "Helvetica Neue, sans-serif",
                "font-weight": "normal",
                "font-size": "18px",
                color: "#4c4c4c",
              },
              compareAt: {
                "font-family": "Helvetica Neue, sans-serif",
                "font-weight": "normal",
                "font-size": "15.3px",
                color: "#4c4c4c",
              },
              unitPrice: {
                "font-family": "Helvetica Neue, sans-serif",
                "font-weight": "normal",
                "font-size": "15.3px",
                color: "#4c4c4c",
              },
            },
            text: { button: "Add to cart" },
          },
          option: {},
          cart: {
            styles: {
              button: BUTTON_STYLES,
              title: { color: "#f0ebe0" },
              header: { color: "#f0ebe0" },
              lineItems: { color: "#f0ebe0" },
              subtotalText: { color: "#f0ebe0" },
              subtotal: { color: "#f0ebe0" },
              notice: { color: "#f0ebe0" },
              currency: { color: "#f0ebe0" },
              close: { color: "#f0ebe0", ":hover": { color: "#f0ebe0" } },
              empty: { color: "#f0ebe0" },
              noteDescription: { color: "#f0ebe0" },
              discountText: { color: "#f0ebe0" },
              discountIcon: { fill: "#f0ebe0" },
              discountAmount: { color: "#f0ebe0" },
              cart: { "background-color": "#1e2d5a" },
              footer: { "background-color": "#1e2d5a" },
            },
            text: { total: "Subtotal", button: "Checkout" },
            popup: false,
          },
          toggle: {
            styles: {
              toggle: {
                "font-family": "Gill Sans, sans-serif",
                "background-color": "#1e2d5a",
                ":hover": { "background-color": "#334d99" },
                ":focus": { "background-color": "#334d99" },
              },
              count: {
                "font-size": "16px",
                color: "#f0ebe0",
                ":hover": { color: "#f0ebe0" },
              },
              iconPath: { fill: "#f0ebe0" },
            },
          },
          lineItem: {
            styles: {
              variantTitle: { color: "#f0ebe0" },
              title: { color: "#f0ebe0" },
              price: { color: "#f0ebe0" },
              fullPrice: { color: "#f0ebe0" },
              discount: { color: "#f0ebe0" },
              discountIcon: { fill: "#f0ebe0" },
              quantity: { color: "#f0ebe0" },
              quantityIncrement: {
                color: "#f0ebe0",
                "border-color": "#f0ebe0",
              },
              quantityDecrement: {
                color: "#f0ebe0",
                "border-color": "#f0ebe0",
              },
              quantityInput: { color: "#f0ebe0", "border-color": "#f0ebe0" },
            },
          },
        },
      });
    });
  }

  useEffect(() => {
    abortedRef.current = false;

    // Handles navigation-back case where the script is already loaded
    if (globalThis.ShopifyBuy?.UI) {
      ShopifyBuyInit();
    }

    return () => {
      abortedRef.current = true;
    };
  }, []);

  return (
    <>
      <Script
        src="https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js"
        strategy="afterInteractive"
        onLoad={ShopifyBuyInit}
      />
      <div id="collection-component-1775146534337" />
    </>
  );
}
