import { useState, useEffect } from "react";
import AddVisa from "./addVisa";
import VisaCard from "./viewVisa";
import axios from "axios";
import { useParams } from "react-router-dom";

const Visas = ({ session }) => {
  const { tripId } = useParams();
  const [state, setState] = useState(0);

  const handleUpload = async () => {
    setState((prev) => prev + 1);
  };

  const userId = session;

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

  useEffect(() => {
    axios
      .get(`http://localhost:8000/dashboard/visas/${userId}/${tripId}`)
      .then((res) => {
        setVisa(res.data);
      });
  }, [visaArray, state]);

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
            <VisaCard visa={visa} handleUpload={handleUpload} />
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
          />
        </div>
      </div>
    );
  }
};

export default Visas;
