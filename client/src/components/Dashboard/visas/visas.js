import { useState, useEffect } from 'react';
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

  // LOADING SUBMIT BUTTON
  const [loading, setLoading] = useState(false);

  // const textInput = useRef(null);

  // const clearFields = (e) => {
  //   setVisaArray({
  //     ...visaArray,
  //     [e.target.name]: "",
  //   });
    
  // }

  useEffect(() => {
    if(loading) {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  }, [loading])

  const handleLoadingClick = async (e) => {
    e.preventDefault();
    setLoading(true);

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
        handleLoadingClick={handleLoadingClick}
        loading={loading}
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
      handleLoadingClick={handleLoadingClick}
      loading={loading}
    />
    </div>
  } 
}

export default Visas;