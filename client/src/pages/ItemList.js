import React, { Component } from "react";
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
            width: "inherit",
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

export default class ItemList extends Component {
  constructor(props) {
    super(props);
    this.retrieveItems = this.retrieveItems.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveItem = this.setActiveItem.bind(this);
    this.state = {
      items: [],
      activeItem: null,
      currentIndex: -1,
    };
  }

  componentDidMount() {
    this.retrieveItems();
  }
  retrieveItems() {
    ItemDataService.getAll()
      .then((response) => {
        this.setState({
          items: response.data,
        });
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
        console.log("Error showing list");
      });
  }
  refreshList() {
    this.retrieveItems();
    this.setState({
      activeItem: null,
      currentIndex: -1,
    });
  }
  setActiveItem(item, index) {
    this.setState({
      activeItem: item,
      currentIndex: index,
    });
  }
  render() {
    const { items, activeItem, currentIndex } = this.state;
    return (
      <ThemeProvider theme={styles}>
        <Grid className="items" container>
          {items &&
            items.map((item, index) => (
              <Grid
                item
                xs={8}
                sx={{
                  backgroundColor: "white",
                  marginTop: 5,
                }}
              >
                <Card
                  className={
                    "card-item " + (index === currentIndex ? "active-item" : "")
                  }
                  onClick={() => this.setActiveItem(item, index)}
                  key={index}
                >
                  <CardContent>
                    {/* Todo: Make the Card content have the ripple effect. This would give a read only feel */}
                    <Typography variant="h4"> {item.title} </Typography>
                    <Typography variant="h4"> {item.itemId} </Typography>
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
              </Grid>
            ))}
          {activeItem ? (
            <Grid
              item
              di
              xs={4}
              sx={{
                backgroundColor: "red",
              }}
            >
              <Button>
                <Link to={"/items/" + activeItem.itemId} color="error">
                  Edit
                </Link>
              </Button>
            </Grid>
          ) : (
            <Grid direction="row" xs={4}>
              <br />
              <p>Select an Item!</p>
            </Grid>
          )}
        </Grid>
      </ThemeProvider>
    );
  }
}
