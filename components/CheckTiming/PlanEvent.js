import React, { useState } from "react";
import styled from "styled-components";
import useSWR from "swr";

const INITIAL_EVENTS = [
  { id: "date", name: "Date", emoji: "❤️" },
  { id: "wedding", name: "Wedding", emoji: "💍" },
  { id: "moving", name: "Moving", emoji: "🚚" },
  { id: "professional", name: "Professional Meeting", emoji: "💼" },
];

export default function PlanEvent({ onCalculationComplete }) {
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const todayString = new Date().toISOString().split("T")[0];
  const [timeframe, setTimeframe] = useState("1 week");
  const [onlyWeekends, setOnlyWeekends] = useState(false);

  const [partnerSunSign, setPartnerSunSign] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // API loading states
  const { data: countriesData } = useSWR(
    "https://countriesnow.space/api/v0.1/countries/iso"
  );
  const countries = countriesData?.data || [];

  const { data: citiesData } = useSWR(
    selectedCountry
      ? [
          "https://countriesnow.space/api/v0.1/countries/cities",
          selectedCountry,
        ]
      : null,
    ([url, country]) =>
      fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ country }),
      }).then((response) => response.json())
  );
  const cities = citiesData?.data || [];

  // data collection

  const handleSubmitAllData = async (event) => {
    event.preventDefault();

    if (
      !selectedEventId ||
      !selectedCountry ||
      !selectedCity ||
      !selectedDate
    ) {
      alert("Please complete all sections.");
      return;
    }

    setIsSubmitting(true);

    try {
      const eventCalculation = {
        eventType: selectedEventId,
        eventCountry: selectedCountry,
        eventCity: selectedCity,
        startDate: selectedDate,
        timeframe,
        onlyWeekends,
        partnerSunSign,
      };

      localStorage.setItem(
        "pending_event_calculation",
        JSON.stringify(eventCalculation)
      );

      if (onCalculationComplete) {
        onCalculationComplete();
      }
    } catch (error) {
      console.error("Error stringifying form inputs to local storage:", error);
      alert("Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container as="form" onSubmit={handleSubmitAllData}>
      <Header>
        <Title>✨ Plan an Event </Title>
        <Subtitle>
          Tell us what you{"'"}re planning and your timeframe. <br></br>We{"'"}
          ll find your 3 best days.
        </Subtitle>
      </Header>
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
      </EventContainer>
      <EventContainer>
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
      <EventContainer>
        <TitleBlock>
          <h2>3. When do you want to time the event?</h2>
        </TitleBlock>
        <InputGroup>
          <label htmlFor="startDate">Start Date</label>
          <StyledInput
            type="date"
            id="startDate"
            name="startDate"
            value={selectedDate}
            min={todayString} // only future dates
            onChange={(event) => setSelectedDate(event.target.value)}
          />
        </InputGroup>

        <InputGroup>
          <label htmlFor="timeframe">Choose your Timeframe</label>
          <StyledSelect
            id="timeframe"
            name="timeframe"
            value={timeframe}
            onChange={(event) => setTimeframe(event.target.value)}
            required
          >
            <option value="1 week">1 Week</option>
            <option value="2 weeks">2 Weeks</option>
            <option value="3 weeks">3 Weeks</option>
            <option value="1 month">1 Month</option>
            <option value="3 months">3 Months</option>
            <option value="6 months">6 Months</option>
          </StyledSelect>
        </InputGroup>

        <CheckboxGroup>
          <StyledCheckbox
            type="checkbox"
            id="onlyWeekends"
            name="onlyWeekends"
            checked={onlyWeekends}
            onChange={(event) => setOnlyWeekends(event.target.checked)}
          />
          <CheckboxLabel htmlFor="onlyWeekends">Only weekends</CheckboxLabel>
        </CheckboxGroup>
      </EventContainer>

      {/* only for date and wedding */}
      {(selectedEventId === "date" || selectedEventId === "wedding") && (
        <EventContainer>
          <TitleBlock>
            <h2>4. Partner{"'"}s Sun Sign (Optional)</h2>
            <p>
              Add your partner{"'"}s sun sign for deeper compatibility insights.
            </p>
          </TitleBlock>

          <IconInputWrapper>
            <SelectIcon>☀️</SelectIcon>
            <DropdownWithIcon
              id="partnerSunSign"
              name="partnerSunSign"
              value={partnerSunSign}
              onChange={(event) => setPartnerSunSign(event.target.value)}
            >
              <option value="">Select Sun Sign</option>
              <option value="aries">Aries</option>
              <option value="taurus">Taurus</option>
              <option value="gemini">Gemini</option>
              <option value="cancer">Cancer</option>
              <option value="leo">Leo</option>
              <option value="virgo">Virgo</option>
              <option value="libra">Libra</option>
              <option value="scorpio">Scorpio</option>
              <option value="sagittarius">Sagittarius</option>
              <option value="capricorn">Capricorn</option>
              <option value="aquarius">Aquarius</option>
              <option value="pisces">Pisces</option>
            </DropdownWithIcon>
          </IconInputWrapper>
        </EventContainer>
      )}
      <Footer>
        <Button disabled={isSubmitting}>
          {isSubmitting ? "Calculating..." : "🌙 Check my cosmic timing "}
        </Button>
      </Footer>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  max-width: 400px;
  height: auto;

  background-color: #141434;
  color: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 40px 24px;
  box-sizing: border-box;

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
  margin: 0 0 30px 0;

  line-height: 1.2;
`;

const Subtitle = styled.p`
  font-size: 15px;
  color: #ffffff;
  font-weight: 300;
  line-height: 1.4;
  padding-bottom: 30px;
`;

const Footer = styled.footer`
  width: 100%;
  margin-bottom: 60px;
`;

const Button = styled.button`
  width: 100%;
  background-color: #222222;
  color: #ffffff;
  border: none;
  padding: 12px 0 18px 0;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 400;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: #000000;
  }
`;

const EventContainer = styled.div`
  max-width: 90vw;
  margin-bottom: 3rem;
`;

const TitleBlock = styled.div`
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

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;

  }
`;

const EventCard = styled.div`
  background: #625487;
  border-radius: 12px;
  padding: 16px;
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
    margin-top: 10px;
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

const StyledInput = styled.input`
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

const CheckboxGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const StyledCheckbox = styled.input`
  width: 18px;
  height: 18px;
  cursor: pointer;
  accent-color: #aa99ff;
`;

const CheckboxLabel = styled.label`
  font-size: 14px;
  color: #ffffff;
  cursor: pointer;
  user-select: none;
`;

//partner sun sign

const IconInputWrapper = styled.div`
  position: relative;
  width: 100%;
  margin-top: 12px;
  display: flex;
  align-items: center;
`;

const SelectIcon = styled.span`
  position: absolute;
  left: 14px;
  font-size: 16px;
  color: #b0afcf;
  pointer-events: none; /* Ensures clicking the icon still opens the dropdown menu underneath! */
  display: flex;
  align-items: center;
`;

const DropdownWithIcon = styled.select`
  width: 100%;
  padding: 14px 14px 14px 42px; /* 💡 Extra padding-left (42px) leaves perfect room for the sun icon! */
  background-color: #25234c;
  border: 1px solid #3c3973;
  color: #ffffff;
  border-radius: 12px;
  font-size: 14px;
  outline: none;
  cursor: pointer;
  appearance: none; /* Hides default native browser arrow styling if you want custom arrow control */

  &:focus {
    border-color: #aa99ff;
  }
`;
