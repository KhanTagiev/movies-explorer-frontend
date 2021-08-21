import React from "react";

import "./Main.css";
import Promo from "../Promo/Promo";
import AboutProject from "../AboutProject/AboutProject";
import Techs from "../Techs/Techs";
import AboutMe from "../AboutMe/AboutMe";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

function Main({ loggedIn, isNavMenuOpen, onNavMenuOpen, onClose }) {
  return (
    <>
      <Header
        loggedIn={loggedIn}
        isNavMenuOpen={isNavMenuOpen}
        onNavMenuOpen={onNavMenuOpen}
        onClose={onClose}
        isMainPlace={true}
      ></Header>
      <main className="main">
        <Promo></Promo>
        <AboutProject></AboutProject>
        <Techs></Techs>
        <AboutMe></AboutMe>
      </main>
      <Footer></Footer>
    </>
  );
}

export default Main;
