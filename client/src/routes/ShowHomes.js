import React, { useEffect, useState } from "react";
import HomeService from "../services/home.service";
import Grid from "@mui/material/Grid";
import EventBus from "../common/EventBus";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

const ShowHomes = () => {
  const [homes, setHomes] = useState([]);

  useEffect(() => {
    HomeService.getHomes().then(
      (response) => {
        setHomes(response.data);
        // console.log(response.data);
      },
      (error) => {
        const _setHomes =
          (error.response &&
            error.response.data &&
            error.response.data.messsage) ||
          error.message ||
          error.toString();
        setHomes(_setHomes);

        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      }
    );
  }, []);

  return (
    <Grid container direction="column">
      <Grid item direction="column">
        <List>
          {homes &&
            homes.map((home, index) => (
              <div key={index}>
                <ListItem>Home Name: {home.name}</ListItem>
              </div>
            ))}
        </List>
      </Grid>
    </Grid>
  );
};

export default ShowHomes;
