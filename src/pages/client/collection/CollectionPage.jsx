import React, { useState, useEffect } from "react";
import { API } from "../../../config/api";
import { PDFReader } from "react-read-pdf";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import collections from "../../../assets/images/collection.png";
function CollectionPage() {
  const Navigate = useNavigate();
  const [Collection, setCollection] = useState([]);

  const getCollection = async () => {
    try {
      const response = await API.get("/usercollections");
      setCollection(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCollection();
  }, []);

  const onDelete = async (param) => {
    try {
      const response = await API.delete(`/usercollectiondel/${param}`);
      if (response.status === 200) {
        getCollection();
        if (Collection?.length === 1) {
          window.location.reload();
        }
        swal("delete success");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mt-5">
      <h2 className="text-3xl ml-20">My Collection</h2>
      <div className="flex w-full">
        {!Collection?.length ? (
          <div className="m-auto">
            <img src={collections} alt="logocollection" width="350" />
            <h1 className="text-center -mt-20 text-2xl">
              Oops.. you dont have Collection
            </h1>
          </div>
        ) : (
          Collection?.map((item, idx) => (
            <div key={idx} className="box-border grid-cols-4 ml-20 mt-10">
              <div style={{ width: "180px" }}>
                <PDFReader
                  url={`http://localhost:4005/uploads/filepdf/${item?.literaturs?.filebook}`}
                  width="180"
                />
                <p
                  className="text-sm"
                  style={{
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                  }}
                >
                  {item?.literaturs?.title}
                </p>

                <div className="flex w-full grid-cols-2 beetwen justify-between	">
                  <p className="text-xs text-gray-300">
                    {item?.literaturs?.author}
                  </p>
                  <p className="text-xs text-gray-300">
                    {item?.literaturs?.publicationdate}
                  </p>
                </div>
                <button
                  onClick={() => onDelete(item?.idliteratur)}
                  className="bg-red-600 mt-2 w-full px-10"
                >
                  delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default CollectionPage;
