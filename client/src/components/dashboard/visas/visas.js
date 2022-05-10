import { useState, useEffect } from "react";
import AddVisa from "./addVisa";
import VisaCard from "./viewVisa";
import axios from "axios";
import { useParams } from "react-router-dom";
import Fab from "@mui/material/Fab";
import AddIcon from '@mui/icons-material/Add';

const Visas = ({ session }) => {
  const { tripId } = useParams();

  const userId = session;

  const [open, setOpen] = useState(false);
  const [visa, setVisa] = useState([]);
  const [emptyFields, setEmptyFields] = useState([]);
  const [visaArray, setVisaArray] = useState({
    visaNumber: "",
    startDate: "",
    endDate: "",
    issuingCountry: "",
    user: userId,
    trip: tripId,
  });

  useEffect(() => {
    axios
      .get(`http://localhost:8000/dashboard/visas/${userId}/${tripId}`)
      .then((res) => {
        setVisa(res.data);
      });
  }, [visaArray]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { visaNumber, startDate, endDate, issuingCountry, user, trip } =
      visaArray;

    const newVisa = {
      visaNumber,
      startDate,
      endDate,
      issuingCountry,
      user,
      trip,
    };

    if(visaNumber === "" || startDate === "" || endDate === "" || issuingCountry === ""){
      setEmptyFields(['visaNumber', 'startDate', 'endDate', 'issuingCountry'])
      return
    }

    await axios
      .post("http://localhost:8000/dashboard/visas/", newVisa)
      .catch((err) => console.log(err.message))
      .then(() => {
        setVisaArray({
          visaNumber: "",
          startDate: "",
          endDate: "",
          issuingCountry: "",
          user: userId,
          trip: tripId,
        });
        handleClose();
      });
  };

  if (visa.length) {
    return (
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
            visa={visa}
            handleSubmit={handleSubmit}
            emptyFields={emptyFields}
            visaData={visaArray}
            userId={userId}
            tripId={tripId}
            visaId={null}
          />
        </div>
      </div>
    );
  } else {
    return (
      <div className="visas">
        <div className="visa-header">
          <h1>Your visas</h1>
        </div>
        <div>
          <AddVisa
            open={open}
            handleOpen={handleOpen}
            handleClose={handleClose}
            visa={visa}
            handleSubmit={handleSubmit}
            emptyFields={emptyFields}
            visaData={visaArray}
            userId={userId}
            tripId={tripId}
            visaId={null} 
          />
        </div>
      </div>
    );
  }
};

export default Visas;
