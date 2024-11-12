import React from "react";
import { Box, Typography } from "@mui/material";

const Profile: React.FC = () => {
  return (
    <Box sx={{ border:"1px solid red" }} >
      <Typography variant="h5">Profile</Typography>
      <Typography>Edit your name, email, and password.</Typography>
    </Box>
  );
};

export default Profile;
