
import React, { useState } from "react";
import Form from "react-validation/build/form";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import HomeService from "../services/home.service";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
const AddHome = () => {
    let navigate = useNavigate();
    const [homename, setHomeName] = useState("");
    const onChangeHomeName = (e) => {
        const homename = e.target.value;
        setHomeName(homename);
    }

    const handleSubmit = () => {
        HomeService.createHome(homename)
            .then((response) => {
                console.log(response.data)
                console.log("Submitted SuccessFully");
                navigate("/boardhome");
            })
            .catch((event) => {
                console.log(event);
                console.log("Error on submission");
            });
    };

    return (
        <Grid container justifyContent="center" alignItems="center">
            <form>

                <Grid item marginTop={2} >
                    <TextField
                        label="Home Name"
                        variant="outlined"
                        value={homename}
                        name="Home Name"
                        onChange={onChangeHomeName}></TextField>
                </Grid>
                <Grid item padding={5} >
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit}>
                        Submit

                    </Button>
                </Grid>
            </form>
        </Grid>

    )

}

export default AddHome;