import React from "react";
import { Link } from "react-router-dom";
import { useSignUp } from "../../../hooks/useSignUp.hook/page";
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

import guiter_image from "../../../images/sign.images/guiter.jpg";

import {
  mainStyle,
  imageStyle,
  textStyles,
  circuleStyle,
  titleStyle,
  helvetica_title,
  helvetica_subtitle,
  helvetica_email,
  helvetica_input,
  helvetica_password,
  messageStyle,
  messageBox,
  rememberMeBox,
  rememberCheckbox,
  pingFangSC_guest,
  linkStyle,
  helvetica_button,
  helvetica_sign,
  helvetica_haveAccount,
} from "../../../styles/signup.style/page";

const SignUp: React.FC = () => {
  // Function
  const {
    handleSignUp,
    email,
    showEmail,
    emailError,
    handeleEmailChange,
    handleFocusEmail,
    handleBlurEmail,
    emailBackgroundColor,
    handleClickShowEmail,
    handleMouseDownEmail,
    password,
    showPassword,
    passwordError,
    handelePasswordChange,
    handleFocusPassword,
    handleBlurPassword,
    passwordBackgroundColor,
    handleClickShowPassword,
    handleMouseDownPassword,
    handleClearPassword,
    confirmPassword,
    showConfirmPassword,
    confirmPasswordError,
    handleConfirmPasswordChange,
    handleFocusConfirmPassword,
    handleBlurConfirmPassword,
    confirmPasswordBackgroundColor,
    handleClickShowConfirmPassword,
    handleMouseDownConfirmPassword,
    handleClearConfirmPassword,
    error,
    message,
    rememberMe,
    handleRememberMeChange,
  } = useSignUp();

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
              <Box component="form" onSubmit={handleSignUp} sx={titleStyle}>
                <Typography sx={helvetica_title}>Welcome to Fantasy</Typography>

                {/* Subtitle */}
                <Typography sx={helvetica_subtitle}>
                  Register your account
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

                {/* Confirm Password */}
                <Typography sx={helvetica_password}>
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
                  sx={helvetica_input}
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

                {/* Remember Me */}
                <Box sx={rememberMeBox}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={rememberMe}
                        onChange={handleRememberMeChange}
                        sx={rememberCheckbox}
                      />
                    }
                    label="Remember me"
                  />
                </Box>

                {/* Sign in Button */}
                <Button type="submit" variant="contained" sx={helvetica_button}>
                  Sign up
                </Button>

                {/* As a Guest */}
                <Link to="/" style={linkStyle}>
                  <Button sx={pingFangSC_guest}>Continue as a guest</Button>
                </Link>

                {/* Already have an account and sign in */}
                <Typography sx={helvetica_haveAccount}>
                  Already have an account?
                  <Link to="/signin" style={helvetica_sign}>
                    Sign In
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

export default SignUp;
