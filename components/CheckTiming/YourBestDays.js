import React, { useState, useEffect } from "react";
import styled from "styled-components";

export default function YourBestDays({ onBackToForm }) {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchCosmicDays() {
      try {
        // get cached data structures from Local Storage
        const localEvent = localStorage.getItem("pending_event_calculation");
        const localProfile = localStorage.getItem("userProfile");

        if (!localEvent || !localProfile) {
          throw new Error("Missing required computation profile variables.");
        }

        const response = await fetch("/api/calculate-days", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userProfile: JSON.parse(localProfile),
            eventDetails: JSON.parse(localEvent),
          }),
        });

        if (!response.ok) throw new Error("API Calculation failed.");

        const data = await response.json();
        setResults(data.bestDays || []);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchCosmicDays();
  }, []);

  if (loading) {
    return (
      <Container>
        <LoadingText>Calculating celestial alignments... </LoadingText>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <p>Error: {error}</p>
        <BackButton onClick={onBackToForm}>Go Back & Try Again</BackButton>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <Title>Your Aligned Days 🪐</Title>
        <Subtitle>
          The cosmos has spoken. <br></br>Here are your 3 strongest dates.
        </Subtitle>
      </Header>

      <CardsList>
        {results.map((day, index) => (
          <ResultCard key={index}>
            <CardHeader>
              <DateLabel>
                {new Date(day.date).toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </DateLabel>
              <ScoreCircle score={day.score}>
                <span>{day.score}</span>
              </ScoreCircle>
            </CardHeader>
            <SummaryText>{day.summary}</SummaryText>
          </ResultCard>
        ))}
      </CardsList>

      <BackButton onClick={onBackToForm}>← Plan Another Event</BackButton>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  max-width: 400px;
  background-color: #141434;
  color: #ffffff;
  padding: 40px 24px;
  margin: 0 auto;
  font-family: sans-serif;
  box-sizing: border-box;
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 30px;
`;
const Title = styled.h2`
  font-size: 24px;
  font-weight: 400;
  margin: 0 0 8px 0;
`;
const Subtitle = styled.p`
  font-size: 14px;
  color: #b0afcf;
  margin: 0;
  line-height: 1.4;
`;
const LoadingText = styled.h3`
  text-align: center;
  font-weight: 300;
  margin-top: 50px;
  color: #aa99ff;
`;

const CardsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 30px;
`;

const ResultCard = styled.div`
  background: #494682;
  border: 1px solid #3c3973;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 14px;
`;

const DateLabel = styled.h3`
  font-size: 16px;
  margin: 0;
  color: #ffffff;
  font-weight: 500;
`;

const ScoreCircle = styled.div`
  width: 46px;
  height: 46px;
  border-radius: 50%;
  background: ${(props) => (props.score > 85 ? "#4ade80" : "#aa99ff")};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 14px;
  color: #141434;
`;

const SummaryText = styled.p`
  font-size: 13px;
  color: #d1d0e6;
  line-height: 1.5;
  margin: 0;
`;

const BackButton = styled.button`
  width: 100%;
  background-color: transparent;
  border: 1px solid #3c3973;
  color: #aa99ff;
  padding: 14px;
  border-radius: 12px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
  &:hover {
    background-color: #25234c;
  }
`;
