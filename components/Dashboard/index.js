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
import Strands from "../Strands";

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
        import Strands from './Strands';
        <div style={{ width: "100%", height: "600px", position: "relative" }}>
          <Strands
            colors={["#ffffff", "#ffffff", "#ffffff"]}
            count={4}
            speed={0.1}
            amplitude={2.1}
            waviness={2.4}
            thickness={0.7}
            glow={0.5}
            taper={3.7}
            spread={1}
            intensity={0.2}
            saturation={2}
            opacity={1}
            scale={0.6}
            glass
            refraction={0.75}
            dispersion={0}
            glassSize={0.41}
            hueShift={0}
          />
        </div>
        <Title>Welcome Starseed</Title>
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
