import React, { useState, KeyboardEvent, useRef } from "react";
import "./style.css";
import InputBox from "components/InputBox";

//          component: Authentication          //
export default function Authentication() {
  //           state: screen state          //
  const [view, setView] = useState<"sign-in" | "sign-up">("sign-in");

  //          component: Sign In Card          //
  const SignInCard = () => {
    //          state: Email Element Ref          //
    const emailRef = useRef<HTMLInputElement | null>(null);
    //          state: Password Element Ref          //
    const passwordRef = useRef<HTMLInputElement | null>(null);

    //          state: Email          //
    const [email, setEmail] = useState("");
    //          state: Password          //
    const [password, setPassword] = useState("");
    //          state: Password input type          //
    const [passwordType, setPasswordType] = useState<"text" | "password">(
      "password"
    );
    //          state: Password Button Icon          //
    const [passwordButtonIcon, setPasswordButtonIcon] = useState<
      "eye-light-off-icon" | "eye-light-on-icon" | "expand-right-light-icon"
    >("eye-light-off-icon");
    //          state: Error          //
    const [error, setError] = useState<boolean>(false);

    //          event handler: Login Button Click          //
    const onSignInButtonClickHandler = () => {
      if (passwordType === "text") {
        setPasswordType("password");
        setPasswordButtonIcon("eye-light-off-icon");
      } else {
        setPasswordType("text");
        setPasswordButtonIcon("eye-light-on-icon");
      }
    };
    //          event handler: SignUp Link Button Click          //
    const onSignUpLinkClickHandler = () => {
      setView("sign-up");
    };
    //          event handler: Password Button Click          //
    const onPasswordButtonClickHandler = () => {
      if (passwordType === "text") {
        setPasswordType("password");
        setPasswordButtonIcon("eye-light-off-icon");
      } else {
        setPasswordType("text");
        setPasswordButtonIcon("eye-light-on-icon");
      }
    };
    //          event handler: Email Input Key Down          //
    const onEmailKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key !== "Enter") return;
      if (!passwordRef.current) return;
      passwordRef.current.focus();
    };
    //          event handler: Password Input Key Down          //
    const onPasswordKeyDownHandler = (
      event: KeyboardEvent<HTMLInputElement>
    ) => {
      if (event.key !== "Enter") return;
      onSignInButtonClickHandler();
    };

    //          render: Sign In Card          //
    return (
      <div className="auth-card">
        <div className="auth-card-box">
          <div className="auth-card-top">
            <div className="auth-card-title-box">
              <div className="auth-card-title">{"Login"}</div>
            </div>
            <InputBox
              ref={emailRef}
              label="Email"
              type="text"
              placeholder="email@email.com"
              error={error}
              value={email}
              setValue={setEmail}
              onKeyDown={onEmailKeyDownHandler}
            />
            <InputBox
              ref={passwordRef}
              label="Password"
              type={passwordType}
              placeholder="password"
              error={error}
              value={password}
              setValue={setPassword}
              onKeyDown={onPasswordKeyDownHandler}
              icon={passwordButtonIcon}
              onButtonClick={onPasswordButtonClickHandler}
            />
          </div>
          <div className="auth-card-bottom">
            {error && (
              <div className="auth-sign-in-error-box">
                <div className="auth-sign-in-error-msg">
                  {
                    "Email or Password is incorrect.\nCheck your Email or Password."
                  }
                </div>
              </div>
            )}
            <div
              className="black-large-full-button"
              onClick={onSignInButtonClickHandler}
            >
              {"Login"}
            </div>
            <div className="auth-description-box">
              <div className="auth-description">
                {"New here?"}
                <span
                  className="auth-description-link"
                  onClick={onSignUpLinkClickHandler}
                >
                  {" Sign Up"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  //          component: Sign Up Card          //
  const SignUpCard = () => {
    //          render: Sign Up Card          //
    return (
      <div className="auth-card">
        <div className="auth-card-box">
          <div className="auth-card-top"></div>
          <div className="auth-card-bottom"></div>
        </div>
      </div>
    );
  };

  //          render: Authentication          //
  return (
    <div id="auth-wrapper">
      <div className="auth-container">
        <div className="auth-jumbotron-box">
          <div className="auth-jumbotron-contents">
            <div className="icon auth-logo-icon"></div>
            <div className="auth-jumbotron-text-box">
              <div className="auth-jumbotron-text">{"Welcome!"}</div>
              <div className="auth-jumbotron-text">
                {"Here is Goldoogi's Board"}
              </div>
            </div>
          </div>
        </div>
        {view === "sign-in" && <SignInCard />}
        {view === "sign-up" && <SignUpCard />}
      </div>
    </div>
  );
}
