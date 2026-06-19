import { useState, useEffect } from "react";
import useSWR from "swr";
import ResultCard from "../ResultCard";
import Link from "next/link";
import {
  Container,
  Header,
  Title,
  Subtitle,
  LoadingText,
  CardsList,
  BackButton,
} from "./ResultsList.styled.js";

export default function ResultsList({ onBack }) {
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
        <Link href="/checktiming">
          <BackButton>Go Back & Try Again</BackButton>
        </Link>
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

          // determine active status condition matching active data
          const savedDatesArray = Array.isArray(savedDatesData)
            ? savedDatesData
            : [];

          const isSaved = savedDatesArray.find((date) => {
            if (!date.gregorianDate || !data.date) return false;
            // convert to string safely before splitting
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

      <BackButton onClick={onBack}> Plan Another Event</BackButton>
    </Container>
  );
}
