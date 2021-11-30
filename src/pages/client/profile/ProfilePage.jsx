import React, { useState, useEffect } from "react";
import { API } from "../../../config/api";
import imgprofile from "../../../assets/images/man.png";
import mail from "../../../assets/icons/msg.png";
import styleprofil from "./profile.module.css";
import loc from "../../../assets/icons/loc.png";
import telp from "../../../assets/icons/telp.png";
import gender from "../../../assets/icons/gender.png";
import { PDFReader } from "react-read-pdf";
import { useNavigate, Link } from "react-router-dom";
import ReactPDF from "@react-pdf/renderer";

import UpdateProfile from "../../../components/modal/dropdown/UpdateProfile";

function ProfilePage() {
  const [profile, setprofile] = useState([]);
  const [literaturs, setliteraturs] = useState([]);
  const [modal, setmodal] = useState(false);
  const getProfile = async () => {
    try {
      const res = await API.get("/user");
      setprofile(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getLiteratur = async () => {
    try {
      const response = await API.get("/literaturuser");
      setliteraturs(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProfile();
    getLiteratur();
  }, []);

  const handleUpdate = () => setmodal(true);

  return (
    <div className="w-full">
      <div className={styleprofil.container}>
        <h2 className="text-white text-2xl ml-28 mb-2">Profile</h2>
        <div className={styleprofil.containerProfile}>
          <div className={styleprofil.contentprofile}>
            <div className={styleprofil.profiles}>
              <div>
                <img src={mail} alt="mailuser" />
              </div>
              <div>
                <p className="ml-4">{profile?.email}</p>
                <p className="ml-4 text-sm text-gray-400">email</p>
              </div>
            </div>
            <div className={styleprofil.profiles}>
              <div>
                <img src={gender} alt="mailuser" />
              </div>
              <div>
                <p className="ml-4">{profile?.gender}</p>
                <p className="ml-4 text-sm text-gray-400">gender</p>
              </div>
            </div>
            <div className={styleprofil.profiles}>
              <div>
                <img src={telp} alt="mailuser" />
              </div>
              <div>
                <p className="ml-4">{profile?.phone}</p>
                <p className="ml-4 text-sm text-gray-400"> Phone Number</p>
              </div>
            </div>
            <div className={styleprofil.profiles}>
              <div>
                <img src={loc} alt="mailuser" />
              </div>
              <div>
                <p className="ml-4">{profile?.address}</p>
                <p className="ml-4 text-sm text-gray-400">Address</p>
              </div>
            </div>
          </div>
          <div className={styleprofil.contentimage}>
            {!profile.imgprofile ? (
              <img
                src={imgprofile}
                className={styleprofil.image}
                alt="defaultImage"
              />
            ) : (
              <img
                src={
                  "http://localhost:4005/uploads/image/" + profile?.imgprofile
                }
                alt="imgaeprofileuser"
                className={styleprofil.image}
              />
            )}
            <div className={styleprofil.update} onClick={handleUpdate}>
              <p>Update Profile</p>
            </div>
          </div>
        </div>
        <UpdateProfile Show={modal} Hide={() => setmodal(false)} />

        <div className={styleprofil.literatur}>
          <h1 className="text-white mt-2 text-2xl ">My Literatur</h1>

          <div className="grid grid-cols-4 ">
            {literaturs?.map((item, idx) => (
              <div key={idx} className="box-border mb-5 grid-cols-4 mt-3">
                <div style={{ width: "180px" }}>
                  <Link to={`/user/literatur/${item?.id}`}>
                    <PDFReader
                      url={`http://localhost:4005/uploads/filepdf/${item?.filebook}`}
                      width="180"
                    />
                  </Link>
                  <p className={styleprofil.text}>{item?.title}</p>
                  <div className="flex w-full grid-cols-3 beetwen justify-between">
                    <p className="text-xs text-gray-500">{item?.author}</p>
                    <p className="text-xs text-gray-500">
                      {item?.publicationdate}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
