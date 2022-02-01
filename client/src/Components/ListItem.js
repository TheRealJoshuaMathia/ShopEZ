import React from "react";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

const compStyles = createTheme({
  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          backgroundColor: "grey",
          paddingBottom: "20px",
          paddingTop: "20px",
        },
      },
    },
  },
});
const cardStyles = createTheme({
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          ".item-details": {
            color: "white",
            padding: 10,
          },
          ".item-details-section": {
            marginTop: 10,
            backgroundColor: "black",
            width: "25%",
            color: "white",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          float: "right",
          backgroundColor: "grey",
          color: "black",
          margin: 10,
          "&:hover": {
            backgroundColor: "red",
          },
          "&.store": {
            backgroundColor: "grey",
            color: "white",
          },
        },
      },
    },
  },
});

const ListItem = (item) => {
  const { title, type, catagory, store } = item;
  return (
    <>
      <ThemeProvider theme={compStyles}>
        <Container>
          <ThemeProvider theme={cardStyles}>
            <Card>
              <CardContent>
                {/* Todo: Make the Card content have the ripple effect. This would give a read only feel */}
                <Typography variant="h4"> {title} </Typography>
                <Box className="item-details-section">
                  <Typography className="item-details">Type: {type}</Typography>
                  <Typography className="item-details">
                    Catagory: {catagory}
                  </Typography>

                  <Typography className="item-details">
                    Store: {store}
                  </Typography>
                </Box>
                <Box className="makeblack">
                  {/* Todo: understand ordering of buttons from 0-n as appears 1st from the "float point" */}
                  <Button className="store">Edit details</Button>
                </Box>
              </CardContent>
            </Card>
          </ThemeProvider>
        </Container>
      </ThemeProvider>
    </>
  );
};
export default ListItem;
