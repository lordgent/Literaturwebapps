import React, { useContext, useState } from "react";
import logo from "../../assets/icons/logo.png";
import { UserContext } from "../../context/ContextApp";
import { Link, useNavigate } from "react-router-dom";
import Avatar from "react-avatar";
import DropDown from "../modal/dropdown/DropDown";

function NavbarComp() {
  let Navigate = useNavigate();
  const [state, dispatch] = useContext(UserContext);
  const [drop, setdrop] = useState(false);

  const handleLogout = () => {
    dispatch({
      type: "LOGOUT",
    });
    Navigate("/");
  };
  const handleShow = () => setdrop(true);

  return state.stsLogin ? (
    state?.user?.role !== "user" ? (
      <div className="bg-black w-full	flex p-2 font-serif">
        <div className="w-1/2 ml-30 p-3 ">
          <Link to="/dashboard">
            <img src={logo} className="w-36  ml-8" alt="logoimage" />
          </Link>
        </div>
        <div className="bg-black right-36 absolute  w-20 p-3">
          <Avatar
            name="Literaur Admin"
            onClick={handleShow}
            size={40}
            round={true}
          />
        </div>
        <DropDown ShowDrop={drop} Close={() => setdrop(false)} />
      </div>
    ) : (
      <div className="bg-black w-full	flex p-2">
        <div className="ml-28 flex p-3 w-full">
          <Link to="/user/profile" className="text-white ">
            Profile
          </Link>
          <Link to="/user/collections" className="text-white ml-8 ">
            MyCollection
          </Link>

          <Link to="/user/collection" className="text-white ml-8">
            Add Literatur
          </Link>

          <span
            onClick={handleLogout}
            className="text-white cursor-pointer ml-8"
          >
            Logout
          </span>
        </div>

        <div className="ml-60 w-1/2 flex">
          <Link to="/" className="w-full">
            <img src={logo} className="w-36 right-auto ml-8" alt="logoimage" />
          </Link>
        </div>
      </div>
    )
  ) : (
    <div className="bg-black w-auto h-16">
      <img src={logo} className="w-36 ml-32" alt="logoimage" />
    </div>
  );
}

export default NavbarComp;
