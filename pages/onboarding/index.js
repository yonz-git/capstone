import { useState } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [unknownTime, setUnknownTime] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    // If the checkbox was ticked, override whatever was in the time picker
    if (unknownTime) {
      data.birthTime = "unknown";
    }

    localStorage.setItem("cosmic_profile", JSON.stringify(data));
    router.push("/dashboard");
  }

  // Blocks continuing to the next step when not filled
  function handleNextStep(event) {
    const form = event.target.closest("form");

    if (form.checkValidity()) {
      setStep((prev) => prev + 1);
    } else {
      form.reportValidity();
    }
  }

  return (
    <PageContainer>
      <Header>
        <button
          type="button"
          onClick={() => (step > 1 ? setStep(step - 1) : router.push("/"))}
        >
          ←
        </button>
        <h1>Create Cosmic Profile</h1>
        <span>{step}/3</span>
      </Header>

      <ProgressBar>
        <Dot $active={step >= 1} />
        <Line $active={step >= 2} />
        <Dot $active={step >= 2} />
        <Line $active={step >= 3} />
        <Dot $active={step >= 3} />
      </ProgressBar>

      <FormContainer onSubmit={handleSubmit}>
        {/* STEP 1: Birth Date */}
        {step === 1 && (
          <StepSection>
            <IconBox>
              <span role="img" aria-label="calendar">
                📅
              </span>
            </IconBox>
            <h2>What is your birth date?</h2>
            <p>Enter the date you were born.</p>

            <InputGroup>
              <label htmlFor="birthDate">Birth Date</label>
              <StyledInput
                type="date"
                id="birthDate"
                name="birthDate"
                required
              />
            </InputGroup>

            <ContinueButton type="button" onClick={handleNextStep}>
              Continue
            </ContinueButton>
          </StepSection>
        )}

        {/* STEP 2: Birth Time (+ I Don't Know Checkbox) */}
        {step === 2 && (
          <StepSection>
            <IconBox>
              <span role="img" aria-label="clock">
                🕒
              </span>
            </IconBox>
            <h2>What time were you born?</h2>
            <p>Exact time helps calculate your rising sign accurately.</p>

            <InputGroup>
              <label htmlFor="birthTime">Birth Time</label>
              <StyledInput
                type="time"
                id="birthTime"
                name="birthTime"
                disabled={unknownTime}
                required={!unknownTime}
              />
            </InputGroup>

            {/* Checkbox implementation matching native HTML Form modules */}
            <CheckboxGroup>
              <input
                type="checkbox"
                id="unknownTime"
                checked={unknownTime}
                onChange={(e) => setUnknownTime(e.target.checked)}
              />
              <label htmlFor="unknownTime">
                I don't know my exact birth time
              </label>
            </CheckboxGroup>

            <ContinueButton type="button" onClick={handleNextStep}>
              Continue
            </ContinueButton>
          </StepSection>
        )}

        {/* STEP 3: Split Location & Identity Selection */}
        {step === 3 && (
          <StepSection>
            <IconBox>
              <span role="img" aria-label="map">
                📍
              </span>
            </IconBox>
            <h2>Where were you born?</h2>

            {/* City Selection Input */}
            {/* Country Selection Input */}
            <InputGroup>
              <label htmlFor="birthCountry">Birth Country</label>
              <StyledInput
                type="text"
                id="birthCountry"
                name="birthCountry"
                placeholder="e.g. Germany"
                required
              />
            </InputGroup>
            <InputGroup>
              <label htmlFor="birthCity">Birth City</label>
              <StyledInput
                type="text"
                id="birthCity"
                name="birthCity"
                placeholder="e.g. Berlin"
                required
              />
            </InputGroup>

            <ContinueButton type="submit">Complete Profile</ContinueButton>
          </StepSection>
        )}
      </FormContainer>
    </PageContainer>
  );
}

const PageContainer = styled.main`
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #121348;
  color: #333333;
  font-family: sans-serif;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;

  button {
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
  }

  h1 {
    font-size: 16px;
    font-weight: 600;
  }

  span {
    font-size: 14px;
    color: #888;
  }
`;

const ProgressBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 40px;
`;

const Dot = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${(props) => (props.$active ? "#333" : "#eee")};
  border: 2px solid ${(props) => (props.$active ? "#333" : "#ddd")};
`;

const Line = styled.div`
  width: 60px;
  height: 2px;
  background-color: ${(props) => (props.$active ? "#333" : "#eee")};
`;

const FormContainer = styled.form`
  flex-grow: 1;
`;

const StepSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  h2 {
    font-size: 22px;
    margin-bottom: 8px;
  }

  p {
    color: #666;
    margin-bottom: 30px;
    font-size: 14px;
  }
`;

const IconBox = styled.div`
  width: 80px;
  height: 80px;
  background-color: #f5f5f5;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
  margin-bottom: 24px;
  border: 1px solid #eee;
`;

const InputGroup = styled.div`
  width: 100%;
  text-align: left;
  margin-bottom: 20px;

  label {
    display: block;
    font-size: 12px;
    font-weight: 600;
    margin-bottom: 8px;
    color: #888;
  }
`;

const StyledInput = styled.input`
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

const CheckboxGroup = styled.div`
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
    color: #555;
    cursor: pointer;
    user-select: none;
  }
`;

const ContinueButton = styled.button`
  width: 100%;
  padding: 16px;
  background-color: #333333;
  color: white;
  border: none;
  border-radius: 25px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 20px;

  &:hover {
    background-color: #000;
  }
`;
