import React from "react";
import "./style.css";

//          component: Footer Layout          //
export default function Footer() {
  //          event handler: insta icon button click          //
  const onInstaIconButtonClickHandler = () => {
    window.open("http://www.instagram.com");
  };

  //          event handler: github icon button click          //
  const onGithubIconButtonClickHandler = () => {
    window.open("https://github.com/Yeonhyeok95");
  };

  //          render: Footer Layout          //
  return (
    <div id="footer">
      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-logo-box">
            <div className="icon-box">
              <div className="icon logo-dolphin-icon"></div>
            </div>
            <div className="footer-logo-text">{"Goldoogi's board"}</div>
          </div>
          <div className="footer-link-box">
            <div className="footer-email-link">{"connorkim996@gmail.com"}</div>
            <div className="icon-button">
              <div
                className="icon insta-icon"
                onClick={onInstaIconButtonClickHandler}
              ></div>
            </div>
            <div className="icon-button">
              <div
                className="icon github-icon"
                onClick={onGithubIconButtonClickHandler}
              ></div>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="footer-copyright">
            {"Copyright © 2024 Goldoogi. All Rights Reserved."}
          </div>
        </div>
      </div>
    </div>
  );
}
