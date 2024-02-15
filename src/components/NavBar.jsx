import { motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../images/logo-trans.png";
import "../styles.css";

const Navbar = ({ isHomePage }) => {
  const [navOpen, setNavOpen] = useState(false);
  const location = useLocation();
  const navRef = useRef();
  const headerRef = useRef();

  const showNavBar = () => {
    setNavOpen(!navOpen);
    navRef.current.classList.toggle("responsive-nav");
    headerRef.current.classList.toggle("fixed-nav");
  };

  useEffect(() => {
    if (navOpen && location.pathname === "/Menu") {
      window.scrollTo(0, 0);
    }
  }, [navOpen, location]);

  return (
    <header
      ref={headerRef}
      className={isHomePage ? "home-navbar" : "menu-navbar"}
    >
      <Link
        to="/#home"
        className="nav-img"
        onClick={navOpen ? showNavBar : undefined}
      >
        <motion.img
          className="navbar-img"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          src={logo}
          alt="Shop logo"
        ></motion.img>
      </Link>
      <nav ref={navRef}>
        <ul>
          <motion.li
            className="menu-dropdown-underline"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Link to="/#home" onClick={showNavBar}>
              HOME
            </Link>
          </motion.li>
          <motion.li
            className="menu-dropdown-underline"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Link to="/#about" onClick={showNavBar}>
              ABOUT
            </Link>
          </motion.li>
          <motion.li whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Link to="/Menu#menu" onClick={showNavBar}>
              MENU
            </Link>
          </motion.li>
        </ul>
      </nav>
      <button
        className={`nav-btn ${navOpen ? "nav-close" : "nav-open"}`}
        onClick={showNavBar}
      >
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </button>
    </header>
  );
};

export default Navbar;
