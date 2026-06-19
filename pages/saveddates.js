import { useState } from "react";
import SavedList from "@/components/SavedList/SavedList";

export default function CheckTimingPage() {
  const [showResults, setShowResults] = useState(false);

  return (
    <>
      <SavedList onBackToForm={() => setShowResults(false)} />
    </>
  );
}
