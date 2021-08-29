import React from "react";

import "./Main.css";
import Promo from "../Promo/Promo";
import AboutProject from "../AboutProject/AboutProject";
import Techs from "../Techs/Techs";
import AboutMe from "../AboutMe/AboutMe";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

function Main({ loggedIn, isNavMenuOpen, onNavMenuOpen, onClose }) {
  React.useEffect(() => {
    document.title = "Главная — Movies Explorer";
  }, []);

  return (
    <>
      <Header
        loggedIn={loggedIn}
        isNavMenuOpen={isNavMenuOpen}
        onNavMenuOpen={onNavMenuOpen}
        onClose={onClose}
        isMainPlace={true}
      />
      <main className="main">
        <Promo/>
        <AboutProject/>
        <Techs/>
        <AboutMe/>
      </main>
      <Footer/>
    </>
  );
}

export default Main;
