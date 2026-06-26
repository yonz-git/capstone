import styled from "styled-components";

const Button = styled.button`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  z-index: 2;
  width: 100%;
  color: #ffffff;
  padding: 14px;
  font-size: 16px;
  font-weight: 300;
  letter-spacing: 0.05rem;
  backdrop-filter: blur(5px);
  border-radius: 20px;
  max-width: 86%;
  margin: 0 auto;
  cursor: pointer;
  margin-top: 2rem;
  box-shadow:
    inset 0 0 20px #1f203812,
    inset 20px 0 40px rgba(39, 0, 194, 0.02),
    inset -20px 0 40px rgba(0, 255, 255, 0.02),
    inset 20px 0 100px rgba(64, 0, 255, 0.02),
    inset -20px 0 100px rgba(2, 55, 63, 0.02),
    0 0 2px #1c0d0d27,
    -4px 0 4px rgba(247, 246, 230, 0.83),
    4px 0 4px rgba(173, 174, 220, 0.81);
  background-color: transparent;
  transition: all 0.3s ease-in-out;

  &:hover {
    transition: all 0.3s ease-in-out;
    color: #ffffff;
    backdrop-filter: blur(5px);
    text-shadow:
      0 0 7px #ffffffc5,
      0 0 10px #ffffffcc,
      0 0 21px #ffffffdd;
    box-shadow:
      inset 0 0 20px #1f203812,
      inset 20px 0 40px rgba(39, 0, 194, 0.02),
      inset -20px 0 40px rgba(0, 255, 255, 0.02),
      inset 20px 0 100px rgba(64, 0, 255, 0.02),
      inset -20px 0 100px rgba(2, 55, 63, 0.02),
      0 0 2px #1c0d0d27,
      0 0 1px #ffffff27,
      -4px 0 4px rgba(247, 246, 230, 0.77),
      4px 0 4px rgba(173, 174, 220, 0.85);
  }
`;

export default Button;
