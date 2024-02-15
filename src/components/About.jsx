import { motion, useAnimationControls } from "framer-motion";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import storeFrontImage from "../images/store-front3.jpg";

const About = () => {
  const textControl = useAnimationControls();
  const [textRef, textInView] = useInView();
  const imgControl = useAnimationControls();
  const [imgRef, imgInView] = useInView();

  const animationScale = {
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
    hidden: { opacity: 0, scale: 0 },
  };

  useEffect(() => {
    if (textInView) {
      textControl.start("visible");
    }
  }, [textControl, textInView]);

  useEffect(() => {
    if (imgInView) {
      imgControl.start("visible");
    }
  }, [imgControl, imgInView]);

  return (
    <>
      <motion.div
        className="about-text"
        ref={textRef}
        variants={animationScale}
        initial="hidden"
        animate={textControl}
      >
        <h1>Welcome to Gold Coast Takeaways</h1>
        <p>
          Proudly operated by dedicated owners, our menu features signature fish
          and chips, mouthwatering burgers, toasties, and more. With a
          commitment to quality and fresh, locally-sourced ingredients, every
          dish is crafted to perfection. Discover the warmth, flavors, and joy
          of sharing a meal at Gold Coast Takeaways.
        </p>
      </motion.div>
      <motion.div
        className="about-img"
        ref={imgRef}
        variants={animationScale}
        initial="hidden"
        animate={imgControl}
      >
        <img src={storeFrontImage} alt="about photo" />
      </motion.div>
    </>
  );
};

export default About;
