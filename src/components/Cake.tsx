import cakeImg from "../assets/cake.png"; // adjust path if needed

interface CakeProps {
  candlesLit: boolean;
}

const Cake = ({ candlesLit }: CakeProps) => {
  return (
    <div className="relative flex justify-center items-center">
      {/* Cake Image */}
      <img
        src={cakeImg}
        alt="Birthday Cake"
        className="w-48 md:w-64 relative z-0"
      />

      {/* Candles */}
      <div className="absolute -top-2 flex justify-center space-x-4 z-10">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="relative flex flex-col items-center">
            {/* Stick */}
            <div
              className={`w-[5px] h-8 rounded-sm bg-pastel-blue`}
            />

            {/* Flame String */}
            <div className="absolute -top-2 w-[2px] h-2 bg-black" />

            {/* Flame */}
            {candlesLit && (
              <div
                className={`absolute -top-6 w-3 h-5 bg-gradient-to-t from-yellow-400 via-yellow-200 to-transparent
                animate-flicker-${i}`}
                style={{
                  clipPath:
                    "polygon(50% 0%, 80% 40%, 60% 100%, 40% 100%, 20% 40%)",
                }}
              />
            )}
          </div>
        ))}
      </div>

      {/* Flicker Animations */}
      <style>
        {`
          @keyframes flicker {
            0% { opacity: 1; transform: scale(1) translateY(0); }
            25% { opacity: 0.7; transform: scale(1.05) translateY(-1px); }
            50% { opacity: 0.9; transform: scale(0.95) translateY(1px); }
            75% { opacity: 0.8; transform: scale(1.1) translateY(-2px); }
            100% { opacity: 1; transform: scale(1) translateY(0); }
          }
          ${[...Array(6)]
            .map(
              (_, i) =>
                `.animate-flicker-${i} { animation: flicker ${
                  1.5 + Math.random()
                }s infinite ease-in-out; }`
            )
            .join("\n")}
        `}
      </style>
    </div>
  );
};

export default Cake;
