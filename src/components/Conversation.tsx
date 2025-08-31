import { useState, useEffect, useRef } from "react";

interface Props {
  onComplete: () => void;
}

interface Message {
  text: string;
  button?: string;
  userResponse?: string;
  sender: "bot" | "user";
}

const messages: Message[] = [
  { text: "Hey! Hello 😄", button: "Say Hi!👋", userResponse: "Hey hi 👋!", sender: "bot" },
  { text: "What day was it today again.....", sender: "bot" },
  { text: "Oh yeah today is 1st September", sender: "bot" },
  { text: "Huhn, that date seems familiar to me.......", sender: "bot" },
  { text: "What was it with 1st September again???", sender: "bot"},
  { text: "I forgot..", button: "I Don't Know 🤨", userResponse: "Hmm.. Idk, you tell 🤔", sender: "bot" },
  { text: "Oh yeah! How can I forget", sender: "bot" },
  { text: "Today is the day you were BORN 🎉", sender: "bot" },
  { text: "Today is YOUR...", sender: "bot", button: "Continue" }
];

const Conversation: React.FC<Props> = ({ onComplete }) => {
  const [step, setStep] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [displayText, setDisplayText] = useState("");
  const [buttonVisible, setButtonVisible] = useState(false);
  const [buttonPressed, setButtonPressed] = useState(false);
  const [renderedMessages, setRenderedMessages] = useState<Message[]>([]);
  const [bubbleSize, setBubbleSize] = useState<{ width: number; height: number }>({ width: 0, height: 0 });

  const bubbleRef = useRef<HTMLDivElement>(null);
  const currentMessage = messages[step];
  const messageInterval = 100;
  const typingInterval = 20;

  const exitConversation = () => {
    // reset everything
    setStep(0);
    setIsTyping(false);
    setDisplayText("");
    setButtonVisible(false);
    setButtonPressed(false);
    setRenderedMessages([]);
    setBubbleSize({ width: 0, height: 0 });

    // then move on
    onComplete();
  };

  useEffect(() => {
    let index = 0;

    setIsTyping(true);
    setDisplayText("");
    setButtonVisible(false);

    const interval = setInterval(() => {
      setDisplayText(currentMessage.text.slice(0, index + 1));
      index++;

      if (index === currentMessage.text.length) {
        clearInterval(interval);

        setRenderedMessages(prev => [...prev, currentMessage]);
        setIsTyping(false);
        setDisplayText("");

        // Check if last message
        const isLastMessage = step === messages.length - 1;

        if (!currentMessage.button) {
          if (isLastMessage) {
            // Trigger onComplete for the last message without a button
            setTimeout(() => exitConversation(), messageInterval);
          } else {
            setTimeout(() => setStep(prev => prev + 1), messageInterval);
          }
        } else {
          setButtonVisible(true); // show button if exists
        }
      }
    }, typingInterval);

    return () => clearInterval(interval);
  }, [step]);


  useEffect(() => {
    if (bubbleRef.current) {
      const rect = bubbleRef.current.getBoundingClientRect();
      setBubbleSize({ width: rect.width, height: rect.height });
    }
  }, [currentMessage]);


  const handleButtonClick = () => {
    setButtonPressed(true);

    setRenderedMessages(prev => [
      ...prev,
      currentMessage.userResponse ? { text: currentMessage.userResponse, sender: "user" } : null,
    ].filter(Boolean) as Message[]);

    setTimeout(() => {
      setButtonPressed(false);
      setButtonVisible(false);
      if (step === messages.length - 1) onComplete();
      else setStep(prev => prev + 1);
    }, 300); // button fade out duration
  };

  return (
    <div className="flex flex-col h-full w-full p-4 justify-end overflow-y-auto">
      <div
        ref={bubbleRef}
        className="absolute top-0 left-0 invisible px-4 py-2 max-w-[85%] break-words"
        style={{ whiteSpace: "pre-wrap" }}
      >
        {currentMessage.text}
      </div>
      {renderedMessages.map((msg, idx) => (
        <div
          key={idx}
          className={`flex mb-2 ${msg.sender === "bot" ? "justify-start" : "justify-end"}`}
        >
          <div
            className={`px-4 py-2 rounded-2xl max-w-[85%] break-words ${
              msg.sender === "bot"
                ? "bg-pastel-white text-pastel-purple rounded-bl-none"
                : "bg-pastel-yellow text-pastel-purple rounded-br-none pop-animation"
            }`}
          >
            {msg.text}
          </div>
        </div>
      ))}

      {/* Typing message */}
      {isTyping && (
        <div className={`flex mb-2 ${currentMessage.sender === "bot" ? "justify-start" : "justify-end"}`}>
          <div
            className={`pop-animation px-4 py-2 rounded-2xl max-w-[85%] break-words ${
              currentMessage.sender === "bot"
                ? "bg-pastel-white text-pastel-purple rounded-bl-none"
                : "bg-pastel-yellow text-pastel-purple rounded-br-none"
            }`} 
            style={{ width: bubbleSize.width, height: bubbleSize.height }}
          >
            {displayText}
          </div>
        </div>
      )}

      {/* Button container */}
      <div className="h-16 flex justify-center items-center mt-2">
        {currentMessage.button && (
          <button
            className={`bg-pastel-red text-pastel-white font-bold px-4 py-2 rounded-full shadow-md hover:scale-105 transition-opacity duration-300 ${
              buttonVisible && !buttonPressed ? "opacity-100" : "opacity-0"
            }`}
            onClick={handleButtonClick}
          >
            {currentMessage.button}
          </button>
        )}
      </div>
    </div>
  );
};

export default Conversation;
