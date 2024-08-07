import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signIn } from "../../api/auth/page";
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

const Sign_in: React.FC = () => {
  // Email Function
  const [email, setEmail] = useState<string>("");
  const [showEmail, setShowEmail] = React.useState<boolean>(false);
  const [emailError, setEmailError] = useState<boolean>(false);
  const [emailBackgroundColor, setEmailBackgroundColor] = useState<string>("");
  const handleMouseDownEmail = (event: React.MouseEvent<HTMLButtonElement>) =>
    event.preventDefault();
  const handleClickShowEmail = () => setShowEmail((showEmail) => !showEmail);

  // Password Function
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [passwordBackgroundColor, setPasswordBackgroundColor] =
    useState<string>("");
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => event.preventDefault();
  const handleClickShowPassword = () =>
    setShowPassword((showPassword) => !showPassword);

  // Message Function
  const [error, setError] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const navigate = useNavigate();
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError("Please enter your email address.");
      setEmailError(true);
      setPasswordError(false);
      setEmailBackgroundColor("#FFECE8");
      setPasswordBackgroundColor("#FFECE8");
      setPassword("");
      return;
    }
    if (!password) {
      setError("Please enter your password.");
      setEmailError(false);
      setPasswordError(true);
      setEmailBackgroundColor("#FFECE8");
      setPasswordBackgroundColor("#FFECE8");
      setPassword("");
      return;
    } else {
      setError("");
      setEmailError(false);
      setPasswordError(false);
      setEmailBackgroundColor("");
      setPasswordBackgroundColor("");
    }
    try {
      const response = await signIn(email, password);
      const { idToken, accessToken, refreshToken } = response.data;
      localStorage.setItem("idToken", idToken);
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      if (rememberMe) {
        localStorage.setItem("email", email);
        localStorage.setItem("password", password);
        localStorage.setItem("rememberMe", "true");
      } else {
        localStorage.removeItem("email");
        localStorage.removeItem("password");
        localStorage.setItem("rememberMe", "false");
      }
      setMessage("Sign in successful");
      setError("");
      navigate("/homepage");
    } catch (error) {
      setError("Invalid email or password.");
      setMessage("");
      setEmailError(true);
      setPasswordError(true);
      setEmailBackgroundColor("#FFECE8");
      setPasswordBackgroundColor("#FFECE8");
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
      localStorage.setItem("rememberMe", "false");
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

  return (
    <Box>
      <Grid container>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              flexDirection: "row",
            }}
          >
            {/* Guiter Image */}
            <Box
              sx={{
                width: "40%",
              }}
            >
              <Box
                component="img"
                src={guiter_image}
                sx={{
                  width: "100%",
                }}
              />
            </Box>
            <Box
              sx={{
                position: "relative",
                width: "60%",
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
                  top: "12%",
                  left: "20%",
                }}
              />
              <Box
                component="form"
                onSubmit={handleSignIn}
                sx={{
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                  top: "15%",
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
                  Welcome Back! Please enter your details.
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
                    width: "60%",
                    fontFamily: "Helvetica",
                    fontSize: "14px",
                    fontWeight: "300",
                    lineHeight: "22px",
                    textAlign: "left",
                    color: "#86909C",
                    mt: "1%",
                  }}
                  InputProps={{
                    style: {
                      backgroundColor: emailBackgroundColor,
                    },
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
                    mt: "3%",
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
                    width: "60%",
                    fontFamily: "Helvetica",
                    fontSize: "14px",
                    fontWeight: "300",
                    lineHeight: "22px",
                    textAlign: "left",
                    color: "#86909C",
                    mt: "1%",
                  }}
                  InputProps={{
                    style: {
                      backgroundColor: passwordBackgroundColor,
                    },
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

                {/* Remember Me and Forget Password */}
                <Box
                  sx={{
                    width: "60%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={rememberMe}
                        onChange={handleRememberMeChange}
                      />
                    }
                    label="Remember me"
                  />
                  <Link
                    to="/ForgetPassword"
                    style={{
                      fontFamily: "Helvetica",
                      fontSize: "14px",
                      fontWeight: "400",
                      lineHeight: "22px",
                      textAlign: "left",
                      color: "#4E5969",
                      textDecoration: "none",
                    }}
                  >
                    Forget password?
                  </Link>
                </Box>

                {/* Sign in Button */}
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  sx={{
                    width: "60%",
                    height: "40px",
                    position: "relative",
                    fontFamily: "Helvetica",
                    fontSize: "14px",
                    fontWeight: "700",
                    lineHeight: "22px",
                    textAlign: "center",
                    textTransform: "none",
                    backgroundColor: "#0057FE",
                    color: "#FFFFFF",
                    mt: "4%",
                  }}
                >
                  Sign in
                </Button>

                {/* As a Guest */}
                <Link
                  to="/homepage"
                  style={{
                    width: "60%",
                    height: "40px",
                    marginTop: "3%",
                  }}
                >
                  <Button
                    size="large"
                    sx={{
                      width: "100%",
                      height: "100%",
                      fontFamily: "PingFang SC",
                      fontSize: "14px",
                      fontWeight: "500",
                      lineHeight: "22px",
                      textAlign: "center",
                      textTransform: "none",
                      backgroundColor: "#FFFFFF",
                      color: "#4E5969",
                      border: "1px solid #E5E6E8",
                    }}
                  >
                    Continue as a guest
                  </Button>
                </Link>

                {/* Don't have an account and sign up */}
                <Typography
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    width: "100%",
                    fontFamily: "Helvetica",
                    fontSize: "14px",
                    fontWeight: "400",
                    lineHeight: "22px",
                    textAlign: "left",
                    color: "#86909C",
                    mt: "3%",
                  }}
                >
                  Don't have an account?
                  <Link
                    to="/signUp"
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
                    Sign up
                  </Link>
                </Typography>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Sign_in;
