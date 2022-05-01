import { useState } from "react";
import SignUp from "./signUp/signUp";
import axios from "axios";

const App = () => {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const value = e.target.value;
    setUser({
      ...user,
      [e.target.name]: value,
    });
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const { firstName, lastName, email, password } = user;
    const newUser = { firstName, lastName, email, password };

    await axios.post("http://localhost:5000/user", newUser).then(() => {
      handleClose();
      window.location = "/";
    });
  };

  return (
    <div className="App">
      <SignUp
        open={open}
        handleOpen={handleOpen}
        handleClose={handleClose}
        handleChange={handleChange}
        user={user}
        onSubmit={onSubmit}
      />
    </div>
  );
};

export default App;
