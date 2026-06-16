import React, { useState, useEffect } from "react";
import styled from "styled-components";

export default function YourBestDays({ onBackToForm }) {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [expandedIndex, setExpandedIndex] = useState(null);

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
        <Title>Your Cosmic Timing 🪐</Title>
        <Subtitle>
          The cosmos has spoken. <br></br>Here are your 3 strongest dates.
        </Subtitle>
      </Header>

      <CardsList>
        {results.map((day, index) => {
          const isExpanded = expandedIndex === index;

          return (
            <ResultCard key={index}>
              {/* Clickable Header Area to handle the expansion toggle */}
              <CardHeader
                onClick={() => setExpandedIndex(isExpanded ? null : index)}
              >
                <DateWrapper>
                  <PlanetIcon>✨</PlanetIcon>
                  <DateLabel>
                    {new Date(day.date).toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </DateLabel>
                </DateWrapper>

                <RightAction>
                  <ScoreCircle $score={day.score}>
                    <span>{day.score}</span>
                  </ScoreCircle>

                  <DropdownArrow $isExpanded={isExpanded}>▼</DropdownArrow>
                </RightAction>
              </CardHeader>

              {/* expandable reading section */}
              <ExpandableContent $isExpanded={isExpanded}>
                <SummaryText>{day.summary}</SummaryText>
              </ExpandableContent>
            </ResultCard>
          );
        })}
      </CardsList>

      <BackButton onClick={onBackToForm}>← Plan Another Event</BackButton>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  max-width: 400px;
  height: 100vh;
  background-color: #141434;
  color: #ffffff;
  padding: 40px 24px;
  margin: 0 auto;
  font-family: sans-serif;
  box-sizing: border-box;

  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 30px;
`;
const Title = styled.h2`
  font-size: 24px;
  font-weight: 400;
  margin: 40px 0 20px 0;
`;
const Subtitle = styled.p`
  font-size: 14px;
  color: #d2d1f0;
  margin: 1rem;
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
  cursor: pointer;
  user-select: none;
`;

const DateWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px; /* Spacing between planet icon and text label */
`;

const PlanetIcon = styled.span`
  font-size: 18px;
  line-height: 1;
`;

const RightAction = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const DropdownArrow = styled.span`
  font-size: 11px;
  color: #aa99ff;
  transition: transform 0.2s ease-in-out;
  transform: ${(props) =>
    props.$isExpanded ? "rotate(180deg)" : "rotate(0deg)"};
`;

const ExpandableContent = styled.div`
  max-height: ${(props) => (props.$isExpanded ? "150px" : "0px")};
  overflow: hidden;
  transition:
    max-height 0.25s ease-in-out,
    margin-top 0.2s ease;
  margin-top: ${(props) => (props.$isExpanded ? "14px" : "0px")};
  border-top: ${(props) => (props.$isExpanded ? "1px solid #3c3973" : "none")};
  padding-top: ${(props) => (props.$isExpanded ? "14px" : "0px")};
`;

const DateLabel = styled.h3`
  font-size: 15px;
  margin: 0;
  color: #ffffff;
  font-weight: 500;
  white-space: nowrap; /* Prevents long dates from breaking into two messy lines */
`;

const ScoreCircle = styled.div`
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: ${(props) => (props.$score > 85 ? "#c17bff" : "#aa99ff")};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 13px;
  color: #141434;
`;

const SummaryText = styled.p`
  font-size: 14px;
  color: #f1f0ff; /* Brightened slightly for readability on your new background */
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
  margin-top: 10px;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #25234c;
    color: #ffffff;
  }
`;
