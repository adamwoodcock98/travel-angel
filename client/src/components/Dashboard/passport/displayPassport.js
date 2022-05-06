import React, { useEffect, useState } from 'react';
import axios from "axios";

export const DisplayPassport = () => {
  const [state, setState] = useState([])
  useEffect(() => {
    axios.get("http://localhost:8000/dashboard/passport")
    .then((res) => {
      console.log(res.data)
      setState(res.data.passport)
  })
}, [])
  
    if (state.length) {
      return (
        <>
        {state[0].gender}
        </> )
    } else {

      return (
        <>loading</>
      )
    }
}