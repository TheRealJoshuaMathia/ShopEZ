import React from "react";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";

const ListItemStyles = createTheme({
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
  },
});
const ListItem = (item) => {
  const { title, type, catagory, store } = item;
  return (
    <>
      <ThemeProvider theme={ListItemStyles}>
        <Container>
          <Card>
            <CardContent>
              {/* Todo: Make the Card content have the ripple effect. This would give a read only feel */}
              <Typography variant="h4"> {title} </Typography>
              <Box className="item-details-section">
                <Typography className="item-details">Type: {type}</Typography>
                <Typography className="item-details">
                  Catagory: {catagory}
                </Typography>
                <Typography className="item-details">Store: {store}</Typography>
              </Box>
            </CardContent>
          </Card>
        </Container>
      </ThemeProvider>
    </>
  );
};
export default ListItem;
