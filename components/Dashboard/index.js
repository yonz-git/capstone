import { useState, useEffect } from "react";
import ZodiacCard from "../ZodiacCard";
import { zodiacConfig } from "../ZodiacCard/zodiacData";
import { useRouter } from "next/router";
import Link from "next/link";
import {
  Container,
  Header,
  CosmicIcon,
  Title,
  Question,
  Description,
  Footer,
  Button,
} from "./Dashboard.styled.js";

export default function Dashboard() {
  const router = useRouter();
  const [userProfile, setUserProfile] = useState(null);
  const [isMounted, setIsMounted] = useState(false);

  // fetch profile from local storage when the page loads
  useEffect(() => {
    const savedData = localStorage.getItem("userProfile");
    if (savedData) {
      try {
        setUserProfile(JSON.parse(savedData));
      } catch (error) {
        console.error("Error loading cosmic profile data:", error);
      }
    }
    setIsMounted(true);
  }, []);
  //grab the sun sign
  const sunSign = userProfile?.sunSign;
  const signData = zodiacConfig[sunSign];

  // prevents crashing
  if (!isMounted || !sunSign || !signData) {
    return <h3>Loading your cosmos...</h3>;
  }

  return (
    <Container>
      <Header>
        <CosmicIcon>{signData.symbol + "\uFE0E"}</CosmicIcon>
        <Title>Welcome, Starseed!</Title>
        <Description>
          Your cosmic profile is ready. We’ve mapped your natal positions and
          cosmic timing.
        </Description>
      </Header>
      <ZodiacCard userProfile={userProfile} />
      <Question>What are we timing today?</Question>

      <Footer>
        <Link href="/checktiming">
          <Button>✦ Check my Cosmic Timing</Button>
        </Link>
      </Footer>
    </Container>
  );
}
