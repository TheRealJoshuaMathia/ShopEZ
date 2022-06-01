import React, { useEffect, useState } from "react";
import ShoppingListService from "../services/shoppinglist.service";

import Grid from "@mui/material/Grid";
import EventBus from "../common/EventBus";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { useParams } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { ThemeProvider, createTheme } from "@mui/material/styles";

// Styles

const styles = createTheme({
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          "&.card-item": {
            cursor: "pointer",
            width: "50vh",
          },
          ".item-details": {
            color: "white",
            padding: 10,
          },
          ".item-details-section": {
            marginTop: 10,
            backgroundColor: "black",
            width: "50%",
            color: "white",
          },
          "&.active-item": {
            backgroundColor: "gray",
          },
        },
      },
    },
    MuiGrid: {
      styleOverrides: {
        root: {},
      },
    },
  },
});

const ShowShoppingList = () => {
  const { id } = useParams();
  const [shoppingList, setShoppingList] = useState(null);

  const getShoppingList = (id) => {
    ShoppingListService.getList(id).then(
      (response) => {
        setShoppingList(response.data);
      },

      (error) => {
        const _setShoppingList =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setShoppingList(_setShoppingList);
        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      }
    );
  };
  useEffect(() => {
    getShoppingList(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <ThemeProvider theme={styles}>
      <Grid
        container
        direction="column"
        sx={{
          backgroundColor: "black",
          height: "100vh",
          marginTop: 5,
        }}
      >
        <Grid item direction="column" className="item-grid">
          <List>
            {shoppingList && (
              <>
                <div className="list-info">
                  <ListItem>{shoppingList.id}</ListItem>
                  <ListItem>{shoppingList.title}</ListItem>
                </div>

                {shoppingList.shoppingList.length !== 0 &&
                  shoppingList.shoppingList.map((item, index) => (
                    <Grid
                      item
                      direction="column"
                      alignItems="center"
                      sx={{
                        marginTop: 5,
                        width: "50vw",
                        marginLeft: 5,
                      }}
                    >
                      <div key={index}>
                        <Card>
                          <CardContent>
                            <Typography variant="h4">{item.id}</Typography>
                            <Typography variant="h4">{item.title}</Typography>
                            <Box className="item-details-section">
                              <Typography className="item-details">
                                Type: {item.type}
                              </Typography>
                              <Typography className="item-details">
                                Catagory: {item.catagory}
                              </Typography>
                              <Typography className="item-details">
                                Store: {item.store}
                              </Typography>
                            </Box>
                          </CardContent>
                        </Card>
                      </div>
                    </Grid>
                  ))}
              </>
            )}
          </List>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default ShowShoppingList;
