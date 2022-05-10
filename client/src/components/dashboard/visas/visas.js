import { useState, useEffect } from "react";
import AddVisa from "./addVisa";
import VisaCard from "./viewVisa";
import axios from "axios";
import { useParams } from "react-router-dom";
import Fab from "@mui/material/Fab";
import AddIcon from '@mui/icons-material/Add';
import { Alerts } from "../../assets/snackbar";
import CircularProgress from '@mui/material/CircularProgress';

const Visas = ({ session }) => {
  const { tripId } = useParams();

  const userId = session;

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [visa, setVisa] = useState([]);
  const [visaArray, setVisaArray] = useState({
    visaNumber: "",
    startDate: "",
    endDate: "",
    issuingCountry: "",
    user: userId,
    trip: tripId,
  });

  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("success");
  const alertPosition = {
    vertical: "top",
    horizontal: "center",
  };

  const handleAlert = (message, type) => {
    setAlertOpen(true);
    setAlertMessage(message);
    setAlertType(type);
  };

  const handleAlertClose = () => {
    setAlertOpen(false);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8000/dashboard/visas/${userId}/${tripId}`)
      .then((res) => {
        setVisa(res.data);
      })
      .catch((error) => {
        if (error.response.status) {
          handleAlert(
            error.response.status + " - " + error.response.statusText,
            "error"
          );
        } else {
          handleAlert(
            "There was a problem connecting to the server.",
            "error"
          );
        }
      })
      .finally(() => setLoading(false));
  }, [visa]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (visa.length) {
    return (
      <>
        <div className="loading" style={{ display: loading ? "" : "none"}} >
          <CircularProgress color="secondary" />
        </div>
        <div className="visas">
          <div className="visa-header">
            <h1>Your visas</h1>
          </div>
          <div className="visas-content">
            <div className="visas-content-outbound">
              <h1 className="visa-content-subheading"> BLOOPS </h1>
              <VisaCard visa={visa} userId={userId} tripId={tripId} />
            </div>
          </div>

          <div>
          <Fab size="large" color="secondary" aria-label="add" onClick={handleOpen}>
            <AddIcon />
          </Fab>
            <AddVisa 
              open={open}
              handleOpen={handleOpen}
              handleClose={handleClose}
              visaData={visaArray}
              userId={userId}
              tripId={tripId}
              visaId={null}
            />
          </div>
        </div>
      </>
    )
  } else {
    return (
      <div className="visas">
        <div className="visa-header">
          <h1>Your visas</h1>
        </div>
        <div>
         <Fab size="large" color="secondary" aria-label="add" onClick={handleOpen}>
            <AddIcon />
          </Fab>
          <AddVisa
            open={open}
            handleOpen={handleOpen}
            handleClose={handleClose}
            visaData={visaArray}
            userId={userId}
            tripId={tripId}
            visaId={null} 
          />
        </div>
        <Alerts
          message={alertMessage}
          open={alertOpen}
          handleClose={handleAlertClose}
          alertPosition={alertPosition}
          alertType={alertType}
        />
      </div>
    )
  }
};

export default Visas;
