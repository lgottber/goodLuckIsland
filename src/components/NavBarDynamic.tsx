import dynamic from "next/dynamic";

const NavBar = dynamic(() => import("./NavBar.jsx"), { ssr: false });

export default NavBar;
