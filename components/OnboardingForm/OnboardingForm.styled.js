import styled from "styled-components";

export const Container = styled.main`
  padding: 20px;

  display: flex;
  flex-direction: column;
  background-color: #141434;
  color: #ffffff;
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  margin-top: 0.2em;

  button {
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
    color: #ffffff;
  }

  h1 {
    font-size: 18px;
    font-weight: 400;
  }

  span {
    font-size: 14px;
    color: #e7e7e7;
  }
`;

export const ProgressBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 40px;
`;

export const Dot = styled.div`
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background-color: ${(props) => (props.$active ? "#aa8dff" : "#3c3655")};
  border: 2px solid ${(props) => (props.$active ? "#aa8dff" : "#aa8dff")};
`;

export const Line = styled.div`
  width: 60px;
  height: 2px;
  background-color: ${(props) => (props.$active ? "#696186" : "#696186")};
`;

export const FormContainer = styled.form`
  flex: 1; /* ✨ Tells the form to occupy all remaining vertical space */
  display: flex;
  flex-direction: column;
  justify-content: center; /* ✨ Centers the nested StepSection vertically */
  align-items: center; /* ✨ Centers everything horizontally */
  width: 100%;
`;

export const StepSection = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h2 {
    font-size: 22px;

    font-weight: 400;
  }

  p {
    color: #e2e2e2;
    margin-bottom: 3rem;
    font-size: 16px;
  }
`;

export const IconBox = styled.div`
  width: 80px;
  height: 80px;

  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
  margin-top: 3rem;
  margin-bottom: 2rem;
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

export const StyledInput = styled.input`
  width: 100%;
  padding: 16px;
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
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
  text-align: left;
  margin-top: -5px;
  margin-bottom: 20px;

  input {
    width: 18px;
    height: 18px;
    cursor: pointer;
  }

  label {
    font-size: 14px;
    color: #ececec;
    cursor: pointer;
    user-select: none;
  }
`;

export const ContinueButton = styled.button`
  width: 100%;
  padding: 16px;
  background-color: #333333;
  color: white;
  border: none;
  border-radius: 0.8rem;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 20px;

  &:hover {
    background-color: #000;
  }
`;

export const StyledSelect = styled.select`
  width: 100%;
  padding: 16px;
  border-radius: 8px;
  border: 1px solid #444;
  font-size: 16px;
  background-color: ${(props) => (props.disabled ? "#222" : "#fff")};
  color: ${(props) => (props.disabled ? "#666" : "#000")};
  outline: none;
`;
