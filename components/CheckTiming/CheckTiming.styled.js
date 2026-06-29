import styled from "styled-components";

export const Container = styled.div`
  color: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 40px 24px;
  box-sizing: border-box;
  position: relative;
`;

export const Header = styled.header`
  text-align: center;
  margin-top: 40px;
`;

export const Title = styled.h2`
  font-size: 26px;
  font-weight: 300;
  margin: 0 0 30px 0;
  line-height: 1.2;
`;

export const Subtitle = styled.p`
  font-size: 15px;
  color: #ffffff;
  font-weight: 300;
  line-height: 1.4;
  padding-bottom: 30px;
`;

export const Footer = styled.footer`
  width: 100%;
  margin-bottom: 60px;
`;

export const EventContainer = styled.div`
  max-width: 90vw;
  margin-bottom: 3rem;
`;

export const TitleBlock = styled.div`
  h2 {
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 20px;
  }
  p {
    color: #ffffff;
    font-size: 14px;
  }
`;

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
`;

export const EventCard = styled.div`
  background-color: transparent;
  backdrop-filter: blur(5px);

  border-radius: 12px;
  padding: 16px;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  border: 1px solid ${(props) => (props.$isActive ? "#eeefdc" : "#86858fd2")};
  box-shadow: ${(props) =>
    props.$isActive ? "0 4px 12px rgba(0,0,0,0.06)" : "none"};
  box-shadow:
    inset 0 0 20px #1f203812,
    inset 20px 0 40px rgba(88, 64, 184, 0.02),
    inset -20px 0 40px rgba(0, 255, 255, 0.02),
    inset 20px 0 100px rgba(128, 119, 255, 0.02),
    inset -20px 0 100px rgba(2, 55, 63, 0.02),
    0 0 1px #1c0d0d27,
    -3px 0 4px rgba(247, 246, 230, 0.2),
    3px 0 4px rgba(173, 174, 220, 0.2);

  &:hover {
    border-color: "#cabfff";
  }

  h3 {
    font-size: 14px;
    font-weight: 300;
    margin: 0;
    margin-top: 10px;
  }
`;

export const EmojiWrapper = styled.div`
  font-size: 30px;
`;

export const InputGroup = styled.div`
  width: 100%;
  text-align: left;
  margin-bottom: 20px;

  label {
    display: block;
    font-size: 14px;
    font-weight: 400;
    margin-bottom: 10px;
    color: #ffffff;
  }
`;

export const Location = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
`;

export const StyledSelect = styled.select`
  width: 100%;
  padding: 12px;
  background: #413e7a;
  border: 1px solid #3c3973;
  color: white;
  border-radius: 8px;
  font-size: 13px;
  outline: none;
  cursor: pointer;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const StyledInput = styled.input`
  width: 100%;
  padding: 14px;
  border-radius: 8px;
  border: 1px solid #ddd;
  font-size: 16px;
  outline: none;
  background-color: ${(props) => (props.disabled ? "#f9f9f9" : "#ffffff")};

  &:focus {
    border-color: ${(props) => (props.disabled ? "#ddd" : "#333")};
  }
`;

export const CheckboxGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const StyledCheckbox = styled.input`
  width: 18px;
  height: 18px;
  cursor: pointer;
  accent-color: #aa99ff;
`;

export const CheckboxLabel = styled.label`
  font-size: 14px;
  color: #ffffff;
  cursor: pointer;
  user-select: none;
`;

export const IconInputWrapper = styled.div`
  position: relative;
  width: 100%;
  margin-top: 12px;
  display: flex;
  align-items: center;
`;

export const SelectIcon = styled.span`
  position: absolute;
  left: 14px;
  font-size: 16px;
  color: #b0afcf;
  display: flex;
  align-items: center;
`;

export const DropdownWithIcon = styled.select`
  width: 100%;
  padding: 14px 14px 14px 42px;
  background-color: #25234c;
  border: 1px solid #3c3973;
  color: #ffffff;
  border-radius: 12px;
  font-size: 14px;
  outline: none;
  cursor: pointer;
  appearance: none;

  &:focus {
    border-color: #aa99ff;
  }
`;
