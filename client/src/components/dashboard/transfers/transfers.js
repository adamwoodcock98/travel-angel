import { useState, useEffect } from "react";
import AddTransfer from "./addTransfer";
import axios from "axios";
import { OutboundTransferCard } from "./outboundTransferCard";
import { InboundTransferCard } from "./inboundTransferCard";
import { useParams } from "react-router-dom";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";

const Transfers = ({ session }) => {
  const { tripId } = useParams();

  const userId = session;

  const [open, setOpen] = useState(false);
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

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [outboundTransfer, setOutboundTransfer] = useState([]);
  const [inboundTransfer, setInboundTransfer] = useState([]);

  useEffect(() => {
    if (userId !== "null") {
      axios
        .get(`http://localhost:8000/dashboard/transfers/${userId}/${tripId}`)
        .then((res) => {
          const outbound = res.data.outbound;
          const inbound = res.data.inbound;
          setOutboundTransfer(outbound);
          setInboundTransfer(inbound);
        });
    }
  }, []);

  if (outboundTransfer.length || inboundTransfer.length) {
    return (
      <div className="transfers">
        <div className="transfer-header">
          <h1>Your transfers</h1>
        </div>
        <div className="transfers-content">
          <div className="transfers-content-outbound">
            <h1 className="transfer-content-subheading">Outbound</h1>
            <OutboundTransferCard outboundTransfer={outboundTransfer} userId={userId} />
          </div>
          <div className="transfers-content-inbound">
            <h1 className="transfers-content-subheading">Inbound</h1>
            <InboundTransferCard inboundTransfer={inboundTransfer} userId={userId} />
          </div>
        </div>
        <div>
          <Fab size="large" color="secondary" aria-label="add" onClick={handleOpen}>
            <AddIcon />
          </Fab>
          <AddTransfer
            open={open}
            handleOpen={handleOpen}
            handleClose={handleClose}
            transferData={transfer}
            userId={userId}
            tripId={tripId}
            transferId={null}
          />
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <Fab size="large" color="secondary" aria-label="add" onClick={handleOpen}>
            <AddIcon />
        </Fab>
        <AddTransfer
          open={open}
          handleOpen={handleOpen}
          handleClose={handleClose}
          transferData={transfer}
          userId={userId}
          tripId={tripId}
          transferId={null}
        />
      </div>
    );
  }
};

export default Transfers;
