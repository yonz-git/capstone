import React, { useState } from "react";
import useSWR from "swr";
import SavedCard from "../SavedCard";
import Link from "next/link";
import { Atom } from "react-loading-indicators";
import {
  Container,
  Header,
  Title,
  Subtitle,
  CardsList,
  BackButton,
  StatusMessage,
  ModalOverlay,
  ModalBox,
  ButtonGroup,
  CancelButton,
  ConfirmButton,
} from "./SavedList.styled";

export default function SavedList() {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [dateToDelete, setDateToDelete] = useState(null);

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

  async function handleConfirmDelete() {
    if (!dateToDelete) return;
    try {
      const response = await fetch(`/api/saved_dates/${dateToDelete._id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`Failed to delete document: ${response.status}`);
      }

      setDateToDelete(null);
      mutate();
    } catch (error) {
      console.error("Error deleting saved date:", error);
    }
  }

  if (isLoading)
    return (
      <Container>
        <StatusMessage>
          <Atom
            color="#8f86b0"
            size="small"
            text="Loading your aligned days..."
            textColor="#ece4fd"
          />
        </StatusMessage>
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
              onToggleSave={() => setDateToDelete(data)}
              isExpanded={isExpanded}
              onToggleExpand={() => setExpandedIndex(isExpanded ? null : index)}
              onSaveNote={handleUpdateNote}
            />
          );
        })}
      </CardsList>

      <Link href="/checktiming">
        <BackButton>✦ Plan Another Event</BackButton>
      </Link>

      {dateToDelete && (
        <ModalOverlay
          id="modal-backdrop"
          onClick={(event) => {
            if (event.target.id === "modal-backdrop") {
              setDateToDelete(null);
            }
          }}
        >
          <ModalBox>
            <h3>Unsave Date?</h3>
            <p>Are you sure you want to remove this alignment?</p>
            <ButtonGroup>
              <CancelButton onClick={() => setDateToDelete(null)}>
                Cancel
              </CancelButton>
              <ConfirmButton onClick={handleConfirmDelete}>
                Yes, Unsave
              </ConfirmButton>
            </ButtonGroup>
          </ModalBox>
        </ModalOverlay>
      )}
    </Container>
  );
}
