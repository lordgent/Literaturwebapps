import React, { useState, useContext } from "react";
import stylemod from "./modal.module.css";
import { API } from "../../config/api";
import { UserContext } from "../../context/ContextApp";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

function LoginModal(props) {
  let Navigate = useNavigate();
  const [state, dispatch] = useContext(UserContext);
  const [form, setform] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setform({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const body = JSON.stringify(form);
      const response = await API.post("/login", body, config);
      const datas = response?.data?.user;
      if (datas?.data.role === "admin") {
        Navigate("/dashboard");
      } else if (datas.data.role === "user") {
        Navigate("/");
      }
      if (response.status === 200) {
        swal("Login Success");
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: {
            id: datas?.data?.id,
            fullname: datas?.data?.fullname,
            imgprofile: datas?.data?.imgprofile,
            email: datas?.data?.email,
            role: datas?.data?.role,
            gender: datas?.data?.gender,
            nophone: datas?.data?.phone,
            token: datas?.token,
          },
        });
      }
    } catch (error) {
      if (error.response.data.message === "username/password incorrect") {
        swal(error.response.data.message);
      }
    }
  };
  const handleClose = () => props.handleHide(false);
  return (
    props.handleShow && (
      <>
        <div className={stylemod.modal}>
          <form className={stylemod.containerform} onSubmit={handleSubmit}>
            <p className={stylemod.close} onClick={handleClose}>
              x
            </p>
            <h2 className="text-white mb-4 text-3xl font-bold	">Sign In</h2>
            <div className={stylemod.forminput}>
              <input
                type="email"
                name="email"
                placeholder="Email"
                className={stylemod.input}
                onChange={handleChange}
              />
            </div>
            <div className={stylemod.forminput}>
              <input
                type="password"
                name="password"
                placeholder="password"
                onChange={handleChange}
                className={stylemod.input}
              />
            </div>
            <button className={stylemod.btn}>Sign In</button>
          </form>
        </div>
      </>
    )
  );
}

export default LoginModal;
