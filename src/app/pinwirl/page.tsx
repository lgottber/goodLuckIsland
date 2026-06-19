"use client";

import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useRouter } from "next/navigation";
import NavBar from "../../components/NavBarDynamic";
import PinwirlIntro from "./PinwirlIntro";
import PinwirlAssessment from "./PinwirlAssessment";
import "./pinwirl.css";

export default function PinwirlPage() {
  const { isAuthenticated, isLoading, user } = useAuth0();
  const router = useRouter();
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace("/auth/login?returnTo=/pinwirl");
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading || !isAuthenticated) return null;

  return (
    <>
      <NavBar activePage="pinwirl" largeAvatar />

      <div className="pinwirl-page">
        {started ? (
          <PinwirlAssessment />
        ) : (
          <PinwirlIntro username={user?.nickname} onStart={() => setStarted(true)} />
        )}
      </div>
    </>
  );
}
