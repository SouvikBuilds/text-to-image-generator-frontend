import React from "react";
import Header from "../components/Header.jsx";
import Steps from "../components/Steps.jsx";
import Description from "../components/Description.jsx";
import TestimonialsSection from "../components/TestimonialsSection.jsx";
import GenerateBtn from "../components/GenerateBtn.jsx";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";

const Home = () => {
  return (
    <>
      <Navbar />
      <div>
        <Header />
        <Steps />
        <Description />
        <TestimonialsSection />
        <GenerateBtn />
      </div>
      <Footer />
    </>
  );
};

export default Home;
