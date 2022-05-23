import React, { useState, useEffect } from "react";
import UserService from "../services/user.service";
import Grid from "@mui/material/Grid";
const BoardCaregiver = () => {
    const [content, setContent] = useState("");
    useEffect(() => {
        UserService.getCaregiverBoard().then(
            (response) => {
                setContent(response.data);
            },
            (error) => {
                const _content =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();
                setContent(_content);
            }
        );
    }, []);
    return (
        <Grid container
            direction="column">
            <Grid item
                direction="column">
                <header>
                    <h3>{content}</h3>
                </header>

            </Grid>
        </Grid>
    );
};
export default BoardCaregiver;
