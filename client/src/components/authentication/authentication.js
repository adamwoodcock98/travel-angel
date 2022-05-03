import { useState } from "react";
import axios from "axios";
import SignUp from "./signUp/signUp";
import SignIn from "./signIn/signIn";
import Button from "@mui/material/Button";

export const Authentication = () => {
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

    await axios
      .post("http://localhost:5000/user/sign-in", newUser)
      .then((res) => {
        greetUser(res.data.msg);
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
      .then((res) => {
        console.log(newUser);
        console.log(res.data);
        handleClose();
        window.location = "/";
      });
  };

  const greetUser = (message) => {
    console.log(message);
  };

  // const getUserData = async (e) => {
  //   await axios
  //     .post(`/posts/${element.id}/${element.textContent.trim()}`, {
  //       post_id: element.id,
  //     })
  //     .then((response) => {
  //       updateLikes(response.data, element.id);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

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
      <h1>User: </h1>
    </div>
  );
};
