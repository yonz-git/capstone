import React, { useState } from "react";
import useSWR from "swr";
import SavedCard from "../SavedCard";
import Link from "next/link";
import {
  Container,
  Header,
  Title,
  Subtitle,
  CardsList,
  BackButton,
  StatusMessage,
} from "./SavedList.styed";

export default function SavedList() {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const {
    data: savedDates,
    error,
    isLoading,
    mutate,
  } = useSWR("/api/saved_dates");

  async function handleUpdateNote(id, updatedNotes) {
    try {
      const response = await fetch(`/api/saved_dates/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notes: updatedNotes }),
      });

      if (!response.ok) throw new Error("Failed to update note");

      mutate();
    } catch (error) {
      console.error("Error saving note:", error);
    }
  }

  async function handleDeleteSavedDate(id) {
    try {
      const response = await fetch(`/api/saved_dates/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`Failed to delete document: ${response.status}`);
      }

      mutate();
    } catch (error) {
      console.error("Error deleting saved date:", error);
    }
  }

  if (isLoading)
    return (
      <Container>
        {" "}
        <StatusMessage>Loading your aligned days...</StatusMessage>; if (error)
        return <StatusMessage>Error loading saved dates.</StatusMessage>
      </Container>
    );

  if (!savedDates || savedDates.length === 0) {
    return (
      <Container>
        {" "}
        <StatusMessage>
          No saved days yet. ✨ <br />
        </StatusMessage>
        <Link href="/checktiming">
          <BackButton>Find Aligned Days</BackButton>{" "}
        </Link>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <Title>🪐 Your aligned dates</Title>
        <Subtitle></Subtitle>
      </Header>

      <CardsList>
        {savedDates.map((data, index) => {
          const isExpanded = expandedIndex === index;

          return (
            <SavedCard
              key={data._id}
              data={{
                _id: data._id,
                date: data.gregorianDate,
                score: data.cosmicScore,
                summary: data.readingSummary,
                eventType: data.eventType,
                eventCity: data.eventCity,
                eventCountry: data.eventCountry,
                notes: data.notes || "",
              }}
              isSaved={true}
              onToggleSave={() => handleDeleteSavedDate(data._id)}
              isExpanded={isExpanded}
              onToggleExpand={() => setExpandedIndex(isExpanded ? null : index)}
              onSaveNote={handleUpdateNote}
            />
          );
        })}
      </CardsList>

      <Link href="/checktiming">
        <BackButton> Plan Another Event</BackButton>
      </Link>
    </Container>
  );
}
