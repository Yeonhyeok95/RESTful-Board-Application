import React, {
  ChangeEvent,
  useRef,
  useState,
  KeyboardEvent,
  useEffect,
} from "react";
import "./style.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  AUTH_PATH,
  BOARD_PATH,
  BOARD_DETAIL_PATH,
  BOARD_UPDATE_PATH,
  BOARD_WRITE_PATH,
  MAIN_PATH,
  SEARCH_PATH,
  USER_PATH,
} from "constant";
import { useCookies } from "react-cookie";
import { useBoardStore, useLoginUserStore } from "stores";

//          component: Header Layout          //
export default function Header() {
  //          state: login user          //
  const { loginUser, setLoginUser, resetLoginUser } = useLoginUserStore();
  //          state: path          //
  const { pathname } = useLocation();
  //          state: cookie          //
  const [cookies, setCookie] = useCookies();
  //          state: login state          //
  const [isLogin, setLogin] = useState<boolean>(false);

  const isAuthPage = pathname.startsWith(AUTH_PATH());
  const isMainPage = pathname === MAIN_PATH();
  const isSearchPage = pathname.startsWith(SEARCH_PATH(""));
  const isBoardDetailPage = pathname.startsWith(
    BOARD_PATH() + "/" + BOARD_DETAIL_PATH("")
  );
  const isBoardWritePage = pathname.startsWith(
    BOARD_PATH() + "/" + BOARD_WRITE_PATH()
  );
  const isBoardUpdatePage = pathname.startsWith(
    BOARD_PATH() + "/" + BOARD_UPDATE_PATH("")
  );
  const isUserPage = pathname.startsWith(USER_PATH(""));

  //          function: navigate          //
  const navigate = useNavigate();

  //          event handler: logo click          //
  const onLogoClickHandler = () => {
    navigate(MAIN_PATH());
  };

  //          component: Search button          //
  const SearchButton = () => {
    //          state: Search input element ref          //
    const searchButtonRef = useRef<HTMLDivElement | null>(null);
    //          state: Search button          //
    const [searchButtonStatus, setSearchButtonStatus] =
      useState<boolean>(false);
    //          state: Search word          //
    const [word, setWord] = useState<string>("");
    //          state: Search word path variable          //
    const { searchWord } = useParams();

    //          event handler: search word change           //
    const onSearchWordChangeHandler = (
      event: ChangeEvent<HTMLInputElement>
    ) => {
      const value = event.target.value;
      setWord(value);
    };
    //          event handler: search word key           //
    const onSearchWordKeyDownHandler = (
      event: KeyboardEvent<HTMLInputElement>
    ) => {
      if (event.key !== "Enter") return;
      if (!searchButtonRef.current) return;
      searchButtonRef.current?.click();
    };
    //          event handler: search icon click          //
    const onSearchButtonClickHandler = () => {
      if (!searchButtonStatus) {
        setSearchButtonStatus(!searchButtonStatus);
        return;
      }
      navigate(SEARCH_PATH(word));
    };

    //          effect: search word path variable          //
    useEffect(() => {
      if (searchWord) {
        setWord(searchWord);
        setSearchButtonStatus(true);
      }
    }, [searchWord]);

    if (!searchButtonStatus)
      //          render: Search button (click false status)          //
      return (
        <div className="icon-button" onClick={onSearchButtonClickHandler}>
          <div className="icon search-light-icon"></div>
        </div>
      );
    //          render: Search button (click true status)          //
    return (
      <div className="header-search-input-box">
        <input
          className="header-search-input"
          type="text"
          placeholder="Search word."
          value={word}
          onChange={onSearchWordChangeHandler}
          onKeyDown={onSearchWordKeyDownHandler}
        />
        <div
          ref={searchButtonRef}
          className="icon-button"
          onClick={onSearchButtonClickHandler}
        >
          <div className="icon search-light-icon"></div>
        </div>
      </div>
    );
  };
  //          component: MyPage Button          //
  const MyPageButton = () => {
    //          state: userEmail path variable state          //
    const { useEmail } = useParams();

    //          event handler: MyPage Button click          //
    const onMyPageButtonClickHandler = () => {
      if (!loginUser) return;
      const { email } = loginUser;
      navigate(USER_PATH(email));
    };
    //          event handler: MyPage Button click          //
    const onSignOutButtonClickHandler = () => {
      resetLoginUser();
      navigate(MAIN_PATH());
    };
    //          event handler: Login Button click          //
    const onLoginButtonClickHandler = () => {
      navigate(AUTH_PATH());
    };

    //          render: Logout Button          //
    if (isLogin && useEmail === loginUser?.email)
      return (
        <div className="white-button" onClick={onSignOutButtonClickHandler}>
          {"Logout"}
        </div>
      );

    //          render: MyPage Button          //
    if (isLogin)
      return (
        <div className="white-button" onClick={onMyPageButtonClickHandler}>
          {"MyPage"}
        </div>
      );
    //          render: Login Button          //
    return (
      <div className="black-button" onClick={onLoginButtonClickHandler}>
        {"Login"}
      </div>
    );
  };

  //          component: Upload Button          //
  const UploadButton = () => {
    //          state: board state          //
    const { title, content, boardImageFileList, resetBoard } = useBoardStore();

    //          event handler: Upload Button Click          //
    const onUploadButtonClickHandler = () => {};

    if (title && content)
      //          render: Upload Button          //
      return (
        <div className="black-button" onClick={onUploadButtonClickHandler}>
          {"Upload"}
        </div>
      );
    //          render: Upload disabled Button          //
    return <div className="disable-button">{"Upload"}</div>;
  };

  //          render: Header Layout          //
  return (
    <div id="header">
      <div className="header-container">
        <div className="header-left-box" onClick={onLogoClickHandler}>
          <div className="icon-box">
            <div className="icon logo-dark-icon"></div>
          </div>
          <div className="header-logo">{"Goldoogi's Board"}</div>
        </div>
        <div className="header-right-box">
          {(isAuthPage || isMainPage || isSearchPage || isBoardDetailPage) && (
            <SearchButton />
          )}
          {(isMainPage || isSearchPage || isBoardDetailPage || isUserPage) && (
            <MyPageButton />
          )}
          {(isBoardWritePage || isBoardUpdatePage) && <UploadButton />}
        </div>
      </div>
    </div>
  );
}
