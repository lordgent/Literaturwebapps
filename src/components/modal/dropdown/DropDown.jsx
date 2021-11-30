import React, { useContext } from "react";
import styledrop from "./dropdown.module.css";
import log from "../../../assets/icons/logout.png";
import { UserContext } from "../../../context/ContextApp";
import { useNavigate } from "react-router-dom";
function DropDown(props) {
  const Navigate = useNavigate();
  const [state, dispatch] = useContext(UserContext);
  const handleLogout = () => {
    dispatch({
      type: "LOGOUT",
    });
    Navigate("/");
  };
  const handleClose = () => props.Close(true);
  return (
    props.ShowDrop && (
      <div onClick={handleClose} className={styledrop.containerdrop}>
        <div className={styledrop.content}>
          <div className={styledrop.dropdown} onClick={handleLogout}>
            <img src={log} className="mr-2" alt="logoutoicon" />
            <p>Logout</p>
          </div>
        </div>
      </div>
    )
  );
}

export default DropDown;
