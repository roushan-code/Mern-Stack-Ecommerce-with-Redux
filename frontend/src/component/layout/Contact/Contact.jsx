import React from "react";
import "./Contact.css";

const Contact = () => {
  return (
    <div className="contactContainer">
      <a className="mailBtn" href="mailto:roushansingh3698@gmail.com" >
        <button className="MuiButtonBase-root MuiButton-root MuiButton-text">
        <span class="MuiButton-label">Contact: roushansingh3698@gmail.com</span>
              <span class="MuiTouchRipple-root"></span>
          </button>
      </a>
    </div>
  );
};

export default Contact;
