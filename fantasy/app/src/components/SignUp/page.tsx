import React, { useEffect, useState } from "react";
import { signUp } from "../../api/auth/page";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Grid,
  Typography,
  InputAdornment,
  IconButton,
  FormControlLabel,
  Checkbox,
  Button,
  TextField,
} from "@mui/material";
import { VisibilityOff, Visibility, Clear } from "@mui/icons-material";

import guiter_image from "../../images/image/guiter.jpg";

const SignUp: React.FC = () => {
  // Email, Password, Confirm Password Function
  const [email, setEmail] = useState("");
  const [showEmail, setShowEmail] = React.useState(false);
  const [emailError, setEmailError] = useState<boolean>(false);
  const [emailBackgroundColor, setEmailBackgroundColor] = useState<string>("");
  const handleMouseDownEmail = (event: React.MouseEvent<HTMLButtonElement>) =>
    event.preventDefault();
  const handleClickShowEmail = () => setShowEmail((showEmail) => !showEmail);

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [passwordBackgroundColor, setPasswordBackgroundColor] =
    useState<string>("");
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => event.preventDefault();
  const handleClickShowPassword = () =>
    setShowPassword((showPassword) => !showPassword);

  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [confirmPasswordError, setConfirmPasswordError] =
    useState<boolean>(false);
  const [confirmPasswordBackgroundColor, setConfirmPasswordBackgroundColor] =
    useState<string>("");
  const handleMouseDownConfirmPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => event.preventDefault();
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((showConfirmPassword) => !showConfirmPassword);

  // Success and Error Message Function
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const [rememberMe, setRememberMe] = useState(false);
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError("Please enter your email address.");
      setEmailError(true);
      setPasswordError(false);
      setConfirmPasswordError(false);
      setEmailBackgroundColor("#FFECE8");
      setPasswordBackgroundColor("");
      setConfirmPasswordBackgroundColor("");
      return;
    }
    if (!password) {
      setError("Please enter your password.");
      setEmailError(false);
      setPasswordError(true);
      setConfirmPasswordError(true);
      setEmailBackgroundColor("");
      setPasswordBackgroundColor("#FFECE8");
      setConfirmPasswordBackgroundColor("");
      return;
    }
    if (!confirmPassword) {
      setError("Please confirm your password.");
      setEmailError(false);
      setPasswordError(true);
      setConfirmPasswordError(true);
      setEmailBackgroundColor("");
      setPasswordBackgroundColor("");
      setConfirmPasswordBackgroundColor("#FFECE8");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setEmailError(false);
      setPasswordError(true);
      setConfirmPasswordError(true);
      setEmailBackgroundColor("");
      setPasswordBackgroundColor("#FFECE8");
      setConfirmPasswordBackgroundColor("#FFECE8");
      setPassword("");
      setConfirmPassword("");
      return;
    }
    try {
      const response = await signUp(email, password);
      console.log("Response:", response);
      if (rememberMe) {
        localStorage.setItem("email", email);
        localStorage.setItem("password", password);
        localStorage.setItem("rememberMe", "true");
      } else {
        localStorage.removeItem("email");
        localStorage.removeItem("password");
        localStorage.setItem("rememberMe", "false");
      }
      setMessage(
        "Sign up successful. Please check your email to verify your account."
      );
      setTimeout(() => navigate("/"), 2000);
      setError("");
    } catch (err) {
      const errorResponse = err as { message: string };
      const errorMessage = errorResponse.message;
      setError(errorMessage);
      setMessage("");
      setEmailError(true);
      setPasswordError(true);
      setConfirmPasswordError(true);
      setEmailBackgroundColor("#FFECE8");
      setPasswordBackgroundColor("#FFECE8");
      setConfirmPasswordBackgroundColor("#FFECE8");
    }
  };

  // Remember Me Function
  useEffect(() => {
    const savedRememberMe = localStorage.getItem("rememberMe") === "true";
    if (savedRememberMe) {
      const savedEmail = localStorage.getItem("email") || "";
      const savedPassword = localStorage.getItem("password") || "";
      setEmail(savedEmail);
      setPassword(savedPassword);
      setRememberMe(true);
    } else {
      localStorage.removeItem("email");
      localStorage.removeItem("password");
    }
  }, []);
  const handleRememberMeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRememberMe(event.target.checked);
    if (!event.target.checked) {
      localStorage.removeItem("email");
      localStorage.removeItem("password");
    }
  };

  // Email Error Function
  const handeleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputemail = event.target.value;
    setEmail(inputemail);
    if (!inputemail) {
      setEmailError(false);
      setEmailBackgroundColor("");
    }
  };
  const handleFocusEmail = () => {
    if (emailError) {
      setEmailBackgroundColor("#FDCDC5");
    }
  };
  const handleBlurEmail = () => {
    if (emailError) {
      setEmailBackgroundColor("#FFECE8");
    }
  };

  // Password Error Function
  const handelePasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const inputpassword = event.target.value;
    setPassword(inputpassword);
    if (!inputpassword) {
      setPasswordError(false);
      setPasswordBackgroundColor("");
    }
  };
  const handleFocusPassword = () => {
    if (passwordError) {
      setPasswordBackgroundColor("#FDCDC5");
    }
  };
  const handleBlurPassword = () => {
    if (passwordError) {
      setPasswordBackgroundColor("#FFECE8");
    }
  };
  const handleClearPassword = () => {
    setPassword("");
  };

  // Confirm Password Error Function
  const handleConfirmPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const inputConfirmPassword = event.target.value;
    setConfirmPassword(inputConfirmPassword);
    if (!inputConfirmPassword) {
      setConfirmPasswordError(false);
      setConfirmPasswordBackgroundColor("");
    }
  };
  const handleFocusConfirmPassword = () => {
    if (confirmPasswordError) {
      setConfirmPasswordBackgroundColor("#FDCDC5");
    }
  };
  const handleBlurConfirmPassword = () => {
    if (confirmPasswordError) {
      setConfirmPasswordBackgroundColor("#FFECE8");
    }
  };
  const handleClearConfirmPassword = () => {
    setConfirmPassword("");
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        position: "relative",
      }}
    >
      <Grid container>
        <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
          {/* Guiter Image */}
          <Box
            component="img"
            src={guiter_image}
            sx={{
              width: "100%",
              height: "100%",
            }}
          />
        </Grid>
        <Grid
          item
          xs={6}
          sm={6}
          md={6}
          lg={6}
          xl={6}
          sx={{
            position: "relative",
          }}
        >
          {/* Welcome Text */}
          <Box
            sx={{
              position: "relative",
              width: "32px",
              height: "32px",
              border: "6px solid #000000",
              borderRadius: "50%",
              top: "15%",
              left: "20%",
            }}
          />
          <Box
            component="form"
            onSubmit={handleSignUp}
            sx={{
              position: "relative",
              display: "flex",
              flexDirection: "column",
              top: "18%",
              left: "20%",
            }}
          >
            <Typography
              sx={{
                fontFamily: "Helvetica",
                fontSize: "28px",
                fontWeight: "700",
                lineHeight: "36px",
                textAlign: "left",
                color: "#1D2129",
                my: "1%",
              }}
            >
              Welcome to Fantasy
            </Typography>
            <Typography
              sx={{
                fontFamily: "PingFang SC",
                fontSize: "16px",
                fontWeight: "400",
                lineHeight: "22px",
                textAlign: "left",
                color: "#4E5969",
              }}
            >
              Register your account
            </Typography>

            {/* Input Email */}
            <Typography
              sx={{
                fontFamily: "Helvetica",
                fontSize: "14px",
                fontWeight: "700",
                lineHeight: "22px",
                textAlign: "left",
                color: "#4E5969",
                mt: "5%",
              }}
            >
              Email
            </Typography>
            <TextField
              variant="outlined"
              placeholder="Enter your email address..."
              type={showEmail ? "text" : "password"}
              error={emailError}
              value={email}
              onChange={handeleEmailChange}
              onFocus={handleFocusEmail}
              onBlur={handleBlurEmail}
              size="small"
              sx={{
                width: "80%",
                fontFamily: "Helvetica",
                fontSize: "14px",
                fontWeight: "300",
                lineHeight: "22px",
                textAlign: "left",
                color: "#86909C",
                mt: "1%",
              }}
              InputProps={{
                style: { backgroundColor: emailBackgroundColor },
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle email visibility"
                      onClick={handleClickShowEmail}
                      onMouseDown={handleMouseDownEmail}
                      edge="end"
                    >
                      {showEmail ? (
                        <Visibility fontSize="small" />
                      ) : (
                        <VisibilityOff fontSize="small" />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {/* Input Password */}
            <Typography
              sx={{
                fontFamily: "Helvetica",
                fontSize: "14px",
                fontWeight: "700",
                lineHeight: "22px",
                textAlign: "left",
                color: "#4E5969",
                mt: "5%",
              }}
            >
              Password
            </Typography>
            <TextField
              variant="outlined"
              placeholder="Enter your password..."
              type={showPassword ? "text" : "password"}
              error={passwordError}
              value={password}
              onChange={handelePasswordChange}
              onFocus={handleFocusPassword}
              onBlur={handleBlurPassword}
              size="small"
              sx={{
                width: "80%",
                fontFamily: "Helvetica",
                fontSize: "14px",
                fontWeight: "300",
                lineHeight: "22px",
                textAlign: "left",
                color: "#86909C",
                mt: "1%",
              }}
              InputProps={{
                style: { backgroundColor: passwordBackgroundColor },
                endAdornment: (
                  <InputAdornment position="end">
                    {password && (
                      <IconButton
                        aria-label="clear password"
                        onClick={handleClearPassword}
                        edge="end"
                      >
                        <Clear fontSize="small" />
                      </IconButton>
                    )}
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? (
                        <Visibility fontSize="small" />
                      ) : (
                        <VisibilityOff fontSize="small" />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {/* Confirm Password */}
            <Typography
              sx={{
                fontFamily: "Helvetica",
                fontSize: "14px",
                fontWeight: "700",
                lineHeight: "22px",
                textAlign: "left",
                color: "#4E5969",
                mt: "5%",
              }}
            >
              Confirm Password
            </Typography>
            <TextField
              variant="outlined"
              placeholder="Confirm your password..."
              type={showConfirmPassword ? "text" : "password"}
              error={confirmPasswordError}
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              onFocus={handleFocusConfirmPassword}
              onBlur={handleBlurConfirmPassword}
              size="small"
              sx={{
                width: "80%",
                fontFamily: "Helvetica",
                fontSize: "14px",
                fontWeight: "300",
                lineHeight: "22px",
                textAlign: "left",
                color: "#86909C",
                mt: "1%",
              }}
              InputProps={{
                style: { backgroundColor: confirmPasswordBackgroundColor },
                endAdornment: (
                  <InputAdornment position="end">
                    {confirmPassword && (
                      <IconButton
                        aria-label="clear confirm password"
                        onClick={handleClearConfirmPassword}
                        edge="end"
                      >
                        <Clear fontSize="small" />
                      </IconButton>
                    )}
                    <IconButton
                      aria-label="toggle confirmpassword visibility"
                      onClick={handleClickShowConfirmPassword}
                      onMouseDown={handleMouseDownConfirmPassword}
                      edge="end"
                    >
                      {showConfirmPassword ? (
                        <Visibility fontSize="small" />
                      ) : (
                        <VisibilityOff fontSize="small" />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {/* Error and Success Message */}
            <Box
              sx={{
                height: "15px",
              }}
            >
              {error && (
                <Typography
                  color="#F53F3F"
                  variant="body2"
                  sx={{ visibility: "visible" }}
                >
                  {error}
                </Typography>
              )}
              {message && (
                <Typography
                  color="success"
                  variant="body2"
                  sx={{ visibility: "visible" }}
                >
                  {message}
                </Typography>
              )}
            </Box>

            {/* Remember Me */}
            <FormControlLabel
              control={
                <Checkbox
                  checked={rememberMe}
                  onChange={handleRememberMeChange}
                />
              }
              label="Remember me"
            />

            {/* Sign in Button */}
            <Button
              type="submit"
              variant="contained"
              sx={{
                fontFamily: "Helvetica",
                fontSize: "14px",
                fontWeight: "700",
                lineHeight: "22px",
                textAlign: "center",
                textTransform: "none",
                width: "80%",
                height: "100%",
                backgroundColor: "#0057FE",
                color: "#FFFFFF",
                p: "1.5%",
                mt: "5%",
              }}
            >
              Sign up
            </Button>

            {/* As a Guest */}
            <Link
              to="/homepage"
              style={{
                width: "80%",
                height: "100%",
                marginTop: "5%",
              }}
            >
              <Button
                sx={{
                  fontFamily: "PingFang SC",
                  fontSize: "14px",
                  fontWeight: "500",
                  lineHeight: "22px",
                  textAlign: "center",
                  textTransform: "none",
                  width: "100%",
                  height: "100%",
                  backgroundColor: "#FFFFFF",
                  color: "#4E5969",
                  border: "1px solid #E5E6E8",
                  p: "1.5%",
                }}
              >
                Continue as a guest
              </Button>
            </Link>

            {/* Already have an account and sign in */}
            <Typography
              sx={{
                fontFamily: "Helvetica",
                fontSize: "14px",
                fontWeight: "400",
                lineHeight: "22px",
                textAlign: "left",
                color: "#86909C",
                mt: "5%",
              }}
            >
              Already have an account?
              <Link
                to="/"
                style={{
                  textDecoration: "none",
                  fontFamily: "Helvetica",
                  fontSize: "14px",
                  fontWeight: "400",
                  lineHeight: "22px",
                  textAlign: "left",
                  color: "#0057FE",
                  marginLeft: "1%",
                }}
              >
                Sign In
              </Link>
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SignUp;
