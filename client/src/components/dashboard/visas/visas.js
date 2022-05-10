import { useState, useEffect } from "react";
import AddVisa from "./addVisa";
import VisaCard from "./viewVisa";
import axios from "axios";
import { useParams } from "react-router-dom";

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

  const handleChange = (e) => {
    const value = e.target.value;
    setVisaArray({
      ...visaArray,
      [e.target.name]: value,
    });
  };

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
            <VisaCard visa={visa} />
          </div>
        </div>

        <div>
          <AddVisa
            open={open}
            handleOpen={handleOpen}
            handleClose={handleClose}
            handleChange={handleChange}
            visa={visa}
            handleSubmit={handleSubmit}
            emptyFields={emptyFields}
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
            handleChange={handleChange}
            visa={visa}
            handleSubmit={handleSubmit}
            emptyFields={emptyFields}
          />
        </div>
      </div>
    );
  }
};

export default Visas;
