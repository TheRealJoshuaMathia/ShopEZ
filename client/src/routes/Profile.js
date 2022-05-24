import { Grid, Box } from "@mui/material";
import React from "react";
import AuthService from "../services/auth.service";
const Profile = () => {
  const currentUser = AuthService.getCurrentUser();
  return (
    <Grid container>
      <Box>
        <header>
          <h3>
            <strong>{currentUser.username}</strong> Profile
          </h3>
        </header>
      </Box>
      <p>
        <strong>Id:</strong> {currentUser.id}
      </p>
      <p>
        <strong>Email:</strong> {currentUser.email}
      </p>
      <strong>Authorities:</strong>
      <ul>
        {currentUser.roles &&
          currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
      </ul>
    </Grid>
  );
};
export default Profile;
