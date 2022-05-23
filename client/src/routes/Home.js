import React, { useState, useEffect } from "react";
import UserService from "../services/user.service";
import Grid from "@mui/material/Grid";
const Home = () => {
  const [content, setContent] = useState("");
  useEffect(() => {
    UserService.getPublicContent().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
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
export default Home;