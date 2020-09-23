import React from "react";
import Header from "./landingpage/Header";
import HeroSection from "./landingpage/HeroSection";
import InfoSection from "./landingpage/InfoSection";
import Footer from "./landingpage/Footer";

class LandingPage extends React.Component {
  render() {
    return (
      <div className="landing-page">
        <Header />
        <HeroSection />
        <InfoSection />
        <Footer />
      </div>
    );
  }
}

export default LandingPage;
