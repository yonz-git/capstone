import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import NoProfileHome from "../components/NoProfileHome/NoProfileHome";

export default function Home() {
  const router = useRouter();

  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // check if the user already created a profile
    const savedData = localStorage.getItem("userProfile");

    if (savedData) {
      // if yes go to dashboard
      router.push("/dashboard");
    } else {
      setIsChecking(false);
    }
  }, [router]);

  function handleOnboarding() {
    router.push("/onboarding");
  }

  // Default state when first landing when there is no profile
  return <NoProfileHome onOnboarding={handleOnboarding} />;
}
