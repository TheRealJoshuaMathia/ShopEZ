import React, { useEffect, useState } from "react";
import HomeService from "../services/home.service";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import createTheme from "@mui/material/styles/createTheme";
import { Link } from "react-router-dom";
import AuthService from "../services/auth.service";

const BoardHome = () => {
  const styles = createTheme({
    components: {
      Grid: {
        styleOverrides: {
          root: {},
        },
      },
    },
  });
  const user = AuthService.getCurrentUser();
  const username = user.username;

  return (
    <ThemeProvider theme={styles}>
      <div className="homeContainer">
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          sx={{ backgroundColor: "black", color: "white", height: "100vh" }}
        >
          <Grid item>
            <List>
              <ListItem>
                <Link to={"/showallhomes"}>Show All Homes</Link>
              </ListItem>
              <ListItem>
                <Link to={`/userhomes/${username}`}>Show User Homes</Link>
              </ListItem>
              <ListItem>
                <Link to={"/addhome"}>Create a Home</Link>
              </ListItem>
              <ListItem>
                <Typography> Hi</Typography>
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </div>
    </ThemeProvider>
  );
};
export default BoardHome;
