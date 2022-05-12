import { useState, useEffect } from "react";
import AddTransfer from "./addTransfer";
import axios from "axios";
import { OutboundTransferCard } from "./outboundTransferCard";
import { InboundTransferCard } from "./inboundTransferCard";
import { useParams } from "react-router-dom";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import CircularProgress from "@mui/material/CircularProgress";
import { Alerts } from "../../assets/snackbar";
import Button from "@mui/material/Button";

const Transfers = ({ session }) => {
  const { tripId } = useParams();
  const [loading, setLoading] = useState(true);
  const [loadingFailed, setLoadingFailed] = useState(false);
  const [state, setState] = useState(0);

  const handleUpload = async () => {
    setState((prev) => prev + 1);
  };

  const userId = session;

  const [open, setOpen] = useState(false);
  const [emptyFields, setEmptyFields] = useState([]);
  const [didUpdate, setDidUpdate] = useState(false);
  const [transfer, setTransfer] = useState({
    pickupTime: "",
    dropoffTime: "",
    pickupAddress: {
      buildingNumber: "",
      buildingName: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      postalCode: "",
      stateCounty: "",
      countryCode: "",
    },
    dropoffAddress: {
      buildingNumber: "",
      buildingName: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      postalCode: "",
      stateCounty: "",
      countryCode: "",
    },
    isOutbound: "",
    company: "",
    contactNumber: "",
    bookingReference: "",
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

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setDidUpdate(!didUpdate);
  };

  const [outboundTransfer, setOutboundTransfer] = useState([]);
  const [inboundTransfer, setInboundTransfer] = useState([]);

  useEffect(() => {
    setLoading(true);
    setLoadingFailed(false);
    if (userId !== "null") {
      axios
        .get(`http://localhost:8000/dashboard/transfers/${userId}/${tripId}`)
        .then((res) => {
          const outbound = res.data.outbound;
          const inbound = res.data.inbound;
          setOutboundTransfer(outbound);
          setInboundTransfer(inbound);
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
            setLoadingFailed(true);
          }
        })
        .finally(() => setLoading(false));
    }
  }, [didUpdate, state]);

  if (loadingFailed) {
    return(
      <div className="empty-window">
        <h1>Transfers</h1>
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
        <p color="secondary">loading...</p>
      </div>
    );
  } else if (outboundTransfer.length || inboundTransfer.length) {
    return (
      <>
        <div className="transfers">
          <div className="transfer-header very-big">
            <h1 className="very-big">Transfers</h1>
          </div>
          <div className="transfers-content">
            <div className="transfers-content-outbound">
              <h1 className="transfers-content-subheading">Outbound</h1>
              <OutboundTransferCard
                outboundTransfer={outboundTransfer}
                userId={userId}
                tripId={tripId}
                refresh={handleClose}
                handleUpload={handleUpload}
              />
            </div>
            <div className="transfers-content">
            <div className="transfers-content-inbound">
              <h1 className="transfers-content-subheading">Inbound</h1>
              <InboundTransferCard
                inboundTransfer={inboundTransfer}
                userId={userId}
                tripId={tripId}
                refresh={handleClose}
                handleUpload={handleUpload}
              />
              </div>
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
            <AddTransfer
              open={open}
              handleOpen={handleOpen}
              handleClose={handleClose}
              transferData={transfer}
              userId={userId}
              tripId={tripId}
              transferId={null}
              emptyFields={emptyFields}
              handleUpload={handleUpload}
            />
            <Alerts
              message={alertMessage}
              open={alertOpen}
              handleClose={handleAlertClose}
              alertPosition={alertPosition}
              alertType={alertType}
            />
          </div>
        </div>
      </>
    );
  } else {
    return (
      <div className="empty-window">
        <h1 className="very-big">Transfers</h1>
        <div className="empty-prompt">
          <h3>Looks like you don't have any saved transfers</h3>
          <h2>Press + to get started</h2>
        </div>
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
        <AddTransfer
          open={open}
          handleOpen={handleOpen}
          handleClose={handleClose}
          transferData={transfer}
          userId={userId}
          tripId={tripId}
          transferId={null}
          emptyFields={emptyFields}
          handleUpload={handleUpload}
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

export default Transfers;
