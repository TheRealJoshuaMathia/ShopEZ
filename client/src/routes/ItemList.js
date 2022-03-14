import React, { useState, useEffect } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import ItemDataService from "../services/items.service";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

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
  },
});

const ItemList = () => {
  const [items, setItems] = useState([]);
  const [activeItem, setActiveItem] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);

  useEffect(() => {
    retrieveItems();
  }, []);

  const retrieveItems = () => {
    ItemDataService.getAll()
      .then((response) => {
        setItems(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
        console.log("Error showing list!");
      });
  };
  const selectedItem = (item, index) => {
    setActiveItem(item);
    setCurrentIndex(index);
    showButton();
  };

  const showButton = () => {
    return (
      <Grid item>
        <Button sx={{
          marginTop: 1,
          padding: 2,
        }} variant="contained" color="error">
          <Link to={`/items/${activeItem.id}`}>
            Edit
          </Link>
        </Button>
      </Grid>
    )
  }

  return (
    <ThemeProvider theme={styles}>
      <Grid className="items" container
        direction="column">
        {items &&
          items.map((item, index) => (
            <Grid
              item
              direction="column"
              sx={{
                backgroundColor: "white",
                marginTop: 5,
              }}
            >
              <Card
                className={
                  "card-item " + (index === currentIndex ? "active-item" : "")
                }
                onClick={() => selectedItem(item, index)}
                key={item.id}
              >
                <CardContent>
                  {/* Todo: Make the Card content have the ripple effect. This would give a read only feel */}
                  <Typography variant="h4"> {item.id} </Typography>
                  <Typography variant="h4"> {item.title} </Typography>
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
              {activeItem ? showButton() : null}
            </Grid>
          ))}
      </Grid>
    </ThemeProvider >
  );
};
export default ItemList;
