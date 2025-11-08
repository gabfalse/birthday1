import React, { useState } from "react";
import LandingPage from "../Components/LandingPage";
import StoryPage from "./StoryPage";
import EventPage from "./EventPage";

function HomePage() {
  const [step, setStep] = useState(1);

  return (
    <div>
      {step === 1 && <LandingPage onNext={() => setStep(2)} />}
      {step === 2 && <StoryPage onNext={() => setStep(3)} />}
      {step === 3 && <EventPage />}
    </div>
  );
}

export default HomePage;
