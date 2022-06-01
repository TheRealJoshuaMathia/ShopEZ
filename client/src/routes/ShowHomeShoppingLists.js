import React, { useEffect, useState } from "react";
import HomeService from "../services/home.service";
import Grid from "@mui/material/Grid";
import EventBus from "../common/EventBus";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { useParams, Link } from "react-router-dom";

const ShowHomesShoppingLists = () => {
  const [showShoppingLists, setShoppingLists] = useState([]);
  const { homename } = useParams();

  const getShoppingLists = (homename) => {
    HomeService.getHomeShoppingLists(homename).then(
      (response) => {
        setShoppingLists(response.data);
        console.log(response.data);
      },
      (error) => {
        const _setShoppingLists =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setShoppingLists(_setShoppingLists);
        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      }
    );
  };
  useEffect(() => {
    getShoppingLists(homename);
  }, [homename]);

  return (
    <Grid container direction="column">
      <Grid item direction="column">
        <List>
          {console.log(showShoppingLists)}
          {showShoppingLists &&
            showShoppingLists.map((list) => (
              <div key={list.id}>
                <ListItem>List Title: {list.title}</ListItem>
                <ListItem>
                  <Link to={`/shoppinglist/${list.id}`}>View List</Link>
                </ListItem>
              </div>
            ))}
        </List>
      </Grid>
    </Grid>
  );
};

export default ShowHomesShoppingLists;
