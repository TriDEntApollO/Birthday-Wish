import { useEffect, useState } from "react";
import ReactConfetti from "react-confetti";

interface Props {
  targetAge: number;
  onComplete?: () => void;
}

const BirthdayCounter: React.FC<Props> = ({ targetAge, onComplete }) => {
  const [age, setAge] = useState(0);
  const [finished, setFinished] = useState(false);
  const [confetti, setConfetti] = useState(false);

  const exitHandler = () => {
  setAge(0);
  setFinished(false);
  setConfetti(false);

  if (onComplete) {
    onComplete();
  }
};


  useEffect(() => {
    const interval = setInterval(() => {
      setAge((prev) => {
        if (prev >= targetAge) {
          clearInterval(interval);
          setConfetti(true);
          setFinished(true); // trigger finished state
          return targetAge;
        }
        return prev + 1;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [targetAge]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {/* Confetti */}
      {confetti && (
        <ReactConfetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={300}
        />
      )}

      {/* Top text */}
      <div
        className={`text-pastel-yellow text-4xl md:text-5xl font-extrabold mb-4 drop-shadow-lg ${finished ? "pop-animation" : "opacity-0"}`}
        style={{ textShadow: "2px 2px 12px rgba(0,0,0,0.2)" }}
      >
        It Is Your
      </div>

      {/* Counter */}
      <div
        className={`relative text-6xl md:text-8xl font-extrabold bg-clip-text font-italic text-pastel-blue transition-all duration-500 ${finished ? "pop-animation" : ""}`}
        style={{
          WebkitTextStroke: "2px white",
          textShadow: "2px 2px 12px rgba(0,0,0,0.4)"
        }}
      >
        {age === targetAge ? `${targetAge}st` : age}
      </div>

      {/* Bottom text */}
      <div
        className={`text-pastel-white text-4xl md:text-5xl font-extrabold mt-4 drop-shadow-lg ${finished ? "pop-animation animate-pulse" : "opacity-0"}`}
        style={{
          textShadow: `
            0 0 6px var(--tw-pastel-blue),
            0 0 12px var(--tw-pastel-purple),
            0 0 18px var(--tw-pastel-pink),
            0 0 24px var(--tw-pastel-yellow)
          `
        }}
      >
        Birthday!
      </div>

      {/* Continue button */}
      <button
        onClick={exitHandler}
        className={`mt-8 px-6 py-3 bg-pastel-purple text-pastel-white font-bold rounded-lg shadow-lg transition-colors ${finished ? "pop-animation" : "opacity-0"}`}
      >
        Cut Cake
      </button>

    </div>
  );
};

export default BirthdayCounter;
