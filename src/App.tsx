import { useState } from "react";
import Conversation from "./components/Conversation";
import BirthdayCounter from "./components/BirthdayCounter";
import BirthdayScene from "./components/BirthdayScene";
import StartPage from "./components/Start";

const App = () => {
  const [step, setStep] = useState<"start" | "conversation" | "counter" | "scene">("start");

  return (
    <div className="flex h-screen justify-center items-center w-screen bg-pastel-gradient">
      {step === "start" && <StartPage onComplete={() => setStep("conversation")} />}
      {step === "conversation" && <Conversation onComplete={() => setStep("counter")} />}
      {step === "counter" && <BirthdayCounter targetAge={21} onComplete={() => setStep("scene")} />}
      {step === "scene" && <BirthdayScene onComplete={() => setStep("start")} />}
    </div>
  );
};

export default App;
