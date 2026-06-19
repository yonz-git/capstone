import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import NewUser from "@/components/NewUser";

export default function HomePage() {
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

  if (isChecking) return null;

  return <NewUser />;
}
