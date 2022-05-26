import React, { useEffect, useState } from "react";
import HomeService from "../services/home.service";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import createTheme from "@mui/material/styles/createTheme";
import { Link } from "react-router-dom";

const BoardHome = () => {
   const styles = createTheme({
      components: {
         Grid: {
            styleOverrides: {
               root: {
               },
            },
         },

      }
   });

   return (
      <ThemeProvider theme={styles}>
         <div className="homeContainer">
            <Grid container justifyContent="center" alignItems="center"
               sx={{ backgroundColor: "black", color: "white", height: "100vh" }}>
               <Grid item>
                  <List>
                     <ListItem>

                        <Link to={"/showallHomes"}>
                           Show
                        </Link>

                     </ListItem>
                     <ListItem>
                        <Typography> Hi</Typography>
                     </ListItem>
                     <ListItem>
                        <Typography> Hi</Typography>
                     </ListItem>
                     <ListItem>
                        <Typography> Hi</Typography>
                     </ListItem>
                  </List>

               </Grid>
            </Grid>
         </div>

      </ThemeProvider >
   );
};
export default BoardHome;
