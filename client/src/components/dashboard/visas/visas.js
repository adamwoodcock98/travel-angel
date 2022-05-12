import { useState, useEffect } from "react";
import AddVisa from "./addVisa";
import VisaCard from "./viewVisa";
import axios from "axios";
import { useParams } from "react-router-dom";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { Alerts } from "../../assets/snackbar";
import CircularProgress from "@mui/material/CircularProgress";
import "../../assets/styling/cards.css";
import Button from "@mui/material/Button";

const Visas = ({ session }) => {
  const { tripId } = useParams();
  const [state, setState] = useState(0);

  const handleUpload = async () => {
    setState((prev) => prev + 1);
  };

  const userId = session;

  const [loading, setLoading] = useState(true);
  const [loadingFailed, setLoadingFailed] = useState(false);
  const [open, setOpen] = useState(false);
  const [visa, setVisa] = useState([]);
  const [emptyFields, setEmptyFields] = useState([]);
  const [didUpdate, setDidUpdate] = useState(false);
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
    setLoading(true);
    setLoadingFailed(false);
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
          handleAlert("There was a problem connecting to the server.", "error");
          setLoadingFailed(true);
        }
      })
      .finally(() => setLoading(false));
  }, [didUpdate, state]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setDidUpdate(!didUpdate);
  };

  if (loadingFailed) {
    return(
      <div className="empty-window">
        <h1>Visas</h1>
        <div className="empty-prompt">
          <h3>This connection doesn't seem quite right</h3>
          <h2>:(</h2>
          <br />
          <Button onClick={handleClose} variant="outlined" color="primary">try again</Button>
        </div>
      </div>
    )
  } else if (loading) {
    return (
      <div className="loading" style={{ display: loading ? "" : "none" }}>
        <CircularProgress color="secondary" />
      </div>
    );
  } else if (visa.length) {
    return (
      <>
        <div className="visas">
          <div className="visa-header">
            <h1 className="very-big">Visas</h1>
          </div>
          <div className="visas-content">
            <div className="visas-content">
              <VisaCard
                visa={visa}
                userId={userId}
                tripId={tripId}
                refresh={handleClose}
                handleUpload={handleUpload}
              />
            </div>
          </div>

          <div>
            <div id="fab-card-position">
            <Fab
              size="large"
              color="secondary"
              aria-label="add"
              onClick={handleOpen}
            >
              <AddIcon />
            </Fab>
            </div>
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
    );
  } else {
    return (
      <div className="empty-window">
          <h1 className="very-big">Visas</h1>
        <div className="empty-prompt">
          <h3>Looks like you don't have any saved parking</h3>
          <h2>Press + to get started</h2>
        </div>
        <div className="empty-button" id="fab-card-position">
          <Fab
            size="large"
            color="secondary"
            aria-label="add"
            onClick={handleOpen}
          >
            <AddIcon />
          </Fab>
        </div>
        <AddVisa
          open={open}
          handleOpen={handleOpen}
          handleClose={handleClose}
          visa={visa}
          visaData={visaArray}
          userId={userId}
          tripId={tripId}
          visaId={null}
        />
        <Alerts
          message={alertMessage}
          open={alertOpen}
          handleClose={handleAlertClose}
          alertPosition={alertPosition}
          alertType={alertType}
        />
      </div>
    );
  }
};

export default Visas;
