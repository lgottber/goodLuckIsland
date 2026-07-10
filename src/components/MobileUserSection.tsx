import Link from "next/link";
import Icon from "./Icon";

export default function MobileUserSection({ setMobileOpen }: { setMobileOpen: (v: boolean) => void }) {
  return (
    <>
      <div className="nav-mobile-divider" />
      <Link href="/profile" onClick={() => setMobileOpen(false)}>
        <Icon name="user" size={14} /> My Profile
      </Link>
<Link href="/backpack" onClick={() => setMobileOpen(false)}>
        <Icon name="backpack" size={14} /> My Backpack
      </Link>
      <a href="/auth/logout"><Icon name="logout" size={14} /> Logout</a>
    </>
  );
}
