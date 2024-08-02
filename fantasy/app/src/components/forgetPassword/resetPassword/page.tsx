import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Container, Typography, Button, TextField } from "@mui/material";
import { resetPassword, resetPasswordCode } from "../../../api/auth/page";

const ResetPassword: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { email } = location.state as { email: string };

  const [code, setCode] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");

  const handlePasswordResetCode = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await resetPasswordCode(email);
      console.log("Password reset code sent.", email);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePasswordReset = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await resetPassword(email, code, newPassword);
      navigate("/");
      console.log("Password has been reset.", email, code, newPassword);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Reset Password
        </Typography>
        <Box component="form" onSubmit={handlePasswordResetCode}>
          <Button type="submit" variant="contained" sx={{ mb: 2 }}>
            Request Password Reset Code
          </Button>
        </Box>
        <Box component="form" onSubmit={handlePasswordReset}>
          <TextField
            label="Verification Code"
            fullWidth
            margin="normal"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          <TextField
            label="New Password"
            type="password"
            fullWidth
            margin="normal"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            Reset Password
          </Button>
        </Box>
      </Box>
    </Container>
  );
};
export default ResetPassword;
