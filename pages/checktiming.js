import { useState } from "react";
import PlanEvent from "../components/CheckTiming/PlanEvent";
import ResultsList from "../components/CheckTiming/ResultsList";

export default function CheckTimingPage() {
  const [showResults, setShowResults] = useState(false);

  return (
    <>
      {!showResults ? (
        <PlanEvent onCalculationComplete={() => setShowResults(true)} />
      ) : (
        <ResultsList onBackToForm={() => setShowResults(false)} />
      )}
    </>
  );
}
