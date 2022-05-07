import { useState, useEffect } from 'react';
import AddTransfer from './addTransfer'
import axios from 'axios'
import { OutboundTransferCard } from "./outboundTransferCard";
import { InboundTransferCard } from "./inboundTransferCard";

const Transfers = () => {
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
  });

  const handlePickupChange = (e) => {
    const value = e.target.value;
    setTransfer((prevState) => ({
      ...prevState,
      pickupAddress: {
        ...prevState.pickupAddress,
        [e.target.name]: value
      },
    }));
  }

  const handleDropoffChange = (e) => {
    const value = e.target.value;
    setTransfer((prevState) => ({
      ...prevState,
      dropoffAddress: {
        ...prevState.dropoffAddress,
        [e.target.name]: value
      },
    }));
  }

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
      bookingReference} = transfer;

    const newTransfer = { 
      pickupTime,
      dropoffTime,
      pickupAddress,
      dropoffAddress,
      isOutbound,
      company,
      contactNumber,
      bookingReference };

    axios.post("http://localhost:8000/dashboard/transfers/", newTransfer).then(() => {
      handleClose();
    });
  };

  const [outboundTransfer, setOutboundTransfer] = useState([]);
  const [inboundTransfer, setInboundTransfer] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/dashboard/transfers/").then(res => {
      const outbound = res.data.outbound
      const inbound = res.data.inbound
      setOutboundTransfer(outbound);
      setInboundTransfer(inbound);
    });
  }, [])

  if (outboundTransfer.length || inboundTransfer.length) {
    return(
      <div className="transfers">
          <div className="transfer-header">
            <h1>Your transfers</h1>
          </div>
          <div className="transfers-content">
            <div className="transfers-content-outbound">
              <h1 className="transfer-content-subheading">Outbound</h1>
              <OutboundTransferCard outboundTransfer={outboundTransfer}/>
            </div>
            <div className="transfers-content-inbound">
              <h1 className="transfers-content-subheading">Inbound</h1>
              <InboundTransferCard inboundTransfer={inboundTransfer}/>
            </div>
          </div>
      <div>
      
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
    )
    } else {
      return(
        <div>
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
      )
    }
};

export default Transfers;