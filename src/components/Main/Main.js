import React from "react";

import "./Main.css";
import Promo from "../Promo/Promo";
import AboutProject from "../AboutProject/AboutProject";
import Techs from "../Techs/Techs";
import AboutMe from "../AboutMe/AboutMe";
import Header from "../Header/Header";

function Main({ loggedIn, isNavMenuOpen, onNavMenuOpen, onClose }) {
  return (
    <>
      <div className="main__container main__container_place_header">
        <Header
          loggedIn={loggedIn}
          isNavMenuOpen={isNavMenuOpen}
          onNavMenuOpen={onNavMenuOpen}
          onClose={onClose}
        ></Header>
        <Promo></Promo>
      </div>
      <AboutProject></AboutProject>
      <div className="main__container main__container_place_techs">
        <Techs></Techs>
      </div>
      <AboutMe></AboutMe>
    </>
  );
}

export default Main;
