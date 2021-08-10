import React from "react";

import "./Main.css";
import Promo from "../Promo/Promo";
import AboutProject from "../AboutProject/AboutProject";
import Techs from "../Techs/Techs";
import AboutMe from "../AboutMe/AboutMe";
import Portfolio from "../Portfolio/Portfolio";
import Header from "../Header/Header";

function Main({ loggedIn, isNavMenuOpen, onNavMenuOpen, onClose }) {
  return (
    <>
      <div className="main__header-container">
        <Header
          loggedIn={loggedIn}
          isNavMenuOpen={isNavMenuOpen}
          onNavMenuOpen={onNavMenuOpen}
          onClose={onClose}
        ></Header>
        <Promo></Promo>
      </div>
      <AboutProject></AboutProject>
      <Techs></Techs>
      <AboutMe></AboutMe>
      <Portfolio></Portfolio>
    </>
  );
}

export default Main;
