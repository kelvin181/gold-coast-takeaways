import { motion } from "framer-motion";
import React from "react";
import { Link } from "react-router-dom";
import "../styles.css";
import About from "./About";
import StoreInfo from "./StoreInfo";

const Home = () => {
  const line1 = "Fish & Chips";
  const line2 = "Customers Love";

  const sentence = {
    hidden: { opacity: 1 },
    visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
  };

  const letter = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };
  return (
    <>
      <div className="slides home" id="home">
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
                >
                  {char}
                </motion.span>
              );
            })}

            {/* Fish & Chips <span className="blue-text">Customers Love</span> */}
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
            Simplify your meals with our takeout service. Explore a diverse
            menu, enjoy friendly service, and savor every bite for a delightful
            dining experience.
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
        <motion.button
          className="down-button"
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
          <Link to="/#about">
            <img src="src/images/scroll-arrow.svg" alt="scroll arrow" />
          </Link>
        </motion.button>
      </div>
      <div className="slides" id="about">
        <About />
      </div>
      <div className="store-info-section" id="order">
        <StoreInfo />
      </div>
    </>
  );
};

export default Home;
