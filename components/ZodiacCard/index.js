import React from "react";
import { zodiacConfig } from "./zodiacData";
import {
  CardContainer,
  CardTitle,
  SignHeader,
  SignName,
  SignSymbol,
  SignTraits,
} from "./ZodiacCard.styled";

export default function ZodiacCard({ userProfile }) {
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
        <SignSymbol>{signData.symbol + "\uFE0E"}</SignSymbol>
      </SignHeader>
      <SignTraits>{signData.traits}</SignTraits>
    </CardContainer>
  );
}
