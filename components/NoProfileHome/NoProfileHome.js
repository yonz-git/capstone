import React from "react";
import styled from "styled-components";

export default function NoProfileHome({ onOnboarding }) {
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

      <Footer>
        <Button onClick={onOnboarding}>
          <ButtonIcon>✦</ButtonIcon> Create Cosmic Profile
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

  margin: 0 auto;
  position: relative;

  display: flex;
  justify-content: center;
`;

const Header = styled.header`
  text-align: center;

  margin-bottom: 2rem;
`;

const CosmicIcon = styled.div`
  font-size: 32px;
  margin-bottom: 16px;
`;

const Title = styled.h1`
  font-size: 36px;
  font-weight: 500;
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
  margin-bottom: 5rem;
`;

const Footer = styled.footer`
  width: 100%;
`;

const Button = styled.button`
  width: 100%;
  background-color: #222222;
  color: #ffffff;
  border: none;
  padding: 16px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 500;
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
