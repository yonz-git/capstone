import React, { useState } from "react";
import { useRouter } from "next/router";

import DashboardView from "@/components/Dashboard/DashboardView";

export default function Home() {
  const router = useRouter();
  const [userProfile, setUserProfile] = useState(null);

  function handleOnboarding() {
    router.push("/onboarding");
  }

  return <DashboardView userProfile={userProfile} />;
}
