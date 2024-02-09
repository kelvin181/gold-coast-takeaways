import { motion } from "framer-motion";
import React from "react";
import { Link } from "react-router-dom";
import scrollArrow from "../images/scroll-arrow.svg";
import "../styles.css";
import About from "./About";
import FrontPage from "./FrontPage";
import StoreInfo from "./StoreInfo";

const Home = () => {
  return (
    <>
      <div className="slides home" id="home">
        <FrontPage />
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
            <img src={scrollArrow} alt="scroll arrow" />
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
