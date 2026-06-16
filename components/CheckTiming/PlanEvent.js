import React from "react";
import styled from "styled-components";

export default function PlanEvent({}) {
  return (
    <Container>
      <Header>
        <Title>Plan an Event ✨</Title>
        <Subtitle>
          Tell us what you're planning and your timeframe. We'll find your 3
          best days.
        </Subtitle>
      </Header>

      <Main>
        <Description></Description>
      </Main>

      <Footer>
        <Button>
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
  font-family: sans-serif;
  margin: 0 auto;
  position: relative;
`;

const Header = styled.header`
  text-align: center;
  margin-top: 40px;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: 300;
  margin: 0 0 8px 0;

  line-height: 1.2;
`;

const Subtitle = styled.p`
  font-size: 15px;
  color: #ffffff;
  font-weight: 300;
  line-height: 1.4;
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
