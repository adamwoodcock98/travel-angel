import { useState } from "react";
import axios from "axios";
import SignUp from "./SignUp/signUp";
import SignIn from "./SignIn/signIn";
import Button from "@mui/material/Button";

const Authentication = () => {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [openSignIn, setOpenSignIn] = useState(false);
  const [userSignIn, setUserSignIn] = useState({
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

    await axios.post("http://localhost:5000/user/sign-up", newUser).then(() => {
      handleClose();
      window.location = "/";
    });
  };

  const handleChangeSignIn = (e) => {
    const value = e.target.value;
    setUserSignIn({
      ...userSignIn,
      [e.target.name]: value,
    });
  };

  const handleOpenSignIn = () => {
    setOpenSignIn(true);
  };

  const handleCloseSignIn = () => {
    setOpenSignIn(false);
  };

  const handleSubmitSignIn = async (e) => {
    e.preventDefault();

    const { firstName, lastName, email, password } = user;
    const newUser = { firstName, lastName, email, password };

    await axios.post("http://localhost:5000/user/sign-in", newUser).then(() => {
      handleClose();
      window.location = "/";
    });
  };

  const handleSubmitSignOut = async (e) => {
    e.preventDefault();

    const { firstName, lastName, email, password } = user;
    const newUser = { firstName, lastName, email, password };

    await axios
      .post("http://localhost:5000/user/sign-out", newUser)
      .then(() => {
        handleClose();
        window.location = "/";
      });
  };

  return (
    <div className="Authentication">
      <SignUp
        open={open}
        handleOpen={handleOpen}
        handleClose={handleClose}
        handleChange={handleChange}
        user={user}
        handleSubmit={handleSubmit}
      />
      <SignIn
        open={openSignIn}
        handleOpen={handleOpenSignIn}
        handleClose={handleCloseSignIn}
        handleChange={handleChangeSignIn}
        user={userSignIn}
        handleSubmit={handleSubmitSignIn}
      />
      <Button variant="outlined" onClick={handleSubmitSignOut}>
        Sign Out
      </Button>
    </div>
  );
};

export default Authentication;
