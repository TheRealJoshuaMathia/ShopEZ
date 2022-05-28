import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import HomeService from "../services/home.service";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
const AddHome = () => {
  let navigate = useNavigate();
  const [homeName, setHomeName] = useState("");

  //   const [submitted, setSubmitted] = useState(false);
  const handleInputChange = (e) => {
    const homeName = e.target.value;
    setHomeName(homeName);
  };

  const saveHome = (e) => {
    e.preventDefault();
    HomeService.createHome(homeName).then(
      (response) => {
        // setSubmitted(true);
        console.log(response.data);
        console.log("Submitted Successfully");
        navigate("/boardhome");
      },
      (error) => {
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
          error.message ||
          error.toString();
      }
    );
  };

  //   const newHome = () => {
  //     setHome(defaultHomeState);
  //     setSubmitted(false);
  //   };

  return (
    <Grid container justifyContent="center" alignItems="center">
      <form>
        <Grid item marginTop={2}>
          <TextField
            label="Home Name"
            variant="outlined"
            value={homeName}
            name="HomeName"
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item padding={5}>
          <Button variant="contained" color="primary" onClick={saveHome}>
            Submit
          </Button>
        </Grid>
      </form>
    </Grid>
  );
};

export default AddHome;
