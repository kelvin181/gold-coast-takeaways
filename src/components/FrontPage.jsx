import { motion } from "framer-motion";
import React from "react";
import { Link } from "react-router-dom";
import "../styles.css";

const FrontPage = () => {
  const line1 = "Fish & Chips";
  const line2 = "Customers Love";

  const sentence = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
  };

  const letter = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  const gradientColors = [
    "#333a56",
    "#384360",
    "#3d4d6a",
    "#425673",
    "#48607d",
    "#4d6a87",
    "#537490",
    "#597e99",
    "#5f89a2",
    "#6693ab",
    "#6d9eb4",
    "#74a8bd",
    "#7cb3c5",
    "#88b9c9",
  ];

  return (
    <div className="home-content">
      <motion.h1 variants={sentence} initial="hidden" animate="visible">
        {line1.split("").map((char, index) => {
          return (
            <motion.span key={char + "-" + index} variants={letter}>
              {char}
            </motion.span>
          );
        })}
      </motion.h1>
      <motion.h1 variants={sentence} initial="hidden" animate="visible">
        {line2.split("").map((char, index) => {
          return (
            <motion.span
              key={char + "-" + index}
              variants={letter}
              transition={{ delay: 0.72 + index * 0.06 }}
              style={{
                color: gradientColors[index],
              }}
            >
              {char}
            </motion.span>
          );
        })}
      </motion.h1>
      <motion.p
        variants={{
          hidden: { opacity: 0, y: 10 },
          spring: {
            opacity: 1,
            y: 0,
            transition: {
              type: "spring",
              stiffness: 75,
              damping: 20,
              delay: 1.86,
            },
          },
        }}
        initial="hidden"
        animate="spring"
      >
        Simplify your meals with our takeout service. Explore a diverse menu,
        enjoy friendly service, and savor every bite for a delightful dining
        experience.
      </motion.p>
      <motion.button
        variants={{
          hidden: { opacity: 0, y: 10 },
          spring: {
            opacity: 1,
            y: 0,
            transition: {
              type: "spring",
              stiffness: 75,
              damping: 20,
              delay: 2.16,
            },
          },
        }}
        initial="hidden"
        animate="spring"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Link to="/#order">Order Now</Link>
      </motion.button>
    </div>
  );
};

export default FrontPage;
