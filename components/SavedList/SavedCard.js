import React, { useState, useEffect } from "react";
import styled from "styled-components";

export default function SavedCard({
  data,
  isExpanded,
  isSaved,
  onToggleExpand,
  onToggleSave,
  onSaveNote,
}) {
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

const CardContainer = styled.div`
  background: #494682;
  border: 1px solid #3c3973;
  border-radius: 16px;
  padding: 1rem;
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
  flex-direction: column;
  gap: 10px;
`;

const RightGroup = styled.div`
  display: flex;
  align-items: center; /* Vertically centers the score circle */
`;

const HeartButton = styled.button`
  position: absolute;
  top: -1em;
  right: -1rem;
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
  filter: drop-shadow(0 0 6px rgba(255, 53, 201, 0.45));
`;

const ExpandableContent = styled.div`
  max-height: ${(props) => (props.$isExpanded ? "70vh" : "0px")};
  overflow: hidden;
  transition: grid-template-rows 0.45s cubic-bezier(0.16, 1, 0.3, 1);
`;

const DateLabel = styled.h3`
  font-size: 14px;
  margin: 0;
  color: #ffffff;
  font-weight: 400;
`;

const EventLabel = styled.h4`
  font-size: 18px;
  margin: 0;
  color: #ffffff;
  font-weight: 400;
`;
const EventLocation = styled.div`
  font-size: 14px;
`;
const SummaryText = styled.p`
  color: #f1f0ff;
  line-height: 1.5;
  margin: 0;
  font-size: 0.8rem;
  padding-bottom: 1em;
  font-weight: 300;
`;

const DropdownArrow = styled.span`
  position: absolute;
  bottom: -10px;
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

// note feature

const NoteButton = styled.button`
  font-size: 13px;
  position: absolute;
  top: -1em;
  right: 0.9em;
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

const NoteContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: auto;
  align-self: stretch;
  background: rgba(232, 121, 244, 0.52);
  border: 1px solid rgba(216, 174, 205, 0.3);
  border-radius: 12px;
  padding: 0.7em;
  margin: 0.5em 0 0.5em 0;
  cursor: pointer;
`;

const NoteText = styled.p`
  font-size: 12px;
  font-weight: 200;
  margin: 0;
  color: #ffffff;
`;

const AnimationContentWrapper = styled.div`
  min-height: 0;

  opacity: ${(props) => (props.$isExpanded ? 1 : 0)};
  transform: translateY(${(props) => (props.$isExpanded ? "0px" : "-8px")});

  transition:
    opacity ${(props) => (props.$isExpanded ? "0.6s ease-out" : "0.4s ease-in")},
    transform 0.45s cubic-bezier(0.16, 1, 0.3, 1);

  padding-top: ${(props) => (props.$isExpanded ? "14px" : "0px")};
  margin-top: ${(props) => (props.$isExpanded ? "14px" : "0px")};
`;

const EditNoteSection = styled.div`
  margin-top: 14px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const NoteTextArea = styled.textarea`
  width: 100%;
  background: rgba(6, 2, 33, 0.57);
  border: 1px solid rgba(170, 153, 255, 0.2);
  border-radius: 0.6rem;
  padding: 12px;
  color: #ffffff;
  font-family: inherit;
  font-size: 13px;
  line-height: 1.4;
  resize: vertical;
  outline: none;

  &:focus {
    border-color: #aa99ff;
    background: rgba(255, 255, 255, 0.1);
  }
`;

// when editing
const NoteActionsBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const WordCounter = styled.span`
  font-size: 12px;
  color: ${(props) =>
    props.$isOverLimit ? "#ff6b6b" : "rgba(255, 255, 255, 0.5)"};
  font-weight: ${(props) => (props.$isOverLimit ? "600" : "400")};
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 8px;
`;

const CancelButton = styled.button`
  background: transparent;
  border-radius: 0.5rem;
  color: #ffffff;
  padding: 4px 10px;
  font-size: 12px;
  cursor: pointer;
  border-color: #aa99ff;
  border: 1px solid rgba(170, 153, 255, 0.8);
  opacity: 0.8;
  &:hover {
    opacity: 1;
  }
`;

const SaveButton = styled.button`
  background: #aa99ff;
  color: #120f26;
  border: none;
  border-radius: 0.5rem;
  padding: 4px 10px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:disabled {
    background: rgba(255, 255, 255, 0.2);
    color: rgba(255, 255, 255, 0.4);
    cursor: not-allowed;
  }

  &:not(:disabled):hover {
    background: #c6baff;
  }
`;

const HeaderClickableZone = styled.div`
  width: 100%;
  cursor: pointer;
`;
