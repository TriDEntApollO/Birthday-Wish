interface StartPageProps {
  onComplete: () => void;
}

const StartPage = ({ onComplete }: StartPageProps) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen bg-pastel-gradient">
      <button
        className="text-3xl px-10 py-6 font-bold rounded-2xl shadow-lg bg-pastel-red text-white drop-shadow-2xl"
        onClick={onComplete}
      >
        Start 🎉
      </button>
    </div>
  );
};

export default StartPage;
