import Cake from "./Cake";
import { useState } from "react";
import Balloons from "./Balloons";
import BirthdayCard from "./BirthdayCard";
import ConfettiEffect from "./ConfettiEffect";

interface BirthdaySceneProps {
  onComplete: () => void;
}

const BirthdayScene = ({ onComplete }: BirthdaySceneProps) => {
  const [candlesLit, setCandlesLit] = useState(true);
  const [cardVisible, setCardVisible] = useState(false);
  const [confetti, setConfetti] = useState(false);

  const handleBlowCandles = () => {
    setCandlesLit(false);
    setConfetti(true); // 🎉 show confetti
    setTimeout(() => setCardVisible(true), 1000); // show card after 1s
  };

  const handleRestart = () => {
    setCandlesLit(true);
    setCardVisible(false);
    setConfetti(false);
    onComplete();
  };

  return (
    <div className="relative h-full w-full bg-pastel-purple flex flex-col items-center justify-center overflow-hidden">
      <Balloons />

      {/* 🎉 Confetti overlays everything */}
      {confetti && <ConfettiEffect />}

      {/* Reserve space for card + cake */}
      <div className="flex flex-col items-center justify-center">
        {/* 🎁 Card (always rendered, just fade in/out) */}
        <div
          className={`transition-opacity duration-700 ${
            cardVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <BirthdayCard />
        </div>

        {/* 🎂 Cake below card */}
        <div className="mt-20">
          <Cake candlesLit={candlesLit} />
        </div>
      </div>

      {/* Buttons container */}
      <div className="mt-10 relative">
        {/* Blow button */}
        <button
          className={`bg-pastel-green text-pastel-purple px-4 py-2 rounded-full shadow-md hover:scale-105 font-bold border-4 border-deep-pastel-green transition-opacity duration-500 ${
            candlesLit && !cardVisible ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          onClick={handleBlowCandles}
        >
          Press to Blow the Candles
        </button>

        {/* Restart button */}
        <button
          className={` w-full absolute left-1/2 -translate-x-1/2 bg-pastel-yellow text-pastel-purple px-4 py-2 rounded-full shadow-md border-4 border-pastel-white font-bold transition-opacity duration-500 ${
            !candlesLit && cardVisible ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          onClick={handleRestart}
        >
          Restart Experience
        </button>
      </div>
    </div>
  );
};

export default BirthdayScene;
