import React from "react";
import "./styles.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Menu from "./components/Menu";
import Home from "./components/Home";
import ScrollToAnchor from "./components/ScrollToAnchor";
import Navbar from "./components/NavBar";

const App = () => {
  return (
    <>
      <ScrollToAnchor />
      <Toaster
        position="bottom-center"
        reverseOrder={false}
        toastOptions={{
          success: {
            iconTheme: {
              primary: "green",
              secondary: "white",
            },
            duration: 1000
          },
          error :{
            duration: 1000
          }
        }}
      />
      <Routes>
        <Route
          path="*"
          element={
            <>
              <Navbar isHomePage={true} />
              <main>
                <Routes>
                  <Route path="*" element={<Home />} />
                </Routes>
              </main>
            </>
          }
        />
        <Route
          path="/menu/*"
          element={
            <>
              <Navbar isHomePage={false} />
              <main>
                <Routes>
                  <Route path="/" element={<Menu />} />
                </Routes>
              </main>
            </>
          }
        />
      </Routes>
    </>
  );
};

export default App;