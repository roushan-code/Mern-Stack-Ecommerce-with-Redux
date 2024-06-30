import React from "react";
import "./aboutSection.css";
import Avatar from '@mui/material/Avatar';
import YouTubeIcon from "@mui/icons-material/YouTube";
import InstagramIcon from "@mui/icons-material/Instagram";
const About = () => {
  const visitInstagram = () => {
    window.location = "https://www.instagram.com/roushansingh3698/";
  };
  return (
    <div className="aboutSection">
      <div></div>
      <div className="aboutSectionGradient"></div>
      <div className="aboutSectionContainer">
        <h2 className="h22">About Us</h2>
        <div>
          <div>
            <Avatar
              style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
              src="https://res.cloudinary.com/ddxwcwxhl/image/upload/v1713557680/avatars/eb35tqtjyqim0jytffzy.jpg"
              alt="Founder"
            />
            <h2 className="h22">Roushan Singh</h2>
            <button className="MuiButtonBase-root MuiButton-root MuiButton-text" onClick={visitInstagram} color="primary">
            <span class="MuiButton-label">Visit Instagram</span>
              <span class="MuiTouchRipple-root"></span>
            </button>
            <span>
              This is a sample wesbite made by Roushan Singh. Only with the
              purpose to learn MERN Stack for Full Stack development.
            </span>
          </div>
          <div className="aboutSectionContainer2">
            <h2 component="h2">Our Brands</h2>
            <a
              href="https://www.youtube.com/channel/UCvEI5ZzcQUubigBvBgvotSg"
              target="blank"
            >
              <YouTubeIcon className="youtubeSvgIcon" />
            </a>
            <a href="https://www.instagram.com/roushansingh3698/" target="blank">
              <InstagramIcon className="instagramSvgIcon" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
