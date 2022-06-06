import React, { useEffect, useState } from "react";
import ShoppingListService from "../services/shoppinglist.service";

import Grid from "@mui/material/Grid";
import EventBus from "../common/EventBus";
import List from "@mui/material/List";
import { useParams } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Fab from "@mui/material/Fab";
import EditIcon from "@mui/icons-material/Edit";

// Styles

const styles = createTheme({
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          ".item-title": {
            fontSize: "2em",
          },
          ".item-details-section": {
            marginTop: 10,
            backgroundColor: "black",
            color: "white",
            fontSize: "1em",
            paddingLeft: 2,
            paddingBottom: "10px",
          },
          ".item-detail": {
            marginLeft: "10px",
            paddingTop: "10px",
          },
        },
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
          minHeight: "100vh",
          paddingTop: "50px",
        }}
      >
        <Grid container direction="column" alignContent="center">
          {shoppingList && (
            <>
              <Grid item>
                <Box
                  sx={{
                    backgroundColor: "gray",
                    height: "25%",
                    color: "white",
                    textAlign: "center",
                    verticalAlign: "center",
                    padding: "5px",
                  }}
                >
                  <Typography variant="h4">
                    List ID: {shoppingList.id}
                  </Typography>
                  <Typography variant="h4">
                    List Title: {shoppingList.title}
                  </Typography>
                </Box>
              </Grid>

              <List>
                {shoppingList.shoppingList.length !== 0 &&
                  shoppingList.shoppingList.map((item, index) => (
                    <Grid
                      item
                      direction="column"
                      sx={{
                        marginTop: "20px",
                        marginBottom: "25px",
                        maxWidth: "90vw",
                        width: "500px",
                      }}
                    >
                      <Box key={index}>
                        <Card>
                          <CardContent>
                            {/* <Typography variant="h4">{item.id}</Typography> */}
                            <Box>
                              <Typography className="item-title">
                                {item.title}
                              </Typography>
                            </Box>

                            <Box className="item-details-section">
                              <Typography className="item-detail">
                                Type: {item.type}
                              </Typography>
                              <Typography className="item-detail">
                                Catagory: {item.catagory}
                              </Typography>
                              <Typography className="item-detail">
                                Store: {item.store}
                              </Typography>
                            </Box>
                          </CardContent>
                          <Box>
                            <Fab
                              sx={{
                                float: "right",
                                marginRight: "20px",
                                marginBottom: "10px",
                              }}
                              color="primary"
                              aria-label="edit"
                              size="medium"
                            >
                              <EditIcon />
                            </Fab>
                          </Box>
                        </Card>
                      </Box>
                    </Grid>
                  ))}
              </List>
            </>
          )}
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default ShowShoppingList;
