"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import PictureImage from "./PictureImage";
import { useAuth0 } from "@auth0/auth0-react";
import NavGateModal from "./NavGateModal";
import UserMenu from "./UserMenu";
import GuestAuthButtons from "./GuestAuthButtons";
import MobileArticlesLink from "./MobileArticlesLink";
import MobileArticlesGatedButton from "./MobileArticlesGatedButton";
import MobileUserSection from "./MobileUserSection";
import MobileGuestAuth from "./MobileGuestAuth";
import { useClickOutside } from "../hooks/useClickOutside";
import "./NavBar.css";

export default function NavBar({
  activePage = "",
  authSection = null,
  largeAvatar = false,
}: {
  activePage?: string;
  authSection?: React.ReactNode;
  largeAvatar?: boolean;
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

  function handleGatedClick(e: React.MouseEvent<HTMLAnchorElement>) {
    if (!user) {
      e.preventDefault();
      setShowGate(true);
    }
  }

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : (user?.email?.[0]?.toUpperCase() ?? "?");

  const avatarAuthSection = user ? (
    <UserMenu
      user={user}
      initials={initials}
      largeAvatar={largeAvatar}
      dropdownOpen={dropdownOpen}
      setDropdownOpen={setDropdownOpen}
      dropdownRef={dropdownRef}
    />
  ) : (
    <GuestAuthButtons />
  );

  const navParts = ["nav"];
  if (activePage === "home") navParts.push("nav-hero");
  if (scrolled) navParts.push("nav-scrolled");
  const navClassName = navParts.join(" ");

  return (
    <>
      <nav className={navClassName}>
        <div className="nav-inner">
          <Link href="/" className="nav-logo">
            <PictureImage
              name="/good_luck_island_logo_small.png"
              alt="Good Luck Island Collective logo"
              className="nav-logo-img"
              sizes="40px"
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
          <div className="nav-auth">{authSection ?? avatarAuthSection}</div>
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
        <Link href="/about" onClick={() => setMobileOpen(false)}>
          About
        </Link>
        <Link href="/shop" onClick={() => setMobileOpen(false)}>
          Shop
        </Link>
        {user ? (
          <MobileArticlesLink setMobileOpen={setMobileOpen} />
        ) : (
          <MobileArticlesGatedButton
            setMobileOpen={setMobileOpen}
            setShowGate={setShowGate}
          />
        )}
        {user ? (
          <MobileUserSection setMobileOpen={setMobileOpen} />
        ) : (
          <MobileGuestAuth setMobileOpen={setMobileOpen} />
        )}
      </div>

      {showGate && <NavGateModal onClose={() => setShowGate(false)} />}
    </>
  );
}
