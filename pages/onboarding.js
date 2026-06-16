import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import CosmicIcon from "../components/Icons/Icons";

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [profileData, setProfileData] = useState({});
  const [unknownTime, setUnknownTime] = useState(false);

  //birth place API fetching
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");

  useEffect(() => {
    async function startFetching() {
      try {
        const response = await fetch(
          "https://countriesnow.space/api/v0.1/countries/iso"
        );
        const json = await response.json();

        setCountries(json.data || []);
      } catch (error) {
        console.error("Error loading countries:", error);
      }
    }

    startFetching();
  }, []);

  useEffect(() => {
    if (!selectedCountry) {
      setCities([]);
      return;
    }

    async function startFetching() {
      try {
        const response = await fetch(
          "https://countriesnow.space/api/v0.1/countries/cities",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ country: selectedCountry }),
          }
        );
        const json = await response.json();
        setCities(json.data || []);
      } catch (error) {
        console.error("Error loading cities:", error);
      }
    }

    startFetching();
  }, [selectedCountry]);

  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const step3Data = Object.fromEntries(formData);

    // add up the datas
    const finalData = { ...profileData, ...step3Data };

    // when the checkbox ticked, overrides the time picker
    if (unknownTime) {
      finalData.birthTime = "unknown";
    }

    const calculatedSunSign = getSunSign(finalData.birthDate);
    finalData.sunSign = calculatedSunSign;

    // important to pass the final data
    localStorage.setItem("user_profile", JSON.stringify(finalData));
    router.push("/dashboard");
  }

  // blocks continuing to the next step when not filled
  function handleNextStep(event) {
    const form = event.target.closest("form");

    if (form.checkValidity()) {
      //need to collect data before going to the next step
      const formData = new FormData(form);
      const partialData = Object.fromEntries(formData);
      setProfileData((prev) => ({ ...prev, ...partialData }));

      setStep((prev) => prev + 1);
    } else {
      form.reportValidity();
    }
  }

  // calculate the sun sign and saves in the local data

  function getSunSign(dateString) {
    if (!dateString) return "";

    const date = new Date(dateString);
    const month = date.getMonth() + 1; // JS months are 0-11, so +1 makes it 1-12
    const day = date.getDate();

    if ((month === 3 && day >= 21) || (month === 4 && day <= 19))
      return "Aries";
    if ((month === 4 && day >= 20) || (month === 5 && day <= 20))
      return "Taurus";
    if ((month === 5 && day >= 21) || (month === 6 && day <= 20))
      return "Gemini";
    if ((month === 6 && day >= 21) || (month === 7 && day <= 22))
      return "Cancer";
    if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return "Leo";
    if ((month === 8 && day >= 23) || (month === 9 && day <= 22))
      return "Virgo";
    if ((month === 9 && day >= 23) || (month === 10 && day <= 22))
      return "Libra";
    if ((month === 10 && day >= 23) || (month === 11 && day <= 21))
      return "Scorpio";
    if ((month === 11 && day >= 22) || (month === 12 && day <= 21))
      return "Sagittarius";
    if ((month === 12 && day >= 22) || (month === 1 && day <= 19))
      return "Capricorn";
    if ((month === 1 && day >= 20) || (month === 2 && day <= 18))
      return "Aquarius";
    return "Pisces";
  }

  return (
    <Container>
      <Header>
        <button
          type="button"
          aria-label="Go back"
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
        {/* STEP 1: birth date */}
        {step === 1 && (
          <StepSection>
            <IconBox>
              <span role="img" aria-label="calendar">
                <CosmicIcon name="birthday" />
              </span>
            </IconBox>

            <h2>What is your birth date?</h2>

            <InputGroup>
              <label htmlFor="birthDate">Birth Date</label>
              <StyledInput
                type="date"
                id="birthDate"
                name="birthDate"
                defaultValue={profileData.birthDate || ""} //data stays when going back
                required
              />
            </InputGroup>

            <ContinueButton type="button" onClick={handleNextStep}>
              Continue
            </ContinueButton>
          </StepSection>
        )}

        {/* STEP 2: birth time */}
        {step === 2 && (
          <StepSection>
            <IconBox>
              <span role="img" aria-label="clock">
                <CosmicIcon name="clock" />
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
                defaultValue={profileData.birthTime || ""}
                required={!unknownTime}
              />
            </InputGroup>

            <CheckboxGroup>
              <input
                type="checkbox"
                id="unknownTime"
                checked={unknownTime}
                onChange={(event) => setUnknownTime(event.target.checked)}
              />
              <label htmlFor="unknownTime">
                I don&apos;t know my exact birth time
              </label>
            </CheckboxGroup>

            <ContinueButton type="button" onClick={handleNextStep}>
              Continue
            </ContinueButton>
          </StepSection>
        )}

        {/* STEP 3: birth place */}
        {step === 3 && (
          <StepSection>
            <IconBox>
              <span role="img" aria-label="location">
                <CosmicIcon name="earth" />
              </span>
            </IconBox>
            <h2>Where were you born?</h2>

            {/* Country */}
            <InputGroup>
              <label htmlFor="birthCountry">Birth Country</label>
              <StyledSelect
                id="birthCountry"
                name="birthCountry"
                value={selectedCountry}
                onChange={(event) => {
                  setSelectedCountry(event.target.value);
                  // Update profile data immediately on change
                  setProfileData((prev) => ({
                    ...prev,
                    birthCountry: event.target.value,
                    birthCity: "",
                  }));
                }}
                required
              >
                <option value="">-- Select a Country --</option>
                {countries.map((country) => (
                  <option key={country.Iso2} value={country.name}>
                    {country.name}
                  </option>
                ))}
              </StyledSelect>
            </InputGroup>

            {/* City */}
            <InputGroup>
              <label htmlFor="birthCity">Birth City</label>
              <StyledSelect
  id="birthCity"
  name="birthCity"
  value={profileData.birthCity || ""}
  onChange={(event) =>
    setProfileData((prev) => ({ ...prev, birthCity: event.target.value }))
  }
  disabled={!selectedCountry || cities.length === 0}
  required
>            
                <option value="" disabled>
                  {!selectedCountry
                    ? "Choose a country first"
                    : cities.length === 0
                      ? "Loading local cities..."
                      : "-- Select a City --"}
                </option>
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </StyledSelect>
            </InputGroup>

            <ContinueButton type="submit">Save Profile</ContinueButton>
          </StepSection>
        )}
      </FormContainer>
    </Container>
  );
}

const Container = styled.main`
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #141434;
  color: #ffffff;
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
    color: #ffffff;
  }

  h1 {
    font-size: 16px;
    font-weight: 400;
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
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background-color: ${(props) => (props.$active ? "#aa8dff" : "#3c3655")};
  border: 2px solid ${(props) => (props.$active ? "#aa8dff" : "#aa8dff")};
`;

const Line = styled.div`
  width: 60px;
  height: 2px;
  background-color: ${(props) => (props.$active ? "#696186" : "#696186")};
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
    margin-bottom: 60px;
    font-weight: 400;
  }

  p {
    color: #e2e2e2;
    margin-bottom: 30px;
    font-size: 14px;
  }
`;

const IconBox = styled.div`
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

const InputGroup = styled.div`
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

const StyledSelect = styled.select`
  width: 100%;
  padding: 16px;
  border-radius: 8px;
  border: 1px solid #444;
  font-size: 16px;
  background-color: ${(props) => (props.disabled ? "#222" : "#fff")};
  color: ${(props) => (props.disabled ? "#666" : "#000")};
  outline: none;
`;
