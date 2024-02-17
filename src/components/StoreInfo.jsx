import { motion, useAnimationControls } from "framer-motion";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import "../styles.css";
import Contact from "./Contact";
import Location from "./Location";
import OpeningHours from "./OpeningHours";

const StoreInfo = (props) => {
  const contactControl = useAnimationControls();
  const [contactRef, contactInView] = useInView();
  const hoursControl = useAnimationControls();
  const [hoursRef, hoursInView] = useInView();

  const { currentLoad } = props;

  const animationSlideUp = {
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
    if (contactInView) {
      contactControl.start("spring");
    }
  }, [contactControl, contactInView]);

  useEffect(() => {
    if (hoursInView) {
      hoursControl.start("spring");
    }
  }, [hoursControl, hoursInView]);

  return (
    <>
      <div className="section-title">
        <h2>Store Information</h2>
      </div>
      <div className="store-info">
        <div className="contact-hours-container">
          <motion.div
            className="contact"
            ref={contactRef}
            variants={animationSlideUp}
            initial="hidden"
            animate={contactControl}
          >
            <Contact />
          </motion.div>
          <motion.div
            className="opening-hours"
            ref={hoursRef}
            variants={animationSlideUp}
            initial="hidden"
            animate={hoursControl}
          >
            <OpeningHours />
          </motion.div>
        </div>
      </div>
      <Location currentLoad={currentLoad} />
    </>
  );
};

export default StoreInfo;
