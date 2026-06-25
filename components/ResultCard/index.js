import {
  ScoreCircle,
  HeartOutlineIcon,
  HeartFilledIcon,
  CardContainer,
  CardHeader,
  HeaderMainRow,
  LeftGroup,
  RightGroup,
  HeartButton,
  PlanetIcon,
  DropdownArrow,
  ExpandableContent,
  AnimationContentWrapper,
  DateLabel,
  SummaryText,
  Weather,
  WeatherContainer,
} from "./ResultCard.styled";

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
            onToggleSave(data);
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
              ✨{" "}
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

        {(data.temperature || data.weatherCondition) && (
          <WeatherContainer>
            {data.temperature && <Weather> {data.temperature}</Weather>}
            {data.weatherCondition && (
              <Weather>{data.weatherCondition}</Weather>
            )}
          </WeatherContainer>
        )}

        <DropdownArrow $isExpanded={isExpanded}>》</DropdownArrow>
      </CardHeader>

      <ExpandableContent $isExpanded={isExpanded}>
        <AnimationContentWrapper $isExpanded={isExpanded}>
          <SummaryText>{data.summary}</SummaryText>
        </AnimationContentWrapper>
      </ExpandableContent>
    </CardContainer>
  );
}
