import React from "react";
import Link from "next/link";
import {
  Container,
  Header,
  CosmicIcon,
  Title,
  Subtitle,
  Description,
  Footer,
  Button,
  ButtonIcon,
} from "./NewUser.styled";

export default function NewUser({ onOnboarding }) {
  return (
    <Container>
      <Header>
        <CosmicIcon>🌙✨</CosmicIcon>
        <Title>It&apos;s Not Your Day</Title>
        <Subtitle>Your cosmic timing</Subtitle>
      </Header>

      <Description>
        Create your cosmic profile to unlock personalized insights and transits.
      </Description>

      <Footer>
        <Link href="/onboarding">
          <Button>
            <ButtonIcon>+</ButtonIcon> Create Cosmic Profile
          </Button>
        </Link>
      </Footer>
    </Container>
  );
}
