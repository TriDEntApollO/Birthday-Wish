import { motion } from "framer-motion";

const balloonColors = ["#F9C0C0", "#FDE2C0", "#C0F9DE", "#C0D4F9", "#F0C0F9"];

const Balloons = () => {
  return (
    <>
      {[...Array(10)].map((_, i) => {
        const color = balloonColors[i % balloonColors.length];
        const startX = Math.random() * 90;
        const drift = (Math.random() - 0.5) * 30;
        const duration = 6 + Math.random() * 4;
        const delay = i === 0 ? 0 : Math.random() * 1.2;

        return (
          <motion.div
            key={i}
            className="absolute flex flex-col items-center"
            style={{ left: `${startX}%`, bottom: -100 }}
            animate={{
              y: ["15vh", "-120vh"],
              x: [0, drift, 0],
            }}
            transition={{
              duration: duration,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
              delay: delay,
            }}
          >
            {/* Balloon with realistic shape */}
            <svg width="110" height="150" viewBox="0 0 512 512">
              <line x1="256" y1="300" x2="256" y2="500" stroke="gray" strokeWidth="8" />
              <polygon fill={color} points="255.998,298.897 232.196,345.391 279.798,345.392 	"/>
              <path fill={color} d="M256.002,0l0.022,298.886c2.059-0.841,133.928-55.097,133.928-164.936
                C389.952,59.968,329.973,0,256.002,0z"/>
              <path
                d="M256.002,0c55.628,0,100.739,59.968,100.739,133.95c0,109.839-99.167,164.095-100.717,164.936
	c-0.022,0.011-133.972-47.027-133.972-164.936C122.051,59.968,182.019,0,256.002,0z"
                fill={color}
              />
              {/* String inside SVG */}
            </svg>

          </motion.div>
        );
      })}
    </>
  );
};

export default Balloons;
