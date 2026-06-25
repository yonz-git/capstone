import styled from "styled-components";

export const CardContainer = styled.div`
  background: #49468250;
  backdrop-filter: blur(5px);
  border: 1px solid #3c3973;
  border-radius: 16px;
  padding: 1rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
`;

export const CardHeader = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  user-select: none;
  padding-bottom: 20px;
  padding-top: 20px;
`;

export const HeaderMainRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding-right: 24px;
`;

export const LeftGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const RightGroup = styled.div`
  display: flex;
  align-items: center;
`;

export const HeartButton = styled.div`
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
    border: none;
    transform: scale(1.15);
    background: transparent !important;
    background-color: transparent !important;
    border: none !important;
    outline: none;
    box-shadow: none !important;
  }
  &:active {
    transform: scale(0.95);
  }
`;

export const ScoreCircle = styled.div`
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

export const HeartOutlineIcon = styled.svg`
  width: 20px;
  height: 20px;
  color: #aa99ff;
`;

export const HeartFilledIcon = styled.svg`
  width: 20px;
  height: 20px;
  fill: #c0e666;
  filter: drop-shadow(0 0 6px rgba(255, 53, 201, 0.45));
`;

export const ExpandableContent = styled.div`
  max-height: ${(props) => (props.$isExpanded ? "70vh" : "0px")};
  overflow: hidden;
  transition: grid-template-rows 0.45s cubic-bezier(0.16, 1, 0.3, 1);
`;

export const DateLabel = styled.h3`
  font-size: 14px;
  margin: 0;
  color: #ffffff;
  font-weight: 400;
`;

export const EventLabel = styled.h4`
  font-size: 18px;
  margin: 0;
  color: #ffffff;
  font-weight: 400;
`;

export const EventLocation = styled.div`
  font-size: 14px;
`;

export const SummaryText = styled.p`
  color: #f1f0ff;
  line-height: 1.5;
  margin: 0;
  font-size: 0.8rem;
  padding-bottom: 1em;
  font-weight: 300;
`;

export const DropdownArrow = styled.span`
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

export const NoteButton = styled.div`
  font-size: 13px;
  color: #edbfff;
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

export const NoteContainer = styled.div`
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

export const NoteText = styled.p`
  font-size: 12px;
  font-weight: 200;
  margin: 0;
  color: #ffffff;
`;

export const AnimationContentWrapper = styled.div`
  min-height: 0;

  opacity: ${(props) => (props.$isExpanded ? 1 : 0)};
  transform: translateY(${(props) => (props.$isExpanded ? "0px" : "-8px")});

  transition:
    opacity ${(props) => (props.$isExpanded ? "0.6s ease-out" : "0.4s ease-in")},
    transform 0.45s cubic-bezier(0.16, 1, 0.3, 1);

  padding-top: ${(props) => (props.$isExpanded ? "14px" : "0px")};
  margin-top: ${(props) => (props.$isExpanded ? "14px" : "0px")};
`;

export const EditNoteSection = styled.div`
  margin-top: 14px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const NoteTextArea = styled.textarea`
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
export const NoteActionsBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const WordCounter = styled.span`
  font-size: 12px;
  color: ${(props) =>
    props.$isOverLimit ? "#ff6b6b" : "rgba(255, 255, 255, 0.5)"};
  font-weight: ${(props) => (props.$isOverLimit ? "600" : "400")};
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: 8px;
`;

export const CancelButton = styled.button`
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

export const SaveButton = styled.button`
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

export const HeaderClickableZone = styled.div`
  width: 100%;
  cursor: pointer;
`;

export const WeatherContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 8px;
  margin-bottom: 4px;
`;

export const Weather = styled.div`
  background-color: #2d3142;
  color: #e2e8f0;
  padding: 6px 16px;
  border-radius: 9999px;
  font-size: 0.85rem;
  font-weight: 500;
  letter-spacing: 0.02em;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  font-weight: 200;
  font-size: 12px;
`;
