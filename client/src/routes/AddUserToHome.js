import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import HomeService from "../services/home.service";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";


const AddUserToHome = () => {

    let navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [homename, setHomename] = useState("");

    const onChangeUsername = (e) => {
        const username = e.target.value;
        setUsername(username);
    };
    const onChangeHomename = (e) => {
        const homename = e.target.value;
        setHomename(homename);
    };

    const saveUserToHome = (e) => {
        e.preventDefault();
        HomeService.addUserToHome(username, homename)
            .then((response) => {
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

    return (
        <Grid container justifyContent="center" alignItems="center">
            <form>
                <Grid item marginTop={2}>
                    <TextField
                        label="Username"
                        variant="outlined"
                        value={username}
                        name="Username"
                        onChange={onChangeUsername}
                    />
                </Grid>
                <Grid item marginTop={2}>
                    <TextField
                        label="Home Name"
                        variant="outlined"
                        value={homename}
                        name="Home Name"
                        onChange={onChangeHomename}
                    />
                </Grid>
                <Grid item padding={5}>
                    <Button variant="contained" color="primary" onClick={saveUserToHome}>
                        Submit
                    </Button>
                </Grid>
            </form>
        </Grid>
    );

}

export default AddUserToHome;