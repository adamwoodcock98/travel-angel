import { useState } from "react";
import axios from "axios";
import SignUp from "./signUp/signUp";
import LogIn from "./logIn/logIn";
import Button from "@mui/material/Button";

export const Authentication = () => {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [openlogIn, setOpenlogIn] = useState(false);
  const [userlogIn, setUserlogIn] = useState({
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

  const handleChangelogIn = (e) => {
    const value = e.target.value;
    setUserlogIn({
      ...userlogIn,
      [e.target.name]: value,
    });
  };

  const handleOpenlogIn = () => {
    setOpenlogIn(true);
  };

  const handleCloselogIn = () => {
    setOpenlogIn(false);
  };

  const handleSubmitlogIn = async (e) => {
    e.preventDefault();

    const { firstName, lastName, email, password } = user;
    const newUser = { firstName, lastName, email, password };

    await axios
      .post("http://localhost:5000/user/log-in", newUser)
      .then((res) => {
        console.log(res.data.msg);
        handleClose();
        window.location = "/";
      });
  };

  const handleSubmitlogOut = async (e) => {
    e.preventDefault();

    const { firstName, lastName, email, password } = user;
    const newUser = { firstName, lastName, email, password };

    await axios
      .post("http://localhost:5000/user/log-out", newUser)
      .then((res) => {
        console.log(res.data);
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
      <LogIn
        open={openlogIn}
        handleOpen={handleOpenlogIn}
        handleClose={handleCloselogIn}
        handleChange={handleChangelogIn}
        user={userlogIn}
        handleSubmit={handleSubmitlogIn}
      />
      <Button variant="outlined" onClick={handleSubmitlogOut}>
        log Out
      </Button>
    </div>
  );
};
