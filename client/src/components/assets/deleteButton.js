import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

const ColorButton = styled(Button)(({ theme }) => ({
  color: "#FF4949",
  backgroundColor: 'white',
  border: '1px solid',
  borderColor: '#FF4949',
  '&:hover': {
    color: "white",
    backgroundColor: "#FF3434",
  },
}));

export default function DeleteButton({handleClick}) {
  return (
      <ColorButton variant="contained" startIcon={<DeleteOutlinedIcon />} onClick={handleClick} >Delete</ColorButton>
  );
}
