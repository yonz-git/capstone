import React, { useState, useEffect } from "react";
import ZodiacCard from "../Zodiac/ZodiacCard";
import styled from "styled-components";
import { zodiacConfig } from "../Zodiac/ZodiacData";
import { useRouter } from "next/router";

export default function DashboardView() {
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
        <Button onClick={() => router.push("/checktiming")}>
          <ButtonIcon>✦</ButtonIcon> Check my Cosmic Timing
        </Button>
      </Footer>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  max-width: 400px;
  height: 100vh;

  background-color: #141434;
  color: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 40px 24px;
  box-sizing: border-box;
  font-family: sans-serif;
  margin: 0 auto;
  position: relative;
`;

const Header = styled.header`
  text-align: center;
  margin-top: 40px;
`;

const CosmicIcon = styled.div`
  margin-bottom: 16px;
  font-size: 64px;
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: 400;
  margin: 0 0 8px 0;

  line-height: 1.2;
`;

const Question = styled.p`
  text-align: center;

  font-size: 24px;
`;

const Description = styled.p`
  font-size: 15px;
  line-height: 1.6;
  color: #ffffff;
  margin: 0;
  margin-top: 1.5rem;
  font-weight: 300;
`;

const Footer = styled.footer`
  width: 100%;
  margin-bottom: 20px;
`;

const Button = styled.button`
  width: 100%;
  background-color: #222222;
  color: #ffffff;
  border: none;
  padding: 16px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  &:hover {
    background-color: #000000;
  }
`;

const ButtonIcon = styled.span`
  font-size: 18px;
`;
