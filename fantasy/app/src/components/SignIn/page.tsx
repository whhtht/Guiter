import React from "react";
import { Link } from "react-router-dom";
import { useSignIn } from "./function";

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
import guiter_image from "../../images/sign.images/guiter.jpg";

// Component
import {
  circuleStyle,
  helvetica_email,
  helvetica_title,
  helvetica_input,
  imageStyle,
  mainStyle,
  pingFangSC_subtitle,
  textStyles,
  titleStyle,
  helvetica_password,
  messageStyle,
  messageBox,
  rememberMeBox,
  helvetica_forgetPassword,
  helvetica_button,
  pingFangSC_guest,
  linkStyle,
  helvetica_noAccount,
  helvetica_sign,
} from "../../styles/signin.style/page";

const Sign_in: React.FC = () => {
  // Function
  const {
    email,
    showEmail,
    emailError,
    emailBackgroundColor,
    handeleEmailChange,
    handleFocusEmail,
    handleBlurEmail,
    handleClickShowEmail,
    handleMouseDownEmail,
    password,
    showPassword,
    passwordError,
    passwordBackgroundColor,
    handelePasswordChange,
    handleFocusPassword,
    handleBlurPassword,
    handleClearPassword,
    handleClickShowPassword,
    handleMouseDownPassword,
    handleSignIn,
    error,
    message,
    rememberMe,
    handleRememberMeChange,
  } = useSignIn();

  return (
    <Box>
      <Grid container>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Box sx={mainStyle}>
            {/* Image */}
            <Box component="img" src={guiter_image} sx={imageStyle} />
            <Box sx={textStyles}>
              {/* Circule */}
              <Box sx={circuleStyle} />

              {/* Title */}
              <Box component="form" onSubmit={handleSignIn} sx={titleStyle}>
                <Typography sx={helvetica_title}>Welcome to Fantasy</Typography>

                {/* Subtitle */}
                <Typography sx={pingFangSC_subtitle}>
                  Welcome Back! Please enter your details.
                </Typography>

                {/* Input Email */}
                <Typography sx={helvetica_email}>Email</Typography>
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
                  sx={helvetica_input}
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
                <Typography sx={helvetica_password}>Password</Typography>
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
                  sx={helvetica_input}
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
                <Box sx={messageBox}>
                  {error && (
                    <Typography
                      color="#F53F3F"
                      variant="body2"
                      sx={messageStyle}
                    >
                      {error}
                    </Typography>
                  )}
                  {message && (
                    <Typography
                      color="success"
                      variant="body2"
                      sx={messageStyle}
                    >
                      {message}
                    </Typography>
                  )}
                </Box>

                {/* Remember Me and Forget Password */}
                <Box sx={rememberMeBox}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={rememberMe}
                        onChange={handleRememberMeChange}
                      />
                    }
                    label="Remember me"
                  />
                  <Link to="/ForgetPassword" style={helvetica_forgetPassword}>
                    Forget password?
                  </Link>
                </Box>

                {/* Sign In Button */}
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  sx={helvetica_button}
                >
                  Sign in
                </Button>

                {/* As a Guest */}
                <Link to="/homepage" style={linkStyle}>
                  <Button size="large" sx={pingFangSC_guest}>
                    Continue as a guest
                  </Button>
                </Link>

                {/* Don't have an account and sign up */}
                <Typography sx={helvetica_noAccount}>
                  Don't have an account?
                  <Link to="/signUp" style={helvetica_sign}>
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
