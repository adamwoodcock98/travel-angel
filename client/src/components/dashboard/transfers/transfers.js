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

  const handlePickupChange = (e) => {
    const value = e.target.value;
    setTransfer((prevState) => ({
      ...prevState,
      pickupAddress: {
        ...prevState.pickupAddress,
        [e.target.name]: value,
      },
    }));
  };

  const handleDropoffChange = (e) => {
    const value = e.target.value;
    setTransfer((prevState) => ({
      ...prevState,
      dropoffAddress: {
        ...prevState.dropoffAddress,
        [e.target.name]: value,
      },
    }));
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setTransfer({
      ...transfer,
      [e.target.name]: value,
    });
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const {
      pickupTime,
      dropoffTime,
      pickupAddress,
      dropoffAddress,
      isOutbound,
      company,
      contactNumber,
      bookingReference,
      user,
      trip,
    } = transfer;

    const newTransfer = {
      pickupTime,
      dropoffTime,
      pickupAddress,
      dropoffAddress,
      isOutbound,
      company,
      contactNumber,
      bookingReference,
      user,
      trip,
    };

    axios
      .post("http://localhost:8000/dashboard/transfers/", newTransfer)
      .then(() => {
        setTransfer({
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
        handleClose();
      });
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
            <OutboundTransferCard outboundTransfer={outboundTransfer} />
          </div>
          <div className="transfers-content-inbound">
            <h1 className="transfers-content-subheading">Inbound</h1>
            <InboundTransferCard inboundTransfer={inboundTransfer} />
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
            handleChange={handleChange}
            transfer={transfer}
            handleSubmit={handleSubmit}
            handlePickupChange={handlePickupChange}
            handleDropoffChange={handleDropoffChange}
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
          handleChange={handleChange}
          transfer={transfer}
          handleSubmit={handleSubmit}
          handlePickupChange={handlePickupChange}
          handleDropoffChange={handleDropoffChange}
        />
      </div>
    );
  }
};

export default Transfers;
