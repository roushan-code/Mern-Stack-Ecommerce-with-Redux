import React from 'react';
import playStore from "../../../images/GooglePlay.webp";
import appStore from "../../../images/AppleStore.webp";
import "./Footer.css"

const Footer = () => {
  return (
    <footer id="footer">
        <div className="leftFooter">
          <h4>DOWNLOAD OUT AP4</h4>
          <p>Download App for Android and IOS mobile Phone</p>
          <img src={playStore} alt="playstore" />
          <img src={appStore} alt="appstore" />
        </div>

        <div className="midFooter">
          <h1>Ecommers</h1>
          <p>High Quality is our first priority</p>

          <p>Copyrights 2021 &copy; Roushan Singh</p>
        </div>

        <div className="rightFooter">
          <h4>Follow Us</h4>
          <a href="https://www.instagram.com/roushansingh3698/">Instagram</a>
          <a href="https://www.youtube.com/channel/UCvEI5ZzcQUubigBvBgvotSg">Youtube</a>
          <a href="https://www.facebook.com/profile.php?id=100032073308149">Facebook</a>
        </div>
    </footer>
  );
};

export default Footer