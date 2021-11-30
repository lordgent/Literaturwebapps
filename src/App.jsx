import React, { useContext, useEffect } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import NavbarComp from "./components/navbar/NavbarComp";
import { AuthToken, API } from "./config/api";
import { UserContext } from "./context/ContextApp";
import ProfilePage from "./pages/client/profile/ProfilePage";
import PageNotFound from "./pages/404/PageNotFound";
import DetailLiteratur from "./pages/client/detail./DetailLiteratur";
import ResultPage from "./pages/client/search/ResultPage";
import CollectionPage from "./pages/client/collection/CollectionPage";
import DahsboardAdmin from "./pages/admin/DahsboardAdmin";
import AddCollectionPages from "./pages/client/collection/AddCollectionPages";
if (localStorage.tokenkey) {
  AuthToken(localStorage.tokenkey);
}
function App() {
  const [state, dispatch] = useContext(UserContext);

  const cekAuth = async () => {
    try {
      const response = await API.get("/user");
      const user = response?.data?.data;
      dispatch({
        type: "AUTH",
        payload: user,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    cekAuth();
  }, []);

  useEffect(() => {
    if (localStorage.tokenkey) {
      AuthToken(localStorage.tokenkey);
    }
  }, [state]);

  return (
    <>
      <NavbarComp />
      <Routes>
        {state.stsLogin ? (
          state.user.role !== "admin" ? (
            <>
              <Route path="/" exact element={<LandingPage />} />
              <Route path="/user/profile" exact element={<ProfilePage />} />
              <Route
                path="/user/literatur/:id"
                exact
                element={<DetailLiteratur />}
              />
              <Route path="/literatur" exact element={<ResultPage />} />
              <Route
                path="/user/collections"
                exact
                element={<CollectionPage />}
              />
              <Route
                path="/user/collection"
                exact
                element={<AddCollectionPages />}
              />
            </>
          ) : (
            <>
              <Route path="/dashboard" exact element={<DahsboardAdmin />} />
            </>
          )
        ) : (
          <>
            <Route path="/" exact element={<LandingPage />} />
          </>
        )}
        <Route path="*" exact element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
