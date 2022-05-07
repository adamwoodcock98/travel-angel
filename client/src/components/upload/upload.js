import React, { useState } from "react";
import axios from "axios";

function Upload() {
  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsFilePicked(true);
    console.log(selectedFile);
  };

  const handleSubmission = async () => {
    const formData = new FormData();

    formData.append("File", selectedFile);

    console.log(formData);

    await axios
      .post("http://localhost:8000/upload", selectedFile)
      .then((result) => {
        console.log("Success:", result);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <form enctype="multipart/form-data">
      <input type="file" name="file" onChange={changeHandler} />
      <div>
        <button onClick={handleSubmission}>Submit</button>
      </div>
    </form>
  );
}

// import axios from "axios";
// import React, { useState } from "react";
// import { Alerts } from "../assets/snackbar";

// const Upload = () => {
//   const [file, setFile] = useState();

//   const [alertOpen, setAlertOpen] = useState(false);
//   const [alertMessage, setAlertMessage] = useState("");
//   const [alertType, setAlertType] = useState("success");
//   const alertPosition = {
//     vertical: "top",
//     horizontal: "center",
//   };

//   const handleAlertClose = () => {
//     setAlertOpen(false);
//   };

//   const handleChange = (e) => {
//     setFile(e.target.file);
//   };

//   const handleAlert = (message, type) => {
//     setAlertOpen(true);
//     setAlertMessage(message);
//     setAlertType(type);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     await axios.post("http://localhost:8000/upload", file).then((res) => {
//       handleAlert(res.data.msg, res.data.type);
//     });
//   };

//   return (
//     <div>
//       <form
//         action="/profile"
//         method="post"
//         enctype="multipart/form-data"
//         onSubmit={handleSubmit}
//       >
//         <input type="file" name="file" onChange={handleChange} />
//         <input type="submit" />
//       </form>
//       <Alerts
//         message={alertMessage}
//         open={alertOpen}
//         handleClose={handleAlertClose}
//         alertPosition={alertPosition}
//         alertType={alertType}
//       />
//     </div>
//   );
// };

export default Upload;
