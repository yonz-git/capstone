import React, { useState } from "react";
import { useRouter } from "next/router";
import NoProfileHome from "../components/NoProfileHome/NoProfileHome";

export default function Home() {
  const router = useRouter();

  function handleStartOnboarding() {
    router.push("/onboarding");
  }

  // Default state when first landing when there is no profile
  return <NoProfileHome onStartOnboarding={handleStartOnboarding} />;
}
