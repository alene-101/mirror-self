import React, { useState } from "react";
import WelcomeScreen from "./WelcomeScreen";
import OnboardingScreen from "./OnboardingScreen";
import HomeScreen from "./HomeScreen";
import MilestonesScreen from "./MilestonesScreen";

function App() {
  const [step, setStep] = useState(0);

  if (step === 0) return <WelcomeScreen onStart={() => setStep(1)} />;
  if (step === 1) return <OnboardingScreen onContinue={() => setStep(2)} />;
  if (step === 2) return <HomeScreen onGoToMilestones={() => setStep(3)} />;
  if (step === 3) return <MilestonesScreen onGoHome={() => setStep(2)} />;

  return null;
}

export default App;