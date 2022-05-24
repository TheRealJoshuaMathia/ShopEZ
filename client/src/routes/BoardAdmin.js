import React, { useState, useEffect } from "react";
import UserService from "../services/user.service";
import Grid from "@mui/material/Grid";
import EventBus from "../common/EventBus";
const BoardAdmin = () => {
  const [content, setContent] = useState("");
  useEffect(() => {
    UserService.getAdminBoard().then(
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

        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      }
    );
  }, []);
  return (
    <Grid container direction="column">
      <Grid item direction="column">
        <header>
          <h3>{content}</h3>
        </header>
      </Grid>
    </Grid>
  );
};
export default BoardAdmin;
