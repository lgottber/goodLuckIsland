"use client";

import { useEffect, useRef, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import "./shop.css";
import { initShopifyCollection } from "./shopifyInit";

const SHOPIFY_COLLECTION_NODE_ID = "collection-component-1774915840099";
const SHOPIFY_COLLECTION_ID = "500395049263";

export default function ShopPage() {
  const { user } = useUser();
  const [mobileOpen, setMobileOpen] = useState(false);
  const shopifyInitialized = useRef(false);

  useEffect(() => {
    if (shopifyInitialized.current) return;
    shopifyInitialized.current = true;
    initShopifyCollection(SHOPIFY_COLLECTION_NODE_ID, SHOPIFY_COLLECTION_ID);
  }, []);

  return (
    <>
      {/* ── NAV ── */}
      <nav className="nav">
        <div className="nav-inner">
          <a href="/" className="nav-logo">
            <img
              src="/goodLuckIslandLogoSmall.png"
              alt="Good Luck Island Collective"
              style={{ height: 45, width: "auto", objectFit: "contain" }}
            />
          </a>
          <div className="nav-links">
            <a href="/articles">Freemium Content</a>
            <a href="/podcast">Podcast</a>
            <a href="/about">About</a>
            <a
              href="/shop"
              style={{ color: "var(--coral, #e8673a)", fontWeight: 600, opacity: 1 }}
            >
              Shop
            </a>
          </div>
          <div className="nav-auth">
            {user
              ? (
                <>
                  <a href="/profile" className="nav-btn-ghost">My Profile</a>
                  <a href="/auth/logout" className="nav-btn-solid">Sign Out</a>
                </>
              )
              : (
                <>
                  <a href="/auth/login" className="nav-btn-ghost">Sign In</a>
                  <a href="/auth/login?screen_hint=signup" className="nav-btn-solid">Join</a>
                </>
              )}
          </div>
          <button
            type="button"
            className={`nav-hamburger ${mobileOpen ? "open" : ""}`}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`nav-mobile-menu ${mobileOpen ? "open" : ""}`}>
        <button
          type="button"
          className="nav-mobile-close"
          onClick={() => setMobileOpen(false)}
        >
          ✕
        </button>
        <a href="/articles" onClick={() => setMobileOpen(false)}>Freemium Content</a>
        <a href="/podcast" onClick={() => setMobileOpen(false)}>Podcast</a>
        <a href="/about" onClick={() => setMobileOpen(false)}>About</a>
        <a href="/shop" className="mobile-coral" onClick={() => setMobileOpen(false)}>
          Shop
        </a>
        <div className="nav-mobile-auth">
          {user
            ? (
              <>
                <a href="/profile" className="ghost" onClick={() => setMobileOpen(false)}>My Profile</a>
                <a href="/auth/logout" className="solid" onClick={() => setMobileOpen(false)}>Sign Out</a>
              </>
            )
            : (
              <>
                <a href="/auth/login" className="ghost" onClick={() => setMobileOpen(false)}>Sign In</a>
                <a href="/auth/login?screen_hint=signup" className="solid" onClick={() => setMobileOpen(false)}>Join Free</a>
              </>
            )}
        </div>
      </div>

      <main className="shop-page">
        <div id={SHOPIFY_COLLECTION_NODE_ID} />

        {/* ── FOOTER ── */}
        <footer className="footer">
          <div className="footer-inner">
            <div className="footer-brand">
              <img
                src="/goodLuckIslandLogoSmall.png"
                alt="Good Luck Island Collective"
                style={{ height: 45, width: "auto", objectFit: "contain" }}
              />
              <span>Curating calm clarity for the next chapter of life.</span>
            </div>
            <div className="footer-links">
              <div>
                <strong>Explore</strong>
                <a href="/articles">Freemium Content</a>
                <a href="#">Podcast</a>
                <a href="#">Videos</a>
              </div>
              <div>
                <strong>Community</strong>
                <a href="/about">About</a>
                <a href="#">Newsletter</a>
                <a href="#">Contact</a>
              </div>
              <div>
                <strong>Account</strong>
                {user
                  ? (
                    <>
                      <a href="/profile">My Profile</a>
                      <a href="/auth/logout">Sign Out</a>
                    </>
                  )
                  : (
                    <>
                      <a href="/auth/login">Sign In</a>
                      <a href="/auth/login?screen_hint=signup">Register</a>
                    </>
                  )}
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© 2026 Good Luck Island Collective. All rights reserved.</span>
          </div>
        </footer>
      </main>
    </>
  );
}
