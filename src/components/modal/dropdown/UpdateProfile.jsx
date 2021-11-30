import React, { useContext, useState } from "react";
import styleupd from "./update.module.css";
import { UserContext } from "../../../context/ContextApp";
import swal from "sweetalert";
import { API } from "../../../config/api";
function UpdateProfile(props) {
  const [state, dispatch] = useContext(UserContext);

  const [form, setform] = useState({
    fullname: state.user.fullname,
    email: state.user.email,
    phone: state.user.phone,
    address: state.user.address,
    imageFile: "",
  });

  const handleChange = (e) => {
    setform({
      ...form,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };
      const formData = new FormData();
      formData.set("fullname", form.fullname);
      formData.set("email", form.email);
      formData.set("phone", form.phone);
      formData.set("address", form.address);
      formData.set("imageFile", form.imageFile[0], form.imageFile[0].name);

      const response = await API.put("/userr", formData, config);
      console.log(form);
      console.log(response);
      if (response.status === 200) {
        swal("Update is Sucess");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleHide = () => props.Hide(false);
  return (
    props.Show && (
      <div className={styleupd.container}>
        <div className={styleupd.contentform}>
          <p className={styleupd.del} onClick={handleHide}>
            x
          </p>
          <p className="text-2xl mb-3 text-gray-600">Update Profile</p>
          <form onSubmit={handleSubmit}>
            <div className={styleupd.containerinput}>
              <input
                type="text"
                name="fullname"
                placeholder="fullname"
                onChange={handleChange}
                defaultValue={state.user.fullname}
                className={styleupd.input}
              />
            </div>
            <div className={styleupd.containerinput}>
              <input
                type="email"
                name="email"
                onChange={handleChange}
                placeholder="email"
                defaultValue={state.user.email}
                className={styleupd.input}
              />
            </div>

            <div className={styleupd.containerinput}>
              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                onChange={handleChange}
                defaultValue={state.user.phone}
                className={styleupd.input}
              />
            </div>
            <div className={styleupd.containerinput}>
              <input
                type="text"
                name="address"
                onChange={handleChange}
                placeholder="address"
                defaultValue={state.user.address}
                className={styleupd.input}
              />
            </div>
            <div>
              <label htmlFor="imageFile">
                <input
                  type="file"
                  id="imageFile"
                  name="imageFile"
                  onChange={handleChange}
                  className={styleupd.input}
                />
              </label>
            </div>
            <button className={styleupd.btnupdate}>Update</button>
          </form>
        </div>
      </div>
    )
  );
}

export default UpdateProfile;
