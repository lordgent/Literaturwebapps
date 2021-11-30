import React, { useState } from "react";
import stylemod from "./modal.module.css";
import { API } from "../../config/api";
import swal from "sweetalert";

function RegisterModel(props) {
  const [form, setform] = useState({
    fullname: "",
    phone: "",
    address: "",
    gender: "",
    email: "",
    password: "",
  });

  const handleClose = () => props.setmodal(false);

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
      const response = await API.post("/register", body, config);
      console.log(response);
      if (response.status === 200) {
        swal("Register Success");
        console.log(response);
      }
    } catch (error) {
      console.log(error.response);
      console.log(error);
    }
  };

  return (
    props.handleShow && (
      <>
        <div className={stylemod.modal}>
          <form className={stylemod.containerform} onSubmit={handleSubmit}>
            <p className={stylemod.close} onClick={handleClose}>
              x
            </p>
            <h2 className="text-white mb-4 text-3xl font-bold	">Sign Up</h2>
            <div className={stylemod.forminput}>
              <input
                type="text"
                name="fullname"
                placeholder="Fullname"
                className={stylemod.input}
                onChange={handleChange}
              />
            </div>
            <div className={stylemod.forminput}>
              <input
                type="text"
                name="phone"
                placeholder="Phone"
                className={stylemod.input}
                onChange={handleChange}
              />
            </div>
            <div className={stylemod.forminput}>
              <select
                name="gender"
                className={stylemod.input}
                onChange={handleChange}
              >
                <option className={stylemod.gender}>gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <div className={stylemod.forminput}>
              <input
                type="text"
                name="address"
                placeholder="Address"
                className={stylemod.input}
                onChange={handleChange}
              />
            </div>
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
                className={stylemod.input}
                onChange={handleChange}
              />
            </div>
            <button className={stylemod.btn}>Sign Up</button>
          </form>
        </div>
      </>
    )
  );
}

export default RegisterModel;
