import React, { useEffect, useState } from "react";
import axios from "axios";

function Upload({ cardId, url, handleUpload }) {
  const [selectedFile, setSelectedFile] = useState();

  console.log("2nd", handleUpload);

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmission = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("uploaded_file", selectedFile);
    if (selectedFile) {
      await axios
        .post(`http://localhost:8000/${url}/upload/${cardId}`, formData)
        .then((result) => {
          console.log("Success:", result);
          handleUpload();
          setSelectedFile(null);
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
