import React from "react";
import styled from "styled-components";

export default function NoProfileHome({ onStartOnboarding }) {
  return (
    <Container>
      <Header>
        <CosmicIcon>🌙✨</CosmicIcon>
        <Title>It&apos;s Not Your Day.</Title>
        <Subtitle>Your cosmic timing.</Subtitle>
      </Header>

      <Main>
        <Description>
          Create your cosmic profile to unlock personalized insights, transits,
          and your daily planner.
        </Description>
      </Main>

      <Footer></Footer>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  max-width: 375px;
  height: 100vh;
  max-height: 667px;
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
  font-size: 32px;
  margin-bottom: 16px;
`;

const Title = styled.h1`
  font-size: 36px;
  font-weight: bold;
  margin: 0 0 8px 0;

  line-height: 1.2;
`;

const Subtitle = styled.p`
  font-size: 22px;
  color: #e2e2e2;
  margin: 0;
`;

const Main = styled.main`
  text-align: center;
  padding: 0 12px;
`;

const Description = styled.p`
  font-size: 16px;
  line-height: 1.6;
  color: #e2e2e2;
  margin: 0;
`;

const Footer = styled.footer`
  width: 100%;
  margin-bottom: 20px;
`;
