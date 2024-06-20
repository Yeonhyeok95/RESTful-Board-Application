import { Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "layouts/Footer";
import Authentication from "views/Authentication";
import Main from "views/Main";
import Search from "views/Search";
import User from "views/User";
import BoardDetail from "views/Board/Detail";
import BoardWrite from "views/Board/Write";
import BoardUpdate from "views/Board/Update";
import Container from "layouts/Container";
import { MAIN_PATH } from "constant";
import { AUTH_PATH } from "constant";
import { SEARCH_PATH } from "constant";
import { USER_PATH } from "constant";
import { BOARD_PATH } from "constant";
import { BOARD_WRITE_PATH } from "constant";
import { BOARD_DETAIL_PATH } from "constant";
import { BOARD_UPDATE_PATH } from "constant";

//          component: Application          //
function App() {
  //          render: Application          //
  // description: '/' - Main
  // description: '/auth' - Authentication
  // description: '/search/:word' - Search
  // description: '/user/userEmail' - User
  // description: '/board/detail/:boardNumber' - BoardDetail
  // description: '/board/write' - BoardWrite
  // description: '/board/update/:boardNumber' - BoardUpdate

  return (
    <Routes>
      <Route element={<Container />}>
        <Route path={MAIN_PATH()} element={<Main />} />
        <Route path={AUTH_PATH()} element={<Authentication />} />
        <Route path={SEARCH_PATH(":searchWord")} element={<Search />} />
        <Route path={USER_PATH(":userEmail")} element={<User />} />
        <Route path={BOARD_PATH()}>
          <Route path={BOARD_WRITE_PATH()} element={<BoardWrite />} />
          <Route
            path={BOARD_DETAIL_PATH(":boardNumber")}
            element={<BoardDetail />}
          />
          <Route
            path={BOARD_UPDATE_PATH(":boardNumber")}
            element={<BoardUpdate />}
          />
        </Route>
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Route>
    </Routes>
  );
}

export default App;
