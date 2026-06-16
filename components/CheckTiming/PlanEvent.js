import React, { useState, useEffect } from "react";
import styled from "styled-components";

const INITIAL_EVENTS = [
  { id: "date", name: "Date", emoji: "❤️" },
  { id: "wedding", name: "Wedding", emoji: "💍" },
  { id: "moving", name: "Moving", emoji: "🚚" },
  { id: "professional", name: "Professional Meeting", emoji: "💼" },
];

export default function PlanEvent({}) {
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const [formStep, setFormStep] = useState(1);

  // API loading states
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  // MongoDB Submission Handler
  const handleNextStep = async (event) => {
    event.preventDefault();

    // mandatory
    if (!selectedEventId || !selectedCountry || !selectedCity) {
      alert(
        "Please choose an event type, country, and city before proceeding."
      );
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/saved-dates", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          eventType: selectedEventId,
          eventCountry: selectedCountry,
          eventCity: selectedCity,
          // note: If your backend schema expects scores or dates later,
          // you can add placeholder default values here or add date inputs next!
        }),
      });

      if (response.ok) {
        //to the next step on this same page
        setFormStep(2);
      } else {
        const errorData = await response.json();
        alert(`Failed to save event: ${errorData.message || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Network database saving error:", error);
      alert("An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container>
      <Header>
        <Title>Plan an Event ✨</Title>
        <Subtitle>
          Tell us what you're planning and your timeframe. We'll find your 3
          best days.
        </Subtitle>
      </Header>

      <Main>
        <Description></Description>
      </Main>

      <EventContainer>
        <TitleBlock>
          <h2>1. What are you planning?</h2>
          <p>Choose your event type.</p>
        </TitleBlock>

        <GridContainer>
          {INITIAL_EVENTS.map((event) => (
            <EventCard
              key={event.id}
              $isActive={selectedEventId === event.id}
              onClick={() => setSelectedEventId(event.id)}
            >
              <EmojiWrapper>{event.emoji}</EmojiWrapper>
              <h3>{event.name}</h3>
            </EventCard>
          ))}
        </GridContainer>

        <TitleBlock>
          <h2>2. Where is your event?</h2>
        </TitleBlock>

        <Location>
          <InputGroup>
            <label htmlFor="eventCountry">Event Country</label>
            <StyledSelect
              id="eventCountry"
              name="eventCountry"
              value={selectedCountry}
              onChange={(event) => {
                setSelectedCountry(event.target.value);
                setSelectedCity("");
              }}
              required
            >
              <option value="">Select a Country</option>
              {countries.map((country) => (
                <option key={country.Iso2} value={country.name}>
                  {country.name}
                </option>
              ))}
            </StyledSelect>
          </InputGroup>

          {/* City */}
          <InputGroup>
            <label htmlFor="eventCity">Event City</label>
            <StyledSelect
              id="eventCity"
              name="eventCity"
              value={selectedCity}
              onChange={(event) => setSelectedCity(event.target.value)}
              disabled={!selectedCountry || cities.length === 0}
              required
            >
              <option value="">
                {!selectedCountry
                  ? "Choose country first"
                  : cities.length === 0
                    ? "Loading cities..."
                    : "Select City"}
              </option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </StyledSelect>
          </InputGroup>
        </Location>
      </EventContainer>

      <Footer>
        <Button onClick={handleNextStep} disabled={isSubmitting}>
          <ButtonIcon>✦</ButtonIcon>
          {isSubmitting ? "Saving Selections..." : "Continue to Next Step"}
        </Button>
      </Footer>

      {/*  STEP 2: Timeframe Selection / Date Calculation UI */}
      {formStep === 2 && (
        <>
          <EventContainer>
            <TitleBlock>
              <h2>3. Choose your Timeframe</h2>
              <p>
                Your event details are locked in! Now select your target months.
              </p>
            </TitleBlock>

            {/* 🛠️ Drop your timeframe calendar picker or input components right here! */}
            <PlaceholderBox>Timeframe components go here...</PlaceholderBox>
          </EventContainer>

          <Footer>
            <Button onClick={() => setFormStep(1)}>
              ← Back to Event Details
            </Button>
          </Footer>
        </>
      )}
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  max-width: 400px;
  height: 100vh;

  background-color: #141434;
  color: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 40px 24px;
  box-sizing: border-box;
  font-family: sans-serif;
  margin: 0 auto;
  position: relative;
`;

const Header = styled.header`
  text-align: center;
  margin-top: 40px;
`;

const Title = styled.h2`
  font-size: 26px;
  font-weight: 300;
  margin: 0 0 8px 0;

  line-height: 1.2;
`;

const Subtitle = styled.p`
  font-size: 15px;
  color: #ffffff;
  font-weight: 300;
  line-height: 1.4;
`;

const Main = styled.main`
  text-align: center;
  padding: 0 12px;
`;

const Description = styled.p`
  font-size: 16px;
  line-height: 1.6;
  color: #e2e2e2;
  margin: 0;
`;

const Footer = styled.footer`
  width: 100%;
  margin-bottom: 20px;
`;

const Button = styled.button`
  width: 100%;
  background-color: #222222;
  color: #ffffff;
  border: none;
  padding: 16px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  &:hover {
    background-color: #000000;
  }
`;

const ButtonIcon = styled.span`
  font-size: 18px;
`;

const EventContainer = styled.div`
  max-width: 450px;
  margin: 0 auto;
  padding: 20px;
`;

const TitleBlock = styled.div`
  h2 {
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 30px;
  }
  p {
    color: #ffffff;
    font-size: 14px;
  }
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin-bottom: 3rem;
  }
`;

const EventCard = styled.div`
  background: #625487;
  border-radius: 12px;
  padding: 14px;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  border: 1px solid ${(props) => (props.$isActive ? "#aa99ff" : "#2d293f")};
  box-shadow: ${(props) =>
    props.$isActive ? "0 4px 12px rgba(0,0,0,0.06)" : "none"};

  &:hover {
    border-color: "#cabfff";
  }

  h3 {
    font-size: 14px;
    font-weight: 400;
    margin: 0;
  }
`;

const EmojiWrapper = styled.div`
  font-size: 30px;
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

const Location = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
`;

const StyledSelect = styled.select`
  width: 100%;
  padding: 12px;
  background: #25234c;
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
