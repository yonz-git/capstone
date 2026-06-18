import React, { useState, useEffect } from "react";
import styled from "styled-components";
import useSWR from "swr";

// explicit fetcher to ensure SWR handles the JSON response correctly
const fetcher = (url) => fetch(url).then((response) => response.json());

export default function YourBestDays({ onBackToForm }) {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedIndex, setExpandedIndex] = useState(null);

  const { data: savedDatesData, mutate } = useSWR("/api/saved_dates", fetcher);

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

  const toggleSaveDate = async (day) => {
    // Defensive check: Only run .find() if data is a valid array
    const savedDatesArray = Array.isArray(savedDatesData) ? savedDatesData : [];
    const existingSavedDate = savedDatesArray.find(
      (date) => date.gregorianDate?.split("T")[0] === day.date
    );
    const isSaved = !!existingSavedDate;

    const localEvent = JSON.parse(
      localStorage.getItem("pending_event_calculation") || "{}"
    );
    const localProfile = JSON.parse(
      localStorage.getItem("userProfile") || "{}"
    );

    try {
      if (isSaved) {
        const response = await fetch("/api/saved_dates", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: existingSavedDate._id }),
        });

        if (response.ok) {
          mutate(); // Revalidate SWR data cache
        }
      } else {
        const payload = {
          gregorianDate: day.date,
          eventType: localEvent.eventType || "General",
          cosmicScore: Number(day.score),
          readingSummary: day.summary,
          partnerSunSign:
            localEvent.partnerSunSign || localProfile.partnerSunSign || null,
          userId: "6671827464ef241bb4df199c",
        };

        const response = await fetch("/api/saved_dates", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (response.ok) {
          mutate(); // Revalidate SWR data cache
        }
      }
    } catch (error) {
      console.error("Database sync issue:", error);
    }
  };

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
        {results.map((day, index) => {
          const isExpanded = expandedIndex === index;

          // Determine active status condition matching active data
          const savedDatesArray = Array.isArray(savedDatesData)
            ? savedDatesData
            : [];
          const isHeartActive = savedDatesArray.some(
            (date) => date.gregorianDate?.split("T")[0] === day.date
          );

          return (
            <ResultCard key={index}>
              {/* clickable Header Area to handle the expansion toggle */}
              <CardHeader
                onClick={() => setExpandedIndex(isExpanded ? null : index)}
              >
                <HeartButton
                  onClick={(event) => {
                    event.stopPropagation(); // stops the dropdown from opening when clicking the heart
                    toggleSaveDate(day);
                  }}
                  aria-label="Save date"
                >
                  {isHeartActive ? (
                    <HeartFilledIcon viewBox="0 0 24 24">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </HeartFilledIcon>
                  ) : (
                    <HeartOutlineIcon
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </HeartOutlineIcon>
                  )}
                </HeartButton>

                <HeaderMainRow>
                  <LeftGroup>
                    <PlanetIcon>✨</PlanetIcon>
                    <DateLabel>
                      {new Date(day.date).toLocaleDateString("en-US", {
                        weekday: "long",
                        month: "long",
                        day: "numeric",
                      })}
                    </DateLabel>
                  </LeftGroup>

                  <RightGroup>
                    <ScoreCircle $score={day.score}>
                      <span>{day.score}</span>
                    </ScoreCircle>
                  </RightGroup>
                </HeaderMainRow>
                <DropdownArrow $isExpanded={isExpanded}>》</DropdownArrow>
              </CardHeader>

              {/* expandable reading section */}
              <ExpandableContent $isExpanded={isExpanded}>
                <SummaryText>{day.summary}</SummaryText>
              </ExpandableContent>
            </ResultCard>
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

const ResultCard = styled.div`
  background: #494682;
  border: 1px solid #3c3973;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
`;

const CardHeader = styled.div`
  position: relative; /* Required anchor for absolute positioned elements */
  display: flex;
  flex-direction: column;
  cursor: pointer;
  user-select: none;
  padding-bottom: 20px; /* Creates explicit layout room for the absolute arrow */
  padding-top: 20px;
`;

const HeaderMainRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding-right: 24px; /* Prevents the score circle from bumping into the Heart icon on small viewports */
`;

const LeftGroup = styled.div`
  display: flex;
  align-items: center; /* Vertically centers star and date label */
  gap: 10px;
`;

const RightGroup = styled.div`
  display: flex;
  align-items: center; /* Vertically centers the score circle */
`;

const HeartButton = styled.button`
  position: absolute;
  top: -1.5rem;
  right: -1.5rem;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 5;
  transition: transform 0.2s ease;

  &:hover {
    background: none;
    transform: scale(1.15);
  }
  &:active {
    transform: scale(0.95);
  }
`;

const PlanetIcon = styled.span`
  font-size: 18px;
  line-height: 1;
`;

const DropdownArrow = styled.span`
  position: absolute;
  bottom: -16px;
  left: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  color: #aa99ff;
  line-height: 1;
  transition: transform 0.25s ease-in-out;
  opacity: ${(props) => (props.$isExpanded ? 0 : 1)};
  visibility: ${(props) => (props.$isExpanded ? "hidden" : "visible")};
  pointer-events: ${(props) => (props.$isExpanded ? "none" : "auto")};
  transform: translateX(-50%)
    ${(props) => (props.$isExpanded ? "rotate(-90deg)" : "rotate(90deg)")};
`;

const ExpandableContent = styled.div`
  max-height: ${(props) => (props.$isExpanded ? "150px" : "0px")};
  overflow: hidden;
  transition:
    max-height 0.25s ease-in-out,
    margin-top 0.2s ease;
  margin-top: ${(props) => (props.$isExpanded ? "14px" : "0px")};

  padding-top: ${(props) => (props.$isExpanded ? "14px" : "0px")};
`;

const DateLabel = styled.h3`
  font-size: 17px;
  margin: 0;
  color: #ffffff;
  font-weight: 400;
  white-space: nowrap; /* Prevents long dates from breaking into two messy lines */
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

const HeartOutlineIcon = styled.svg`
  width: 20px;
  height: 20px;
  color: #aa99ff; /* Matches your theme's purple accents */
`;

const HeartFilledIcon = styled.svg`
  width: 20px;
  height: 20px;
  fill: #c0e666; /* Clean cosmic pink/crimson variant */
  filter: drop-shadow(0 0 6px rgba(255, 75, 114, 0.45));
`;
