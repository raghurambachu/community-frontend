import React from "react";
import Header from "./general/Header";
import HeroSection from "./landingpage/HeroSection";
import InfoSection from "./landingpage/InfoSection";
import Footer from "./general/Footer";

class LandingPage extends React.Component {
  render() {
    return (
      <div className="landing-page">
        <Header
          history={this.props.history}
          handleIsLoggedIn={this.props.handleIsLoggedIn}
          isLoggedIn={this.props.isLoggedIn}
          updateUsername={this.props.updateUsername}
        />
        <HeroSection />
        <InfoSection />
        <Footer />
      </div>
    );
  }
}

export default LandingPage;
