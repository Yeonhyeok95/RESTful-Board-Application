import React, { useState, KeyboardEvent, useRef, ChangeEvent } from "react";
import "./style.css";
import InputBox from "components/InputBox";
import { SignInRequestDto } from "apis/request/auth";
import { signInRequestDto } from "apis";
import { SignInResponseDto } from "apis/response/auth";
import { ResponseDto } from "apis/response";
import { useCookies } from "react-cookie";
import { MAIN_PATH } from "constant";
import { useNavigate } from "react-router-dom";
import AddressInputBox from "components/AddressInputBox";

// test
//          component: Authentication          //
export default function Authentication() {
  //           state: screen state          //
  const [view, setView] = useState<"sign-in" | "sign-up">("sign-in");
  //           state: cookie state          //
  const [cookies, setCookie] = useCookies();
  //           function: navigator          //
  const navigator = useNavigate();

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
    const [passwordType, setPasswordType] = useState<"text" | "password">("password");
    //          state: Password Button Icon          //
    const [passwordButtonIcon, setPasswordButtonIcon] = useState<
      "eye-light-off-icon" | "eye-light-on-icon" | "expand-right-light-icon"
    >("eye-light-off-icon");
    //          state: Error          //
    const [error, setError] = useState<boolean>(false);

    //          function: sign in response          //
    const signInResponse = (responseBody: SignInResponseDto | ResponseDto | null) => {
      if (!responseBody) {
        alert("Network Error has occured");
        return;
      }
      const { code } = responseBody;
      if (code === "DBE") alert("Database Error has occured.");
      if (code === "SF" || code === "VF") setError(true);
      if (code !== "SU") return;

      const { token, expirationTime } = responseBody as SignInResponseDto;
      const now = new Date().getTime();
      const expires = new Date(now + expirationTime * 1000);

      setCookie("accessToken", token, {
        expires,
        path: MAIN_PATH(),
      });
      navigator(MAIN_PATH());
    };
    //          event handler: Email change event          //
    const onEmailChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
      setError(false);
      const { value } = event.target;
      setEmail(value);
    };
    //          event handler: Password change event          //
    const onPasswordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
      setError(false);
      const { value } = event.target;
      setPassword(value);
    };
    //          event handler: Login Button Click          //
    const onSignInButtonClickHandler = () => {
      const requestBody: SignInRequestDto = { email, password };
      signInRequestDto(requestBody).then(signInResponse);
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
    const onPasswordKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
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
              onChange={onEmailChangeHandler}
              onKeyDown={onEmailKeyDownHandler}
            />
            <InputBox
              ref={passwordRef}
              label="Password"
              type={passwordType}
              placeholder="password"
              error={error}
              value={password}
              onChange={onPasswordChangeHandler}
              onKeyDown={onPasswordKeyDownHandler}
              icon={passwordButtonIcon}
              onButtonClick={onPasswordButtonClickHandler}
            />
          </div>
          <div className="auth-card-bottom">
            {error && (
              <div className="auth-sign-in-error-box">
                <div className="auth-sign-in-error-msg">
                  {"Email or Password is incorrect.\nCheck your Email or Password."}
                </div>
              </div>
            )}
            <div className="black-large-full-button" onClick={onSignInButtonClickHandler}>
              {"Login"}
            </div>
            <div className="auth-description-box">
              <div className="auth-description">
                {"New here?"}
                <span className="auth-description-link" onClick={onSignUpLinkClickHandler}>
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
    //          state: Email element reference          //
    const emailRef = useRef<HTMLInputElement | null>(null);
    //          state: Password element reference          //
    const passwordRef = useRef<HTMLInputElement | null>(null);
    //          state: Password Check element reference          //
    const passwordCheckRef = useRef<HTMLInputElement | null>(null);
    //          state: Nickname element reference          //
    const nicknameRef = useRef<HTMLInputElement | null>(null);
    //          state: Tel Number element reference          //
    const telNumberRef = useRef<HTMLInputElement | null>(null);
    //          state: Address element reference          //
    const addressRef = useRef<HTMLInputElement | null>(null);
    //          state: Address Detail element reference          //
    const addressDetailRef = useRef<HTMLInputElement | null>(null);

    //          state: page number          //
    const [page, setPage] = useState<1 | 2>(2);
    //          state: Email          //
    const [email, setEmail] = useState<string>("");
    //          state: Password          //
    const [password, setPassword] = useState<string>("");
    //          state: Password Check          //
    const [passwordCheck, setPasswordCheck] = useState<string>("");
    //          state: Nickname          //
    const [nickname, setNickname] = useState<string>("");
    //          state: telnumber          //
    const [telNumber, setTelNumber] = useState<string>("");
    //          state: Address          //
    const [address, setAddress] = useState<string>("");
    //          state: Address Detail          //
    const [addressDetail, setAddressDetail] = useState<string>("");
    //          state: Agreed Personal Detail          //
    const [agreedPersonal, setAgreedPersonal] = useState<boolean>(false);

    //          state: Password Type          //
    const [passwordType, setPasswordType] = useState<"text" | "password">("password");
    //          state: Password Check Type          //
    const [passwordCheckType, setPasswordCheckType] = useState<"text" | "password">("password");

    //          state: Email Error          //
    const [isEmailError, setEmailError] = useState<boolean>(false);
    //          state: Password Error          //
    const [isPasswordError, setPasswordError] = useState<boolean>(false);
    //          state: Password Check Error          //
    const [isPasswordCheckError, setPasswordCheckError] = useState<boolean>(false);

    //          state: Nickname Error          //
    const [isNicknameError, setNicknameError] = useState<boolean>(false);
    //          state: TelNumber Error          //
    const [isTelNumberError, setTelNumberError] = useState<boolean>(false);
    //          state: Address Error          //
    const [isAddressError, setAddressError] = useState<boolean>(false);
    //          state: Agreed Personal Consent Error          //
    const [isAgreedPersonalError, setAgreedPersonalError] = useState<boolean>(false);

    //          state: Email Error Msg          //
    const [emailErrorMsg, setEmailErrorMsg] = useState<string>("");
    //          state: Password Error Msg          //
    const [passwordErrorMsg, setPasswordErrorMsg] = useState<string>("");
    //          state: Password Check Error Msg          //
    const [passwordCheckErrorMsg, setPasswordCheckErrorMsg] = useState<string>("");

    //          state: Nickname Error Msg          //
    const [nicknameErrorMsg, setNicknameErrorMsg] = useState<string>("");
    //          state: TelNumber Error Msg          //
    const [telNumberErrorMsg, setTelNumberErrorMsg] = useState<string>("");
    //          state: Address Error Msg          //
    const [addressErrorMsg, setAddressErrorMsg] = useState<string>("");

    //          state: Password Button Icon          //
    const [passwordButtonIcon, setPasswordButtonIcon] = useState<
      "eye-light-off-icon" | "eye-light-on-icon" | "expand-right-light-icon"
    >("eye-light-off-icon");
    //          state: Password Check Button Icon          //
    const [passwordCheckButtonIcon, setPasswordCheckButtonIcon] = useState<
      "eye-light-off-icon" | "eye-light-on-icon" | "expand-right-light-icon"
    >("eye-light-off-icon");

    //          function: Google Address Search Popup Open          //

    //          event handler: Email Change event          //
    const onEmailChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      setEmail(value);
      setEmailError(false);
      setEmailErrorMsg("");
    };
    //          event handler: Password Change event          //
    const onPasswordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      setPassword(value);
      setPasswordError(false);
      setPasswordErrorMsg("");
    };
    //          event handler: Password Check Change event          //
    const onPasswordCheckChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      setPasswordCheck(value);
      setPasswordCheckError(false);
      setPasswordCheckErrorMsg("");
    };
    //          event handler: Nickname Change Event          //
    const onNicknameChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      setNickname(value);
      setNicknameError(false);
      setNicknameErrorMsg("");
    };
    //          event handler: TelNumber Change Event          //
    const onTelNumberChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      setTelNumber(value);
      setTelNumberError(false);
      setTelNumberErrorMsg("");
    };
    //          event handler: Address Change Event          //
    const onAddressChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      setAddress(value);
      setAddressError(false);
      setAddressErrorMsg("");
    };
    //          event handler: Address Detail Change Event          //
    const onAddressDetailChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      setAddressDetail(value);
    };
    //          event handler: Agreed Personal Button Click event          //
    const onAgreedPersonalClickHandler = () => {
      setAgreedPersonal(!agreedPersonal);
      setAgreedPersonalError(false);
    };
    //          event handler: Password Button Click event          //
    const onPasswordButtonClickHandler = () => {
      if (passwordButtonIcon === "eye-light-off-icon") {
        setPasswordButtonIcon("eye-light-on-icon");
        setPasswordType("text");
      } else {
        setPasswordButtonIcon("eye-light-off-icon");
        setPasswordType("password");
      }
    };
    //          event handler: Password Check Button Click event          //
    const onPasswordCheckButtonClickHandler = () => {
      if (passwordButtonIcon === "eye-light-off-icon") {
        setPasswordCheckButtonIcon("eye-light-on-icon");
        setPasswordCheckType("text");
      } else {
        setPasswordCheckButtonIcon("eye-light-off-icon");
        setPasswordCheckType("password");
      }
    };
    //          event handler: Address Button Click event          //
    const onAddressButtonClickHandler = () => {
      if (!addressRef.current) return;
      addressRef.current.focus();
    };
    //          event handler: Next Step Button Click event          //
    const onNextButtonClickHandler = () => {
      const emailPattern = /^[a-zA-Z0-9]*@([-.]?[a-zA-Z0-9])*\.[a-zA-Z]{2,4}$/;
      const isEmailPattern = emailPattern.test(email);
      if (!isEmailPattern) {
        setEmailError(true);
        setEmailErrorMsg("Email format is mismatch");
      }
      const isCheckedPassword = password.trim().length >= 8;
      if (!isCheckedPassword) {
        setPasswordError(true);
        setPasswordErrorMsg("Password length should be more 8");
      }
      const isEqualPassword = password === passwordCheck;
      if (!isEqualPassword) {
        setPasswordCheckError(true);
        setPasswordCheckErrorMsg("Password is not same");
      }
      if (!isEmailPattern || !isCheckedPassword || !isEqualPassword) return;

      setPage(2);
    };
    //          event handler: Sign Up Button Click event          //
    const onSignUpButtonClickHandler = () => {
      alert("Sign Up Button!");
    };
    //          event handler: Login Link Click event          //
    const onSignInLinkClickHandler = () => {
      setView("sign-in");
    };
    //          event handler: Email Key Down event          //
    const onEmailKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key !== "Enter") return;
      if (!passwordRef.current) return;
      passwordRef.current.focus();
    };
    //          event handler: Password Key Down event          //
    const onPasswordKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key !== "Enter") return;
      if (!passwordCheckRef.current) return;
      passwordCheckRef.current.focus();
    };
    //          event handler: Password Check Key Down event          //
    const onPasswordCheckKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key !== "Enter") return;
      if (!nicknameRef.current) return;
      onNextButtonClickHandler();
      nicknameRef.current.focus();
    };
    //          event handler: Nickname Key Down event          //
    const onNicknameKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key !== "Enter") return;
      if (!telNumberRef.current) return;
      telNumberRef.current.focus();
    };
    //          event handler: TelNumber Key Down event          //
    const onTelNumberKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key !== "Enter") return;
      if (!addressRef.current) return;
      addressRef.current.focus();
    };
    //          event handler: Address Key Down event          //
    const onAddressKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key !== "Enter") return;
      if (!addressDetailRef.current) return;
      addressDetailRef.current.focus();
    };
    //          event handler: Address Detail Key Down event          //
    const onAddressDetailKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key !== "Enter") return;
      onSignUpButtonClickHandler();
    };

    //          render: Sign Up Card          //
    return (
      <div className="auth-card">
        <div className="auth-card-box">
          <div className="auth-card-top">
            <div className="auth-card-title-box">
              <div className="auth-card-title">{"SignUp"}</div>
              <div className="auth-card-page">{`${page}/2`}</div>
            </div>
            {page === 1 && (
              <>
                <InputBox
                  ref={emailRef}
                  label="Email Address*"
                  type="text"
                  placeholder="email@email.com"
                  value={email}
                  onChange={onEmailChangeHandler}
                  error={isEmailError}
                  message={emailErrorMsg}
                  onKeyDown={onEmailKeyDownHandler}
                />
                <InputBox
                  ref={passwordRef}
                  label="Password*"
                  type={passwordType}
                  placeholder="password"
                  value={password}
                  onChange={onPasswordChangeHandler}
                  error={isPasswordError}
                  message={passwordErrorMsg}
                  icon={passwordButtonIcon}
                  onButtonClick={onPasswordButtonClickHandler}
                  onKeyDown={onPasswordKeyDownHandler}
                />
                <InputBox
                  ref={passwordCheckRef}
                  label="Password Check*"
                  type={passwordCheckType}
                  placeholder="password again"
                  value={passwordCheck}
                  onChange={onPasswordCheckChangeHandler}
                  error={isPasswordCheckError}
                  message={passwordCheckErrorMsg}
                  icon={passwordCheckButtonIcon}
                  onButtonClick={onPasswordCheckButtonClickHandler}
                  onKeyDown={onPasswordCheckKeyDownHandler}
                />
              </>
            )}
            {page === 2 && (
              <>
                <InputBox
                  ref={nicknameRef}
                  label="Nickname*"
                  type="text"
                  placeholder="Nickname"
                  value={nickname}
                  onChange={onNicknameChangeHandler}
                  error={isNicknameError}
                  message={nicknameErrorMsg}
                  onKeyDown={onNicknameKeyDownHandler}
                />
                <InputBox
                  ref={telNumberRef}
                  label="Phone number*"
                  type="text"
                  placeholder="0411111111"
                  value={telNumber}
                  onChange={onTelNumberChangeHandler}
                  error={isTelNumberError}
                  message={telNumberErrorMsg}
                  onKeyDown={onTelNumberKeyDownHandler}
                />
                <AddressInputBox
                  ref={addressRef}
                  label="Address*"
                  type="text"
                  address={address}
                  setAddress={setAddress}
                  onKeyDown={onAddressKeyDownHandler}
                  onChange={onAddressChangeHandler}
                  icon={"expand-right-light-icon"}
                  onButtonClick={onAddressButtonClickHandler}
                />
                {/* <InputBox
                  ref={addressRef}
                  label="Address*"
                  type="text"
                  placeholder="100 Cleveland St, Chippendale, NSW, 2008"
                  value={address}
                  onChange={onAddressChangeHandler}
                  error={isAddressError}
                  message={addressErrorMsg}
                  icon={"expand-right-light-icon"}
                  onButtonClick={onAddressButtonClickHandler}
                  onKeyDown={onAddressKeyDownHandler}
                /> */}
                <InputBox
                  ref={addressDetailRef}
                  label="Address Detail"
                  type="text"
                  placeholder="Unit 52"
                  value={addressDetail}
                  onChange={onAddressDetailChangeHandler}
                  error={false}
                  onKeyDown={onAddressDetailKeyDownHandler}
                />
              </>
            )}
          </div>
          <div className="auth-card-bottom">
            {page === 1 && (
              <div className="black-large-full-button" onClick={onNextButtonClickHandler}>
                {"Next"}
              </div>
            )}
            {page === 2 && (
              <>
                <div className="auth-consent-box">
                  <div className="auth-check-box" onClick={onAgreedPersonalClickHandler}>
                    <div className={`icon ${agreedPersonal ? "check-round-fill-icon" : "check-ring-light-icon"}`}></div>
                  </div>
                  <div className={isAgreedPersonalError ? "auth-consent-title-error" : "auth-consent-title"}>
                    {"Agree with Privacy and Policy"}
                  </div>
                  <div className="auth-consent-link">{"More Information >"}</div>
                </div>
                <div className="black-large-full-button" onClick={onSignUpButtonClickHandler}>
                  {"Sign Up"}
                </div>
              </>
            )}

            <div className="auth-description-box">
              <div className="auth-description">
                {"Already existing accounts?"}
                <span className="auth-description-link" onClick={onSignInLinkClickHandler}>
                  {" Login"}
                </span>
              </div>
            </div>
          </div>
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
              <div className="auth-jumbotron-text">{"Here is Goldoogi's Board"}</div>
            </div>
          </div>
        </div>
        {view === "sign-in" && <SignInCard />}
        {view === "sign-up" && <SignUpCard />}
      </div>
    </div>
  );
}
