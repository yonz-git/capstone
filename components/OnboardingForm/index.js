import { useState } from "react";
import { useRouter } from "next/router";
import { Country, City } from "country-state-city";
import {
  Container,
  Header,
  ProgressBar,
  Dot,
  Line,
  FormContainer,
  StepSection,
  IconBox,
  InputGroup,
  StyledInput,
  CheckboxGroup,
  ContinueButton,
  StyledSelect,
} from "./OnboardingForm.styled";
import CosmicIcon from "../Icons/Icons";

export default function OnboardingForm() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [profileData, setProfileData] = useState({});
  const [unknownTime, setUnknownTime] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("");

  //birth place API fetching
  const countries = Country.getAllCountries();

  const activeCountry = countries.find(
    (country) => country.name === selectedCountry
  );

  const cities = activeCountry
    ? City.getCitiesOfCountry(activeCountry.isoCode).map((city) => city.name)
    : [];

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
    localStorage.setItem("userProfile", JSON.stringify(finalData));
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

            <h2>When is your birth date?</h2>

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
                  setProfileData((prev) => ({
                    ...prev,
                    birthCity: event.target.value,
                  }))
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
