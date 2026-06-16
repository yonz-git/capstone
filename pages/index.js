import React, { useState } from "react";
import { useRouter } from "next/router";
import NoProfileHome from "../components/NoProfileHome/NoProfileHome";
import DashboardView from "@/components/Dashboard/DashboardView";

export default function Home() {
  const router = useRouter();
  const [userProfile, setUserProfile] = useState(null);

  function handleOnboarding() {
    router.push("/onboarding");
  }

  if (userProfile) {
    return <DashboardView userProfile={userProfile} />;
  }

  // Default state when first landing when there is no profile
  return <NoProfileHome onOnboarding={handleOnboarding} />;
}
