import React from "react";

import './Main.css';
import Promo from "../Promo/Promo";
import NavTab from "../NavTab/NavTab";
import AboutProject from "../AboutProject/AboutProject";
import Techs from "../Techs/Techs";
import AboutMe from "../AboutMe/AboutMe";
import Portfolio from "../Portfolio/Portfolio";
import Header from "../Header/Header";

function Main({loggedIn, isNavMenuOpen, onNavMenuOpen, onClose}) {

  return (
    <>
      <Header loggedIn={loggedIn} isNavMenuOpen={isNavMenuOpen} onNavMenuOpen={onNavMenuOpen} onClose={onClose}></Header>
      <p className="text">
        sdbsbdb;kldm;
        sdbvjlvjopkwv
        sdkljbvlkjbdvo
        dlojmswpdbv
        dpklsbep
      </p>
      <Promo></Promo>
      <NavTab></NavTab>
      <AboutProject></AboutProject>
      <Techs></Techs>
      <AboutMe></AboutMe>
      <Portfolio></Portfolio>
    </>
  );
}

export default Main;
