import React, { useState, useEffect } from "react";
import UserService from "../services/user.service";
import Grid from "@mui/material/Grid";
import EventBus from "../common/EventBus";
const BoardShopper = () => {
  const [content, setContent] = useState("");
  useEffect(() => {
    UserService.getShopperBoard().then(
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

        if (error.response && error.repsonse.status === 401) {
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
export default BoardShopper;
