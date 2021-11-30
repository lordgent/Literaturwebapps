import React from "react";
import imgnotfound from "../../assets/images/notfound.png";
function PageNotFound() {
  return (
    <div className="w-full px-40 ">
      <div className="mt-10 m-auto px-24 h-96 w-full	">
        <img src={imgnotfound} className="w-72 m-auto" alt="logonotfound" />
        <h1 className="text-white text-3xl text-center">
          Oops.. Page Not Found
        </h1>
      </div>
    </div>
  );
}

export default PageNotFound;
