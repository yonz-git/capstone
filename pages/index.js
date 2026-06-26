import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import NewUser from "@/components/NewUser";
// import Galaxy from "@/components/ui-elements/Galaxy";
import styled from "styled-components";

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

  return (
    <>
      <BackgroundWrapper>{/* <Galaxy /> */}</BackgroundWrapper>
      <NewUser />
    </>
  );
}

const BackgroundWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 0;
`;
