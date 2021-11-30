import React, { useState, useContext } from "react";
import imagelogo from "../assets/icons/iconliteratur.png";
import LoginModal from "../components/modal/LoginModal";
import RegisterModel from "../components/modal/RegisterModel";
import { UserContext } from "../context/ContextApp";
import SearchPage from "./client/search/SearchPage";

function LandingPage() {
  const [state, dispatch] = useContext(UserContext);
  const [RegModal, setRegModal] = useState(false);
  const [LogModal, setLogModal] = useState(false);
  const handleModalReg = () => setRegModal(true);
  const handleModalLogin = () => setLogModal(true);
  return state.stsLogin ? (
    <SearchPage />
  ) : (
    <div className="w-full p-10">
      <div class="flex grid-cols-2 ">
        <div className="w-full text-6xl p-20 ml-50 ">
          <h1 className="text-white mb-2">Source of intelligence</h1>
          <p className="text-white text-lg">
            Sign-up and receive unlimited access to all of your literatur -
            Share your literatures
          </p>
          <button
            onClick={handleModalLogin}
            className="bg-red-700 rounded-1xl	 h-12 px-20 rounded text-lg text-white"
          >
            Sign In
          </button>
          <button
            onClick={handleModalReg}
            className="bg-white h-12 rounded-1xl  px-20 ml-10 rounded text-lg text-red-800"
          >
            Sign Up
          </button>
        </div>

        <div className="w-full">
          <img
            className="mr-60 h-90 w-3/4	"
            src={imagelogo}
            alt="logoliteratur"
          />
        </div>
      </div>
      <RegisterModel
        handleShow={RegModal}
        setmodal={() => setRegModal(false)}
      />
      <LoginModal handleShow={LogModal} handleHide={() => setLogModal(false)} />
    </div>
  );
}

export default LandingPage;
