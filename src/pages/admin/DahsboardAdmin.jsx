import React, { useState, useEffect } from "react";
import "./admin.css";
import { API } from "../../config/api";
import succs from "../../assets/icons/success.png";
import cncl from "../../assets/icons/cancel.png";
import swal from "sweetalert";

function DahsboardAdmin() {
  const [Literaturs, setLiteraturs] = useState([]);

  const [isLoading, setisLoading] = useState(false);

  const getLiteraturs = async () => {
    try {
      const response = await API.get("/literaturadmin");
      setLiteraturs(response?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setisLoading(true);
    setTimeout(() => {
      getLiteraturs();
      setisLoading(false);
    }, 1000);
  }, []);

  const handleApproveCancel = async (param, value) => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const body = {
        status: value,
      };
      console.log(param);
      const response = await API.put(`/literatur/${param}`, body, config);
      if (response.status === 200) {
        getLiteraturs();
        if (body.status === "approved") {
          swal("Approve");
        } else {
          swal("cancel");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return isLoading ? (
    <p>loading...</p>
  ) : (
    <div className="container-admin">
      <h2 className="text-gray-800 mb-2 text-3xl">Book Verification</h2>
      <table className="tableadmin ">
        <tr className="h-10 bg-gray-50 p-5 text-sm">
          <th>No</th>
          <th>Author or User</th>
          <th>ISBN</th>
          <th>Literatur</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
        {Literaturs?.map((item, idx) => (
          <tr
            className={idx % 2 === 1 ? "bg-gray-50" : "bg-gray-100"}
            key={idx}
          >
            <td className="w-16">{idx + 1}</td>
            <td>{item?.user?.fullname}</td>
            <td>{item?.isbn}</td>
            <td className="filebook p-5">
              <a
                href={`http://localhost:4005/uploads/filepdf/${item?.filebook}`}
                className="text-red-600"
              >
                preview
              </a>
            </td>
            <td
              className={
                item.status === "approved"
                  ? "text-green-500 p-5"
                  : item.status === "cancel"
                  ? "text-red-500"
                  : item.status === "waiting verifed"
                  ? "text-yellow-500"
                  : ""
              }
            >
              {item.status}
            </td>
            <td className="m-auto">
              {item.status !== "waiting verifed" ? (
                item.status !== "approved" ? (
                  <img src={cncl} alt="logoapproved" className="imgapp" />
                ) : (
                  <img src={succs} alt="logoapproved" className="imgapp" />
                )
              ) : (
                <>
                  <button
                    className="btnapprove"
                    onClick={() => handleApproveCancel(item?.id, "approved")}
                  >
                    Approve
                  </button>
                  <button
                    className="btncancel ml-2"
                    onClick={() => handleApproveCancel(item?.id, "cancel")}
                  >
                    Cancel
                  </button>
                </>
              )}
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
}

export default DahsboardAdmin;
