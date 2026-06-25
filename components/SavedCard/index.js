import React, { useState, useEffect } from "react";
import {
  CardContainer,
  CardHeader,
  HeaderMainRow,
  LeftGroup,
  RightGroup,
  HeartButton,
  ScoreCircle,
  HeartOutlineIcon,
  HeartFilledIcon,
  ExpandableContent,
  DateLabel,
  EventLabel,
  EventLocation,
  SummaryText,
  DropdownArrow,
  NoteButton,
  NoteContainer,
  NoteText,
  AnimationContentWrapper,
  EditNoteSection,
  NoteTextArea,
  NoteActionsBar,
  WordCounter,
  ActionButtons,
  CancelButton,
  SaveButton,
  HeaderClickableZone,
  Weather,
  WeatherContainer,
} from "./SavedCard.styled";
// import { Weather, WeatherContainer } from "../ResultCard/ResultCard.styled";

export default function SavedCard({
  data,
  isExpanded,
  isSaved,
  onToggleExpand,
  onToggleSave,
  onSaveNote,
}) {
  console.log(" Current Saved Card Data Object:", data);
  const [isEditingNote, setIsEditingNote] = useState(false);
  const [noteValue, setNoteValue] = useState(data.notes || "");

  useEffect(() => {
    if (!isExpanded) {
      setIsEditingNote(false);
      setNoteValue(data.notes || ""); // reset the editing state
    }
  }, [isExpanded, data.notes]);

  // Helper function to count words safely
  const getWordCount = (text) => {
    return text.trim().split(/\s+/).filter(Boolean).length;
  };

  // Safe handler when clicking the feather button
  const handleNoteButtonClick = (event) => {
    event.preventDefault();
    if (!isExpanded) {
      onToggleExpand(); // Smoothly open the layout structure
    }
    setIsEditingNote(true);
  };

  const handleSave = async () => {
    await onSaveNote(data._id, noteValue);
    setIsEditingNote(false);
  };
  return (
    <CardContainer>
      <CardHeader>
        <NoteButton
          onClick={handleNoteButtonClick}
          aria-label="Add or edit notes"
        >
          {" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1.3em"
            height="1.3em"
            viewBox="0 0 512 512"
          >
            <path
              fill="currentColor"
              d="M470.7 20L368.2 49.81l41.5-28.09c-26.2 5.92-59.3 17.5-100.9 36.19l-67.9 70.79L265 79.25c-23.3 12.96-48 29.95-71.8 49.85l-15.8 64.3l-3.4-47.6c-23.5 21.6-45.6 45.6-63.9 70.9c-19.23 26.5-34.26 54.5-41.79 82.4l-28.12-18.8c2.52 23.7 10.31 44.3 23.09 63.2l-33.62-10.3c7.64 23.5 20.13 38.7 41.25 51c-11.83 33.3-17.38 68.1-23.34 102.8l18.4 3.1C87.31 277.4 237.9 141.8 374 81.72l6.9 17.38c-121.7 54.5-216.3 146.5-265.8 279.1c18.1.1 35.8-2.1 52.2-6.3l4.9-60.9l13.1 55.5c10.9-4 20.9-8.8 29.8-14.4l-20.7-43.5l32.8 34.8c8-6.4 14.6-13.6 19.6-21.5c30.4-47.5 62.2-94.7 124.8-134.2l-45.7-16.2l70.1 2.1c11.4-5.8 23.4-12.9 32.5-19.6l-49.7-4l74.7-17.6c5.8-5.8 11.2-11.9 16.1-18c17.3-21.94 29-44.78 26.2-65.55c-1.3-10.39-7.5-20.16-17.6-25.63c-2.5-1.3-5.2-2.45-7.5-3.22"
            />
          </svg>
        </NoteButton>
        <HeartButton onClick={onToggleSave} aria-label="Save date">
          {isSaved ? (
            <HeartFilledIcon viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.5 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </HeartFilledIcon>
          ) : (
            <HeartOutlineIcon
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.5 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </HeartOutlineIcon>
          )}
        </HeartButton>

        <HeaderClickableZone onClick={onToggleExpand}>
          <HeaderMainRow>
            <LeftGroup>
              <EventLabel>
                ༄{" "}
                {data?.eventType
                  ? data.eventType.charAt(0).toUpperCase() +
                    data.eventType.slice(1)
                  : "Event"}
              </EventLabel>

              <DateLabel>
                {new Date(data.date).toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                })}
              </DateLabel>
              <EventLocation>
                ⟟ {data.eventCity}, {data.eventCountry}
              </EventLocation>
            </LeftGroup>

            <RightGroup>
              <ScoreCircle $score={data.score}>
                <span>{data.score}</span>
              </ScoreCircle>
            </RightGroup>
          </HeaderMainRow>

          {(data.temperature || data.weatherCondition) && (
            <WeatherContainer>
              {data.temperature && <Weather> {data.temperature}</Weather>}
              {data.weatherCondition && (
                <Weather>{data.weatherCondition}</Weather>
              )}
            </WeatherContainer>
          )}
        </HeaderClickableZone>

        <DropdownArrow onClick={onToggleExpand} $isExpanded={isExpanded}>
          》
        </DropdownArrow>
      </CardHeader>

      <ExpandableContent $isExpanded={isExpanded}>
        <AnimationContentWrapper $isExpanded={isExpanded}>
          <SummaryText>{data.summary}</SummaryText>
          {/* trim needed not to leave the note container saved empty */}
          {data.notes && data.notes.trim() !== "" && !isEditingNote && (
            <NoteContainer onClick={handleNoteButtonClick}>
              <NoteText>{data.notes}</NoteText>
            </NoteContainer>
          )}

          {isEditingNote && (
            <EditNoteSection>
              <NoteTextArea
                id="note"
                value={noteValue}
                aria-label="Input for Note"
                name="note"
                onChange={(event) => setNoteValue(event.target.value)}
                placeholder="Write down your insights..."
                rows={2}
                autoComplete="off"
              />
              <NoteActionsBar>
                <WordCounter $isOverLimit={getWordCount(noteValue) > 50}>
                  {50 - getWordCount(noteValue)} words left
                </WordCounter>
                <ActionButtons>
                  <CancelButton
                    onClick={() => {
                      setIsEditingNote(false);
                      setNoteValue(data.notes || "");
                    }}
                  >
                    Cancel
                  </CancelButton>
                  <SaveButton
                    onClick={handleSave}
                    disabled={getWordCount(noteValue) > 100}
                  >
                    Save
                  </SaveButton>
                </ActionButtons>
              </NoteActionsBar>
            </EditNoteSection>
          )}
        </AnimationContentWrapper>
      </ExpandableContent>
    </CardContainer>
  );
}
