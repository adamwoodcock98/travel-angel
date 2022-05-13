import React, { useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import IconButton from "@mui/material/IconButton";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import "./crud.css";
import AddVisa from "../addVisa";
import DeleteDialogue from "../../../assets/deleteConfirmation";

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "top",
      horizontal: "left",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

const CrudMenu = (props) => {
  const visaData = props.visaData;
  const visaId = visaData._id;
  const userId = props.userId;
  const tripId = props.tripId;
  const handleUpload = props.handleUpload;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openCrud = Boolean(anchorEl);
  const [open, setOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCrudClose = () => {
    setAnchorEl(null);
  };

  const handleOpen = () => {
    handleCrudClose();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeletePromptOpen = () => {
    handleCrudClose();
    setDeleteOpen(true);
  };

  const handleDeletePromptClose = () => {
    handleCrudClose();
    setDeleteOpen(false);
    handleUpload();
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        id="demo-customized-button"
        aria-controls={openCrud ? "demo-customized-menu" : undefined}
        aria-expanded={openCrud ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          "aria-labelledby": "demo-customized-button",
        }}
        anchorEl={anchorEl}
        open={openCrud}
        onClose={handleCrudClose}
      >
        <MenuItem onClick={handleOpen} disableRipple>
          <EditOutlinedIcon />
          Edit
        </MenuItem>
        <MenuItem onClick={handleCrudClose} disableRipple>
          <FileDownloadOutlinedIcon />
          Add to calendar
        </MenuItem>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem
          onClick={handleDeletePromptOpen}
          disableRipple
          className="MenuItem"
        >
          <DeleteOutlinedIcon style={{ color: "#FF4949" }} />
          Delete
        </MenuItem>
      </StyledMenu>
      <DeleteDialogue
        open={deleteOpen}
        handleDeletePromptClose={handleDeletePromptClose}
        dataType="visas"
        objectId={visaId}
      />
      <AddVisa
        open={open}
        handleOpen={handleOpen}
        handleClose={handleClose}
        visaData={visaData}
        userId={userId}
        tripId={tripId}
        visaId={visaId}
        handleUpload={handleUpload}
      />
    </div>
  );
};

export default CrudMenu;
