import React, { useEffect, useState } from "react";
import axios from "axios";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

function Upload({ cardId, url, handleUpload }) {
  const [selectedFile, setSelectedFile] = useState();

  const Input = styled("input")({
    display: "none",
  });

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
      <label htmlFor={cardId}>
        <div style={{ display: selectedFile ? "none" : "" }}>
          <Input
            accept="docs/*"
            id={cardId}
            // multiple
            type="file"
            name="uploaded_file"
            onChange={changeHandler}
          />
          <IconButton variant="outlined" color="primary" component="span">
            <AddOutlinedIcon color="primary" />
          </IconButton>
        </div>
        <div style={{ display: selectedFile ? "" : "none" }}>
          <IconButton
            variant="contained"
            color="primary"
            onClick={handleSubmission}
          >
            <SaveOutlinedIcon color="primary" />
          </IconButton>
        </div>
      </label>
    </form>
  );
}

export default Upload;
