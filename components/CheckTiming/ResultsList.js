import React, { useState, useEffect } from "react";
import styled from "styled-components";
import useSWR from "swr";
import ResultCard from "./ResultCard";

export default function ResultsList({ onBackToForm }) {
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
          setError("Please go back and fill out the form details first.");
          setLoading(false);
          return; // stop running the function without crashing the page
        }

        // fetch the calculation
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
      } catch (error) {
        console.error(error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchCosmicDays();
  }, []);

  // saving date create and delete

  const { data: savedDatesData, mutate } = useSWR("/api/saved_dates");

  async function toggleSaveDate(data, isSaved) {
    if (isSaved) {
      const response = await fetch(`/api/saved_dates/${isSaved._id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        console.error(response.status);
        return;
      }
    } else {
      const localEvent = JSON.parse(
        localStorage.getItem("pending_event_calculation") || "{}"
      );
      const response = await fetch("/api/saved_dates", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          gregorianDate: data.date,
          cosmicScore: Number(data.score),
          readingSummary: data.summary,
          userId: "6671827464ef241bb4df199c",
          eventType: localEvent.eventType || "General",
          eventCountry: localEvent.eventCountry,
          eventCity: localEvent.eventCity,
        }),
      });

      if (!response.ok) {
        console.error(response.status);
        return;
      }
    }

    mutate();
  }

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
        <Title>🪐 Your Cosmic Timing</Title>
        <Subtitle>
          The cosmos has spoken. <br></br>Here are your 3 strongest dates.
        </Subtitle>
      </Header>

      <CardsList>
        {results.map((data, index) => {
          const isExpanded = expandedIndex === index;

          // Determine active status condition matching active data
          const savedDatesArray = Array.isArray(savedDatesData)
            ? savedDatesData
            : [];

          const isSaved = savedDatesArray.find((date) => {
            if (!date.gregorianDate || !data.date) return false;
            // Convert to string safely before splitting
            const savedDateString = String(date.gregorianDate).split("T")[0];
            return savedDateString === data.date;
          });

          return (
            <ResultCard
              key={index}
              data={data}
              isExpanded={isExpanded}
              isSaved={isSaved}
              onToggleExpand={() => setExpandedIndex(isExpanded ? null : index)}
              onToggleSave={() => toggleSaveDate(data, isSaved)}
            />
          );
        })}
      </CardsList>

      <BackButton onClick={onBackToForm}> Plan Another Event</BackButton>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  max-width: 375px;
  height: 667px;
  background-color: #141434;
  color: #ffffff;
  padding: 40px 24px;
  margin: 0 auto;

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
  font-size: 15px;
  color: #f0f0fc;
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
  gap: 6px;
  margin-bottom: 30px;
`;

const BackButton = styled.button`
  width: 100%;
  background-color: transparent;
  border: 1px solid #3c3973;
  color: #cbc1ff;
  padding: 14px;
  border-radius: 12px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 10px;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #5337af;
    color: #ffffff;
  }
`;
