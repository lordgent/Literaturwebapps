import React, { useState, useEffect } from "react";
import { API } from "../../../config/api";
import { useParams } from "react-router-dom";
import { PDFReader } from "react-read-pdf";
import downloads from "../../../assets/icons/downlaods.png";
import add from "../../../assets/icons/bookmark.png";
import swal from "sweetalert";

function DetailLiteratur() {
  const params = useParams();
  const [result, setresult] = useState({});
  const [isLoading, setisLoading] = useState(false);
  const [status, setstaus] = useState("");
  const getDetail = async () => {
    try {
      const response = await API.get(`/literaturr/${params.id}`);

      setresult(response?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const cekCollection = async () => {
    try {
      const response = await API.get(`/user/collection/${params.id}`);
      setstaus(response.data.message);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    cekCollection();
  }, []);
  useEffect(() => {
    setisLoading(true);
    setTimeout(() => {
      getDetail();

      setisLoading(false);
    }, 1000);
  }, []);

  const handleAdd = async () => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const body = {
        idliteratur: params.id,
      };
      const response = await API.post("/collection", body, config);
      if (response.status === 200) {
        swal("Success");
        cekCollection();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onDelete = async () => {
    try {
      const response = await API.delete(`/usercollectiondel/${params.id}`);
      if (response.status === 200) {
        swal("delete success");
        cekCollection();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return isLoading ? (
    <p className="text-white">loading...</p>
  ) : (
    <div className="w-full mt-10">
      <div className="flex w-full justify-center m-auto">
        <div className=" w-1/2 ml-20">
          <iframe
            width="400"
            height="480"
            frameBorder="0"
            src={`http://localhost:4005/uploads/filepdf/${result.filebook}`}
            title="W3Schools Free Online Web Tutorials"
          ></iframe>
        </div>

        <div className="w-full ">
          <div className="flex grid-cols-2  p-30">
            <div className=" w-9/12 ml-30">
              <div className="mb-10 w-full">
                <p className="text-white text-3xl w-full ">{result?.title}</p>
                <p className="text-white text-gray-500">{result?.author}</p>
              </div>
              <div className="mb-10">
                <p className="text-white">Publication Date</p>
                <p className="text-white  text-gray-500">
                  {result?.publicationdate}
                </p>
              </div>
              <div className="mb-10">
                <p className="text-white">Pages</p>
                <p className="text-white  text-gray-500">{result?.pages}</p>
              </div>
              <div>
                <p className="text-white text-red-500">ISBN</p>
                <p className="text-white  text-gray-500">{result?.isbn}</p>
              </div>

              <button className="mt-6 p-2 flex bg-red-600 ">
                Downloads
                <img src={downloads} className="ml-2 p-1" alt="downloadicon" />
              </button>
            </div>

            <div className="w-3/4">
              {status !== "add bookmark" ? (
                <button
                  onClick={onDelete}
                  className="text-white  mr-20 flex rounded-lg p-2 bg-red-500"
                >
                  Remove Collection
                  <img src={add} className="ml-2 p-1" alt="downloadicon" />
                </button>
              ) : (
                <button
                  onClick={handleAdd}
                  className="text-white  mr-20 flex rounded-lg p-2 bg-red-500"
                >
                  Add Bookmark
                  <img src={add} className="ml-2 p-1" alt="downloadicon" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailLiteratur;
