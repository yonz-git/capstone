import React, { useState, useEffect } from "react";
import styled from "styled-components";
import useSWR from "swr";
import SavedCard from "./SavedCard";

export default function SavedList({ onBackToForm }) {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const {
    data: savedDates,
    error,
    isLoading,
    mutate,
  } = useSWR("/api/saved_dates");

  async function handleDeleteSavedDate(id) {
    try {
      const response = await fetch(`/api/saved_dates/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`Failed to delete document: ${response.status}`);
      }

      // Refresh the local SWR cache immediately so the card drops off the list instantly
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
          <BackButton onClick={onBackToForm}>Find Aligned Days</BackButton>
        </StatusMessage>
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
              }}
              isSaved={true}
              onToggleSave={() => handleDeleteSavedDate(data._id)}
              isExpanded={isExpanded}
              onToggleExpand={() => setExpandedIndex(isExpanded ? null : index)}
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
  max-width: 400px;
  height: 100vh;
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

const StatusMessage = styled.div`
  color: #ffffff;
  text-align: center;
  padding: 40px 20px;
  font-size: 16px;
`;
