"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useAuth0 } from "@auth0/auth0-react";
import Modal from "./Modal";
import { useClickOutside } from "../hooks/useClickOutside";
import "./NavBar.css";

export default function NavBar({
  activePage = "",
  authSection = null,
  logoHeight = 64,
  largeAvatar = false,
}) {
  const { user } = useAuth0();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showGate, setShowGate] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(globalThis.scrollY > 40);
    globalThis.addEventListener("scroll", onScroll, { passive: true });
    return () => globalThis.removeEventListener("scroll", onScroll);
  }, []);

  useClickOutside(dropdownRef, () => setDropdownOpen(false), dropdownOpen);

  function handleGatedClick(e) {
    if (!user) {
      e.preventDefault();
      setShowGate(true);
    }
  }

  const initials = user?.name
    ? user.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()
    : user?.email?.[0]?.toUpperCase() ?? "?";

  const avatarAuthSection = user
    ? (
      <div className="nav-user-menu" ref={dropdownRef}>
        <button
          type="button"
          className={`nav-avatar-btn${
            largeAvatar ? " nav-avatar-btn--lg" : ""
          }`}
          onClick={() => setDropdownOpen(!dropdownOpen)}
          aria-label="User menu"
        >
          {user.picture
            ? (
              <img
                src={user.picture}
                alt={user.name ?? "User"}
                className="nav-avatar-img"
              />
            )
            : <div className="nav-avatar-initials">{initials}</div>}
        </button>
        {dropdownOpen && (
          <div className="nav-dropdown">
            <a
              href="/profile"
              className="nav-dropdown-item"
              onClick={() => setDropdownOpen(false)}
            >
              <span className="nav-dropdown-icon"></span> My Profile
            </a>
            <a
              href="/saved"
              className="nav-dropdown-item"
              onClick={() => setDropdownOpen(false)}
            >
              <span className="nav-dropdown-icon"></span> Saved Content
            </a>
            <a
              href="/backpack"
              className="nav-dropdown-item"
              onClick={() => setDropdownOpen(false)}
            >
              <span className="nav-dropdown-icon"></span> My Backpack
            </a>
            <div className="nav-dropdown-divider" />
            <a
              href="/auth/logout"
              className="nav-dropdown-item nav-dropdown-logout"
            >
              <span className="nav-dropdown-icon"></span> Logout
            </a>
          </div>
        )}
      </div>
    )
    : (
      <>
        <a href="/auth/login" className="nav-btn-ghost">Sign In</a>
        <a href="/auth/login?screen_hint=signup" className="nav-btn-solid">
          Join Free
        </a>
      </>
    );

  return (
    <>
      <nav
        className={`nav${activePage === "home" ? " nav-hero" : ""}${
          scrolled ? " nav-scrolled" : ""
        }`}
      >
        <div className="nav-inner">
          <Link href="/" className="nav-logo">
            <img
              src="/goodLuckIslandLogoSmall.png"
              alt="Good Luck Island Collective"
              style={{
                height: logoHeight,
                width: "auto",
                objectFit: "contain",
              }}
            />
          </Link>
          <div className="nav-links">
            <Link
              href="/about"
              className={activePage === "about" ? "active" : ""}
            >
              About
            </Link>
            <Link
              href="/shop"
              className={activePage === "shop" ? "active" : ""}
            >
              Shop
            </Link>
            <Link
              href="/articles"
              className={[
                activePage === "articles" || activePage === "podcast"
                  ? "active"
                  : "",
                !user ? "nav-link-gated" : "",
              ]
                .filter(Boolean)
                .join(" ")}
              onClick={handleGatedClick}
            >
              Podcasts &amp; Articles
            </Link>
          </div>
          <div className="nav-auth">
            {authSection ?? avatarAuthSection}
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

      <div className={`nav-mobile-menu ${mobileOpen ? "open" : ""}`}>
        <button
          type="button"
          className="nav-mobile-close"
          onClick={() => setMobileOpen(false)}
        >
          ✕
        </button>
        <Link href="/about" onClick={() => setMobileOpen(false)}>About</Link>
        <Link href="/shop" onClick={() => setMobileOpen(false)}>
          Shop
        </Link>
        {user
          ? (
            <Link href="/articles" onClick={() => setMobileOpen(false)}>
              Podcasts &amp; Articles
            </Link>
          )
          : (
            <button
              type="button"
              className="nav-mobile-gated"
              onClick={() => {
                setMobileOpen(false);
                setShowGate(true);
              }}
            >
              Podcasts &amp; Articles
            </button>
          )}
        {user && (
          <>
            <div className="nav-mobile-divider" />
            <a href="/profile" onClick={() => setMobileOpen(false)}>
              👤 My Profile
            </a>
            <a href="/saved" onClick={() => setMobileOpen(false)}>
              🔖 Saved Content
            </a>
            <a href="/backpack" onClick={() => setMobileOpen(false)}>
              🎒 My Backpack
            </a>
            <a href="/auth/logout">↩ Logout</a>
          </>
        )}
      </div>

      {showGate && (
        <Modal
          backdropClassName="nav-gate-backdrop"
          contentClassName="nav-gate-modal"
          onClose={() => setShowGate(false)}
        >
          <button
            type="button"
            className="nav-gate-close"
            onClick={() => setShowGate(false)}
          >
            ✕
          </button>
          <div className="nav-gate-icon">🔒</div>
          <h3 className="nav-gate-title">Member Content</h3>
          <p className="nav-gate-desc">
            Articles and podcast episodes are free to access — just sign in or
            create your free account to get in.
          </p>
          <div className="nav-gate-actions">
            <a href="/auth/login" className="nav-gate-btn-solid">Sign In</a>
            <a
              href="/auth/login?screen_hint=signup"
              className="nav-gate-btn-ghost"
            >
              Join Free →
            </a>
          </div>
        </Modal>
      )}
    </>
  );
}
