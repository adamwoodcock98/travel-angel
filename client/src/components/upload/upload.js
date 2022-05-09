import React, { useState } from "react";
import axios from "axios";

function Upload() {
  const [selectedFile, setSelectedFile] = useState();

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  console.log(selectedFile);

  const handleSubmission = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("uploaded_file", selectedFile);
    if (selectedFile) {
      await axios
        .post("http://localhost:8000/upload", formData)
        .then((result) => {
          console.log("Success:", result);
        })
        .catch((error) => {
          console.log("Error:", error.message);
        });
    }
  };

  return (
    <form enctype="multipart/form-data">
      <input type="file" name="uploaded_file" onChange={changeHandler} />
      <div>
        <button onClick={handleSubmission}>Submit</button>
      </div>
    </form>
  );
}

export default Upload;
