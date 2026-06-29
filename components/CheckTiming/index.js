import { useState } from "react";
import ResultsList from "../ResultsList/index.js";
import { Country, City } from "country-state-city";
import {
  Container,
  Header,
  Title,
  Subtitle,
  Footer,
  EventContainer,
  TitleBlock,
  GridContainer,
  EventCard,
  EmojiWrapper,
  InputGroup,
  Location,
  StyledSelect,
  StyledInput,
  CheckboxGroup,
  StyledCheckbox,
  CheckboxLabel,
  IconInputWrapper,
  SelectIcon,
  DropdownWithIcon,
} from "./CheckTiming.styled";
import Button from "../ui-elements/Button";

const INITIAL_EVENTS = [
  { id: "date", name: "Date", emoji: "♡" },
  { id: "wedding", name: "Wedding", emoji: "⚢" },
  { id: "moving", name: "Moving", emoji: "༄" },
  { id: "professional", name: "Professional Meeting", emoji: "͟웃̟͟" },
];

export default function CheckTiming({ onCalculationComplete }) {
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const todayString = new Date().toISOString().split("T")[0];
  const [timeframe, setTimeframe] = useState("1 week");
  const [onlyWeekends, setOnlyWeekends] = useState(false);

  const [partnerSunSign, setPartnerSunSign] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [weatherMatters, setWeatherMatters] = useState(false);

  const countries = Country.getAllCountries();

  const activeCountry = countries.find(
    (country) => country.name === selectedCountry
  );

  const cities = activeCountry
    ? City.getCitiesOfCountry(activeCountry.isoCode).map((city) => city.name)
    : [];

  // data collection

  const handleSubmitAllData = async (event) => {
    // prevents the browser from accidentally triggering a double-submit
    if (event && typeof event.preventDefault === "function") {
      event.preventDefault();
    }

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
        weatherMatters,
        partnerSunSign,
      };

      localStorage.setItem(
        "pending_event_calculation",
        JSON.stringify(eventCalculation)
      );

      setShowResults(true);

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

  if (showResults) {
    return <ResultsList onBack={() => setShowResults(false)} />;
  }

  return (
    <Container as="form" onSubmit={handleSubmitAllData}>
      <Header>
        <Title>✧ Plan an Event </Title>
        <Subtitle>
          Tell us what you{"'"}re planning and your timeframe. <br></br>We{"'"}
          ll find your 3 best days.
        </Subtitle>
      </Header>
      <EventContainer>
        <TitleBlock>
          <h2>What are you planning?</h2>
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
          <h2>Where is your event?</h2>
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
          <h2>When do you want to time the event?</h2>
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

        {(timeframe === "1 week" || timeframe === "2 weeks") && (
          <CheckboxGroup>
            <StyledCheckbox
              type="checkbox"
              id="weatherMatters"
              checked={weatherMatters}
              onChange={(event) => setWeatherMatters(event.target.checked)}
            />
            <CheckboxLabel htmlFor="weatherMatters">
              Good weather is important
            </CheckboxLabel>
          </CheckboxGroup>
        )}
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
        <Button type="submit">✧ Check my cosmic timing</Button>
      </Footer>
    </Container>
  );
}
