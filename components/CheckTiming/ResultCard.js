import React from "react";
import styled from "styled-components";

export default function ResultCard({
  data,
  isExpanded,
  isSaved,
  onToggleExpand,
  onToggleSave,
}) {
  return (
    <CardContainer>
      <CardHeader onClick={onToggleExpand}>
        <HeartButton
          onClick={(event) => {
            event.stopPropagation();
            onToggleSave();
          }}
          aria-label="Save date"
        >
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

        <HeaderMainRow>
          <LeftGroup>
            <PlanetIcon />
            <DateLabel>
              ✨
              {new Date(data.date).toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
            </DateLabel>
          </LeftGroup>

          <RightGroup>
            <ScoreCircle $score={data.score}>
              <span>{data.score}</span>
            </ScoreCircle>
          </RightGroup>
        </HeaderMainRow>

        <DropdownArrow $isExpanded={isExpanded}>》</DropdownArrow>
      </CardHeader>

      <ExpandableContent $isExpanded={isExpanded}>
        <SummaryText>{data.summary}</SummaryText>
      </ExpandableContent>
    </CardContainer>
  );
}

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

const CardContainer = styled.div`
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
