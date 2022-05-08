import { useState, useEffect  } from 'react';
import AddVisa from './addVisa'
import VisaCard from './viewVisa'
import axios from 'axios'

const Visas = () => {
  const [open, setOpen] = useState(false);
  const [visa, setVisa] = useState([]);
  const [visaArray, setVisaArray] = useState({
    visaNumber: "",
    startDate: "",
    endDate: "",
    issuingCountry: "",
  });

  useEffect(() => {
    axios.get("http://localhost:8000/dashboard/visas/").then(res => {
      setVisa(res.data);
    });
  }, [visaArray])

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

    const { 
      visaNumber,
      startDate,
      endDate,
      issuingCountry} = visaArray;

    const newVisa = { 
      visaNumber,
      startDate,
      endDate,
      issuingCountry}
    
    await axios
      .post("http://localhost:8000/dashboard/visas/", newVisa)
      .catch((err) => console.log(err.message))
      .then(() => {
        setVisaArray({
          visaNumber: "",
          startDate: "",
          endDate: "",
          issuingCountry: "",
        });
      handleClose();
    });
  };

  if (visa.length) {
    return(
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
      />
      </div>

    </div>
    )
  } else {
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
  } 
}

export default Visas;