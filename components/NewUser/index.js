import React from "react";
import Link from "next/link";
import {
  Container,
  Header,
  Title,
  Subtitle,
  Description,
  Footer,
  Button,
} from "./NewUser.styled";
import Strands from "@/components/Strands";

export default function NewUser() {
  return (
    <Container>
      <Header>
        <Strands />
        <Title>It&apos;s Not Your Day</Title>
        <Subtitle>Your cosmic timing</Subtitle>
      </Header>

      <Description>
        Create your cosmic profile to unlock personalized insights and transits.
      </Description>

      <Footer>
        <Link href="/onboarding" style={{ textDecoration: "none" }}>
          <Button>✧ Create Cosmic Profile</Button>
        </Link>
      </Footer>
    </Container>
  );
}
