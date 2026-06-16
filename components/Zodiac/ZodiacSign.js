import React from "react";
import styled from "styled-components";
import { zodiacConfig } from "./ZodiacData";

export default function ZodiacSign({ userProfile }) {
  const sunSign = userProfile?.sunSign;

  // CRASH PROTECTION GAURD
  if (!sunSign) {
    return <CardContainer>Loading your cosmic energy...</CardContainer>;
  }
  const signData = zodiacConfig[sunSign];

  if (!signData) {
    return <CardContainer>Loading your cosmic energy...</CardContainer>;
  }

  return (
    <CardContainer>
      <CardTitle>Your Sun Sign</CardTitle>
      <SignHeader>
        <SignName>{sunSign}</SignName>
        <SignSymbol>{signData.symbol}</SignSymbol>
      </SignHeader>
      <SignTraits>{signData.traits}</SignTraits>
    </CardContainer>
  );
}

const CardContainer = styled.div`
  border: 1px solid #eaeaea;
  border-radius: 12px;
  padding: 20px;
  background-color: #ffffff;
  max-width: 350px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.02);
`;

const CardTitle = styled.span`
  font-size: 0.85rem;
  color: #666666;
  font-weight: 500;
  display: block;
  margin-bottom: 8px;
`;

const SignHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
`;

const SignName = styled.h3`
  font-size: 1.8rem;
  font-family: serif; /* Matches your layout style */
  margin: 0;
`;

const SignSymbol = styled.span`
  font-size: 1.8rem;
  color: #000000;
`;

const SignTraits = styled.p`
  font-size: 0.95rem;
  color: #333333;
  margin: 0;
  line-height: 1.4;
`;
