import React, { useState, useEffect } from "react";
import { API } from "../../../config/api";
import addfile from "../../../assets/icons/attach.png";
import swal from "sweetalert";
import styleadd from "./add.module.css";
function AddCollectionPages() {
  const [form, setform] = useState({
    title: "",
    author: "",
    pages: "",
    isbn: "",
    publicationdate: "",
    bookFile: "",
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
      formData.set("title", form.title);
      formData.set("author", form.author);
      formData.set("pages", form.pages);
      formData.set("isbn", form.isbn);
      formData.set("publicationdate", form.publicationdate);
      formData.set("bookFile", form.bookFile[0], form.bookFile[0].name);
      console.log(form);
      const response = await API.post("/literaturadd", formData, config);

      if (response.status === 200) {
        swal("Literatur Created");
      }
    } catch (error) {}
  };

  return (
    <div className={styleadd.containeradd}>
      <form onSubmit={handleSubmit} className={styleadd.form}>
        <h1 className="text-2xl mb-2">Add Literatur</h1>
        <div className={styleadd.formcontent}>
          <input
            type="text"
            name="title"
            placeholder="title"
            onChange={handleChange}
            className={styleadd.inputform}
          />
        </div>

        <div className={styleadd.formcontent}>
          <input
            type="text"
            name="publicationdate"
            placeholder="Publication Date"
            onChange={handleChange}
            className={styleadd.inputform}
          />
        </div>

        <div className={styleadd.formcontent}>
          <input
            type="text"
            name="author"
            placeholder="Author"
            onChange={handleChange}
            className={styleadd.inputform}
          />
        </div>

        <div className={styleadd.formcontent}>
          <input
            type="text"
            name="isbn"
            placeholder="No ISBN"
            onChange={handleChange}
            className={styleadd.inputform}
          />
        </div>

        <div className={styleadd.formcontent}>
          <input
            type="text"
            name="pages"
            placeholder="Pages"
            onChange={handleChange}
            className={styleadd.inputform}
          />
        </div>
        <div className={styleadd.formcontent}>
          <label htmlFor="addfile" className={styleadd.bookfile}>
            Attache Book File
            <img src={addfile} className="ml-4" width="15" alt="logoaddfile" />
          </label>
          <input
            type="file"
            name="bookFile"
            hidden
            id="addfile"
            onChange={handleChange}
            className={styleadd.inputform}
          />
        </div>
        <button className={styleadd.btncreated}>Create</button>
      </form>
    </div>
  );
}

export default AddCollectionPages;
