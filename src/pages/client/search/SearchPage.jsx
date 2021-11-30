import React, { useState, useEffect } from "react";
import logos from "../../../assets/icons/logos.png";
import srch from "../../../assets/icons/serch.png";
import { Link, Navigate } from "react-router-dom";
function SearchPage() {
  const [title, settitle] = useState("");

  const handleChange = (e) => {
    settitle("/literatur?title=" + e.target.value);
  };

  return (
    <div className="bg-black w-full mt-10">
      <div className="m-auto p-20">
        <img src={logos} alt="logoweb" className="m-auto w-72 mb-10" />
        <div className="w-6/12 m-auto flex">
          <input
            className="m-auto w-full bg-gray-700 rounded text-gray-200 h-11 p-1 border-gray-300 border-2"
            type="text"
            onChange={handleChange}
            name="title"
            placeholder="Search Literaturs.."
          />
          <Link to={title} className="ml-1 rounded h-11 bg-red-700">
            <img src={srch} alt="icon-search" className="p-3" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SearchPage;
