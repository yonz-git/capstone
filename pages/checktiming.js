import { useState } from "react";
import PlanEvent from "../components/CheckTiming/PlanEvent";
import YourBestDays from "../components/CheckTiming/YourBestDays";

export default function CheckTimingPage() {
  const [showResults, setShowResults] = useState(false);

  return (
    <>
      {!showResults ? (
        <PlanEvent onCalculationComplete={() => setShowResults(true)} />
      ) : (
        <YourBestDays onBackToForm={() => setShowResults(false)} />
      )}
    </>
  );
}
