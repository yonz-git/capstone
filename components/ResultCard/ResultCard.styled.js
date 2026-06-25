import styled from "styled-components";

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

export const CardContainer = styled.div`
  background: #49468250;
  backdrop-filter: blur(5px);
  border: 1px solid #3c3973;
  backdrop-filter: blur(5px);
  border: 1px solid #3c3973;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
`;

export const CardHeader = styled.div`
  position: relative; /* Required anchor for absolute positioned elements */
  display: flex;
  flex-direction: column;
  cursor: pointer;
  user-select: none;
  padding-bottom: 20px; /* Creates explicit layout room for the absolute arrow */
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
  align-items: center;
  gap: 10px;
`;

export const RightGroup = styled.div`
  display: flex;
  align-items: center;
`;

export const HeartButton = styled.div`
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

export const PlanetIcon = styled.span`
  font-size: 18px;
  line-height: 1;
`;

export const DropdownArrow = styled.span`
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

export const ExpandableContent = styled.div`
  max-height: ${(props) => (props.$isExpanded ? "70vh" : "0px")};
  overflow: hidden;
  display: grid;
  transition: grid-template-rows 0.45s cubic-bezier(0.16, 1, 0.3, 1);
`;

export const AnimationContentWrapper = styled.div`
  min-height: 0; /* Prevents grid layout calculation blowouts */

  opacity: ${(props) => (props.$isExpanded ? 1 : 0)};
  transform: translateY(${(props) => (props.$isExpanded ? "0px" : "-8px")});

  transition:
    opacity ${(props) => (props.$isExpanded ? "0.6s ease-out" : "0.4s ease-in")},
    transform 0.45s cubic-bezier(0.16, 1, 0.3, 1);

  padding-top: ${(props) => (props.$isExpanded ? "14px" : "0px")};
  margin-top: ${(props) => (props.$isExpanded ? "14px" : "0px")};
`;

export const DateLabel = styled.h3`
  font-size: 17px;
  margin: 0;
  color: #ffffff;
  font-weight: 400;
`;

export const SummaryText = styled.p`
  font-size: 14px;
  color: #f1f0ff;
  line-height: 1.5;
  margin: 0;
  padding-bottom: 1em;
  font-weight: 300;
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
