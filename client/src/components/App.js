import { useState } from "react";
import SignUp from "./signUp/signUp";
import axios from "axios";
import LogIn from "./logIn/logIn";
import Button from "@mui/material/Button";

const App = () => {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [openLogIn, setOpenLogIn] = useState(false);
  const [userLogIn, setUserLogIn] = useState({
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { firstName, lastName, email, password } = user;
    const newUser = { firstName, lastName, email, password };

    await axios.post("http://localhost:5000/user", newUser).then(() => {
      handleClose();
      window.location = "/";
    });
  };

  const handleChangeLogIn = (e) => {
    const value = e.target.value;
    setUserLogIn({
      ...userLogIn,
      [e.target.name]: value,
    });
  };

  const handleOpenLogIn = () => {
    setOpenLogIn(true);
  };

  const handleCloseLogIn = () => {
    setOpenLogIn(false);
  };

  const onSubmitLogIn = async (e) => {
    e.preventDefault();

    const { firstName, lastName, email, password } = user;
    const newUser = { firstName, lastName, email, password };

    await axios.post("http://localhost:5000/user/log-in", newUser).then(() => {
      // handleClose();
      // window.location = "/";
    });
  };

  const onSubmitLogOut = async (e) => {
    e.preventDefault();

    const { firstName, lastName, email, password } = user;
    const newUser = { firstName, lastName, email, password };

    await axios.post("http://localhost:5000/user/log-out", newUser).then(() => {
      // handleClose();
      // window.location = "/";
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
        handleSubmit={handleSubmit}
      />
      <LogIn
        open={openLogIn}
        handleOpen={handleOpenLogIn}
        handleClose={handleCloseLogIn}
        handleChange={handleChangeLogIn}
        user={userLogIn}
        onSubmit={onSubmitLogIn}
      />
      <Button variant="outlined" onClick={onSubmitLogOut}>
        Log Out
      </Button>
    </div>
  );
};

export default App;
