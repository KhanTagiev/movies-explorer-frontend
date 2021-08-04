import React from "react";

import "./Profile.css";
import Header from "../Header/Header";

function Profile({ loggedIn, isNavMenuOpen, onNavMenuOpen, onClose }) {
  return (
    <>
      <Header
        loggedIn={loggedIn}
        isNavMenuOpen={isNavMenuOpen}
        onNavMenuOpen={onNavMenuOpen}
        onClose={onClose}
      ></Header>
    </>
  );
}

export default Profile;
