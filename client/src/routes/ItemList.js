import React, { useState, useEffect } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import EditIcon from "@mui/icons-material/Edit";
import ItemService from "../services/items.service";
import EventBus from "../common/EventBus";

const styles = createTheme({
  components: {
    MuiGrid: {
      styleOverrides: {
        root: {},
      },
    },
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

const ItemList = () => {
  const [items, setItems] = useState([]);

  const retrieveItems = () => {
    ItemService.getAll().then(
      (response) => {
        setItems(response.data);
      },

      (error) => {
        const _setItems =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setItems(_setItems);
        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      }
    );
  };

  useEffect(() => {
    retrieveItems();
  }, []);

  return (
    <ThemeProvider theme={styles}>
      <Grid
        container
        direction="column"
        alignContent="center"
        sx={{
          backgroundColor: "black",
          minHeight: "100vh",
          paddingTop: "50px",
        }}
      >
        <Grid
          container
          direction={"column"}
          sx={{ width: "500px", maxWidth: "90vw", alignContent: "center" }}
        >
          {items &&
            items.map((item) => (
              <Grid
                item
                direction="column"
                sx={{
                  marginTop: "20px",
                  marginBottom: "25px",
                  //width: "500px",
                  //maxWidth: "90vw",
                }}
              >
                <Card key={item.id}>
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
                      <Link to={`/items/${item.id}`}>
                        <EditIcon />
                      </Link>
                    </Fab>
                  </Box>
                </Card>
              </Grid>
            ))}
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};
export default ItemList;
