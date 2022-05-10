import * as React from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DeleteButton from "./deleteButton";

export default function DeleteDialogue({
  open,
  handleDeletePromptClose,
  dataType,
  objectId,
}) {
  const handleDelete = () => {
    handleDeletePromptClose();
    axios.post(
      `http://localhost:8000/dashboard/${dataType}/delete/${objectId}`
    );
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleDeletePromptClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Are you sure?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this item? <br />
            <br /> This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeletePromptClose} autoFocus>
            Cancel
          </Button>
          <DeleteButton handleClick={handleDelete} />
        </DialogActions>
      </Dialog>
    </div>
  );
}
