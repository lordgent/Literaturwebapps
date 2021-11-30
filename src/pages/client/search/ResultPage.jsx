import React, { useState, useEffect } from "react";
import { API } from "../../../config/api";
import { useParams, Link, useLocation, Navigate } from "react-router-dom";
import srch from "../../../assets/icons/serch.png";
import { PDFReader } from "react-read-pdf";
import DataNotFound from "../../../components/DataNotFound";

function ResultPage() {
  const [titles, settitles] = useState("");
  const { search } = useLocation();

  const param = new URLSearchParams(search);
  const title = param.get("title");
  const [cek, setcek] = useState(false);

  // const params = useParams();
  const [datas, setdatas] = useState([]);
  const [years, setyears] = useState([]);
  const [SelectYear, setSelectYear] = useState("");
  const getResult = async () => {
    try {
      const response = await API.get("/literaturs");
      const searchdata = response.data.data.filter((item) => {
        return (
          item?.title?.toLowerCase().includes(title) ||
          item?.title?.includes(title)
        );
      });

      setdatas(searchdata);
      const year = searchdata?.map((item) => {
        return item.publicationdate;
      });

      setyears(year);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getResult();
  }, []);

  const handleChange = (e) => {
    setSelectYear(e.target.value);
  };

  const handleSearch = (e) => {
    settitles("/literatur?title=" + e.target.value);
  };

  // const filteryear = Array.from(new Set(years));
  // if (filteryear) {
  //   console.log("ada");
  // } else {
  //   console.log("tidak ada");
  // }
  // console.log(filteryear);

  function checkDuplicate() {
    let result = false;
    // create a Set with array elements
    const s = new Set(years);
    // compare the size of array and Set
    if (years.length !== s.size) {
      result = true;
    }
    if (result) {
      console.log("Array contains duplicate elements");
    } else {
      console.log("Array does not contain duplicate elements");
    }
  }
  useEffect(() => {
    console.log(checkDuplicate());
  }, []);

  return (
    <div className="w-full px-24 mt-10">
      <div>
        <div className="w-3/5 flex">
          <input
            className="w-3/4 h-10 p-1 text-gray-600 border-black-800 border-2"
            type="text"
            name="title"
            onChange={handleSearch}
            placeholder="Search Literaturs.."
            defaultValue={title}
          />
          <Link to={titles} onClick={() => Navigate("/litaratur")}>
            <button className="ml-2 h-10 bg-red-600">
              <img src={srch} alt="icon-search" className="p-2" />
            </button>
          </Link>
        </div>
      </div>

      <div className="flex grid-cols-2 mt-5">
        <div className="w-1/4">
          <p className="text-white">Filter</p>
          <select onChange={handleChange} className="w-3/6 bg-gray-800">
            <option value="">-</option>
            {years
              ?.filter((item, idx) => item?.indexOf(item) !== idx || item)
              ?.map((itm) => (
                <option key={itm} className="text-gray-200" value={itm}>
                  {itm}
                </option>
              ))}
          </select>
        </div>
        <div className="w-full flex grid-cols-4 gap-6">
          {SelectYear === "" ? (
            !datas.length ? (
              <DataNotFound />
            ) : (
              datas?.map((item, idx) => (
                <div key={idx} className="box-border mb-5 grid-cols-4 mt-3">
                  <div style={{ width: "180px" }}>
                    <Link to={`/user/literatur/${item?.id}`}>
                      <PDFReader
                        url={`http://localhost:4005/uploads/filepdf/${item?.filebook}`}
                        width="180"
                      />
                    </Link>
                    <p
                      className="text-sm"
                      style={{
                        textOverflow: "ellipsis",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {item?.title}
                    </p>

                    <div className="flex w-full grid-cols-3 beetwen justify-between">
                      <p className="text-xs text-gray-500">{item?.author}</p>
                      <p className="text-xs text-gray-500">
                        {item?.publicationdate}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )
          ) : !datas.length ? (
            <DataNotFound />
          ) : (
            datas
              ?.filter((item) => item?.publicationdate === SelectYear)
              .map((items, idx) => (
                <div key={idx} className="ml-14">
                  <div style={{ width: "180px", height: "200px" }}>
                    <Link to={`/user/literatur/${items.id}`}>
                      <iframe
                        style={{ width: "180px", height: "200px" }}
                        title={items?.title}
                        src={`http://localhost:4005/uploads/filepdf/${items?.filebook}`}
                      ></iframe>
                    </Link>
                    <p
                      className="text-sm"
                      style={{
                        textOverflow: "ellipsis",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {items?.title}
                    </p>
                    <div>
                      <p className="text-sm">{items?.author}</p>
                      <p className="text-sm">{items?.publicationdate}</p>
                    </div>
                  </div>
                </div>
              ))
          )}
        </div>
      </div>
    </div>
  );
}

export default ResultPage;
