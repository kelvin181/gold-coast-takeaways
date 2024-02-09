import { motion, useAnimation } from "framer-motion";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import "../styles.css";
import Contact from "./Contact";
import Location from "./Location";
import OpeningHours from "./OpeningHours";

const StoreInfo = () => {
  const infoControl = useAnimation();
  const [infoRef, infoInView] = useInView();

  const animationSlideDown = {
    hidden: { opacity: 0, y: 50 },
    spring: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 75,
        damping: 20,
        delay: 0.3,
      },
    },
  };

  useEffect(() => {
    if (infoInView) {
      infoControl.start("spring");
    }
  }, [infoControl, infoInView]);

  return (
    <>
      <div className="section-title">
        <h2>Store Information</h2>
      </div>
      <motion.div
        className="store-info"
        ref={infoRef}
        variants={animationSlideDown}
        initial="hidden"
        animate={infoControl}
      >
        <div className="contact-hours-container">
          <div className="contact">
            <Contact />
          </div>
          <div className="opening-hours">
            <OpeningHours />
          </div>
        </div>
      </motion.div>
      <div className="google-map">
        <Location />
      </div>
    </>
  );
};

export default StoreInfo;