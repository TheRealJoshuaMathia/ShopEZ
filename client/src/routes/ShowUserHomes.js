import React, { useEffect, useState } from "react";
import HomeService from "../services/home.service";
import EventBus from "../common/EventBus";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { useParams } from "react-router-dom";

const ShowUserHomes = () => {
  const [showHomes, setHomes] = useState([]);
  const { username } = useParams();

  const getHomes = (username) => {
    HomeService.getUserHomes(username).then(
      (response) => {
        setHomes(response.data);
        console.log(response.data);
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
  };

  useEffect(() => {
    getHomes(username);
  }, [username]);

  return (
    <Grid container direction="column">
      <Grid item direction="column">
        <List>
          {console.log(showHomes)}
          {showHomes &&
            showHomes.map((home) => (
              <div>
                <ListItem>{home.name}</ListItem>
              </div>
            ))}
        </List>
      </Grid>
    </Grid>
  );
};

export default ShowUserHomes;
