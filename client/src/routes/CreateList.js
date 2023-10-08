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

import FormControl from "@mui/material/FormControl/FormControl";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
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
const CreateList = () => {
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
          {/* 
        
          1. Add a form field or radio button to select the home name
          2. Add a select button to each item card
          3. Add a cart logo to the sticky navbar?
          4. Display a modal showing the chosen items??

        
        
        */}
          <Box style={{ color: "white" }}>
            <FormControl>
              <FormLabel>Homes</FormLabel>

              <RadioGroup defaultValue="Select" name="radio-buttons-group">
                <FormControlLabel
                  value="select"
                  control={<Radio />}
                  label="Select"
                />
                <FormControlLabel
                  value="select 2"
                  control={<Radio />}
                  label="Select 2"
                />
              </RadioGroup>
            </FormControl>
          </Box>

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
export default CreateList;
