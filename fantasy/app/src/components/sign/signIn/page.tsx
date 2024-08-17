import React from "react";
import { Link } from "react-router-dom";
import { useSignIn } from "../../../hooks/useSignIn.hook/page";

// Mui Imports
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

// Image import
import guiter_image from "../../../images/sign.images/guiter.jpg";

// Component
import * as homepage from "../../../styles/signin.style/page";

const Sign_in: React.FC = () => {
  // Function
  const functions = useSignIn();

  return (
    <Box>
      <Grid container>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Box sx={homepage.styles.mainStyle}>
            {/* Image */}
            <Box
              component="img"
              src={guiter_image}
              sx={homepage.styles.imageStyle}
            />
            <Box sx={homepage.styles.textStyles}>
              {/* Circule */}
              <Box sx={homepage.styles.circuleStyle} />

              {/* Title */}
              <Box
                component="form"
                onSubmit={functions.handleSignIn}
                sx={homepage.styles.titleStyle}
              >
                <Typography sx={homepage.styles.helvetica_title}>
                  Welcome to Fantasy
                </Typography>

                {/* Subtitle */}
                <Typography sx={homepage.styles.pingFangSC_subtitle}>
                  Welcome Back! Please enter your details.
                </Typography>

                {/* Input Email */}
                <Typography sx={homepage.styles.helvetica_email}>
                  Email
                </Typography>
                <TextField
                  variant="outlined"
                  placeholder="Enter your email address..."
                  type={functions.showEmail ? "text" : "password"}
                  error={functions.emailError}
                  value={functions.email}
                  onChange={functions.handeleEmailChange}
                  onFocus={functions.handleFocusEmail}
                  onBlur={functions.handleBlurEmail}
                  size="small"
                  sx={homepage.styles.helvetica_input}
                  InputProps={{
                    style: {
                      backgroundColor: functions.emailBackgroundColor,
                    },
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle email visibility"
                          onClick={functions.handleClickShowEmail}
                          onMouseDown={functions.handleMouseDownEmail}
                          edge="end"
                        >
                          {functions.showEmail ? (
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
                <Typography sx={homepage.styles.helvetica_password}>
                  Password
                </Typography>
                <TextField
                  variant="outlined"
                  placeholder="Enter your password..."
                  type={functions.showPassword ? "text" : "password"}
                  error={functions.passwordError}
                  value={functions.password}
                  onChange={functions.handelePasswordChange}
                  onFocus={functions.handleFocusPassword}
                  onBlur={functions.handleBlurPassword}
                  size="small"
                  sx={homepage.styles.helvetica_input}
                  InputProps={{
                    style: {
                      backgroundColor: functions.passwordBackgroundColor,
                    },
                    endAdornment: (
                      <InputAdornment position="end">
                        {functions.password && (
                          <IconButton
                            aria-label="clear password"
                            onClick={functions.handleClearPassword}
                            edge="end"
                          >
                            <Clear fontSize="small" />
                          </IconButton>
                        )}
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={functions.handleClickShowPassword}
                          onMouseDown={functions.handleMouseDownPassword}
                          edge="end"
                        >
                          {functions.showPassword ? (
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
                <Box sx={homepage.styles.messageBox}>
                  {functions.error && (
                    <Typography
                      color="#F53F3F"
                      variant="body2"
                      sx={homepage.styles.messageStyle}
                    >
                      {functions.error}
                    </Typography>
                  )}
                  {functions.message && (
                    <Typography
                      color="success"
                      variant="body2"
                      sx={homepage.styles.messageStyle}
                    >
                      {functions.message}
                    </Typography>
                  )}
                </Box>

                {/* Remember Me and Forget Password */}
                <Box sx={homepage.styles.rememberMeBox}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={functions.rememberMe}
                        onChange={functions.handleRememberMeChange}
                      />
                    }
                    label="Remember me"
                  />
                  <Link
                    to="/ForgetPassword"
                    style={homepage.styles.helvetica_forgetPassword}
                  >
                    Forget password?
                  </Link>
                </Box>

                {/* Sign In Button */}
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  sx={homepage.styles.helvetica_button}
                >
                  Sign in
                </Button>

                {/* As a Guest */}
                <Link to="/home" style={homepage.styles.linkStyle}>
                  <Button size="large" sx={homepage.styles.pingFangSC_guest}>
                    Continue as a guest
                  </Button>
                </Link>

                {/* Don't have an account and sign up */}
                <Typography sx={homepage.styles.helvetica_noAccount}>
                  Don't have an account?
                  <Link to="/signUp" style={homepage.styles.helvetica_sign}>
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
