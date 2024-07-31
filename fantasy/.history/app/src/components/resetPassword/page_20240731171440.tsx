// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { checkEmail } from "../../api/auth/page";
// import {
//   Box,
//   Grid,
//   Typography,
//   Button,
//   TextField,
// } from "@mui/material";

// import guiter_image from "../image/guiter.jpg";

// const Forget_Password: React.FC = () => {
//   // Email Function
//   const [email, setEmail] = useState<string>("");
//   const [emailError, setEmailError] = useState<boolean>(false);
//   const [emailBackgroundColor, setEmailBackgroundColor] = useState<string>("");

//   // Message Function
//   const [error, setError] = useState<string>("");
//   const [message, setMessage] = useState<string>("");
//   const navigate = useNavigate();
//   const handleSignIn = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!email) {
//       setError("Please enter your email address.");
//       setEmailError(true);
//       setEmailBackgroundColor("#FFECE8");
//       return;
//     } else {
//       setError("");
//       setEmailError(false);
//       setEmailBackgroundColor("");
//     }
//     try {
//       await checkEmail(email);
//       setMessage("Sign in successful");
//       setError("");
//       navigate("/forgetpassword/resetpassword", { state: { email } });
//     } catch (error) {
//       setError("Invalid email.");
//       setMessage("");
//       setEmailError(true);
//       setEmailBackgroundColor("#FFECE8");
//     }
//   };

//   // Email Error Function
//   const handeleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const inputemail = event.target.value;
//     setEmail(inputemail);
//     if (!inputemail) {
//       setEmailError(false);
//       setEmailBackgroundColor("");
//     }
//   };
//   const handleFocusEmail = () => {
//     if (emailError) {
//       setEmailBackgroundColor("#FDCDC5");
//     }
//   };
//   const handleBlurEmail = () => {
//     if (emailError) {
//       setEmailBackgroundColor("#FFECE8");
//     }
//   };

//   return (
//     <Box>
//       <Grid
//         container
//         sx={{
//           width: "100%",
//           height: "100%",
//           position: "relative",
//         }}
//       >
//         <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
//           {/* Guiter Image */}
//           <Box
//             component="img"
//             src={guiter_image}
//             sx={{
//               width: "100%",
//               height: "100%",
//             }}
//           />
//         </Grid>
//         <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
//           {/* Welcome Text */}
//           <Box
//             sx={{
//               position: "relative",
//               width: "32px",
//               height: "32px",
//               border: "6px solid #000000",
//               borderRadius: "50%",
//               top: "17%",
//               left: "20%",
//             }}
//           />
//           <Box
//             component="form"
//             onSubmit={handleSignIn}
//             sx={{
//               position: "relative",
//               display: "flex",
//               flexDirection: "column",
//               top: "20%",
//               left: "20%",
//             }}
//           >
//             <Typography
//               sx={{
//                 fontFamily: "Helvetica",
//                 fontSize: "28px",
//                 fontWeight: "700",
//                 lineHeight: "36px",
//                 textAlign: "left",
//                 color: "#1D2129",
//                 my: "1%",
//               }}
//             >
//               Welcome to Fantasy
//             </Typography>
//             <Typography
//               sx={{
//                 fontFamily: "PingFang SC",
//                 fontSize: "16px",
//                 fontWeight: "400",
//                 lineHeight: "22px",
//                 textAlign: "left",
//                 color: "#4E5969",
//               }}
//             >
//               Welcome Back! Please enter your email.
//             </Typography>

//             {/* Input Email */}
//             <Typography
//               sx={{
//                 fontFamily: "Helvetica",
//                 fontSize: "14px",
//                 fontWeight: "700",
//                 lineHeight: "22px",
//                 textAlign: "left",
//                 color: "#4E5969",
//                 mt: "7%",
//               }}
//             >
//               Email
//             </Typography>
//             <TextField
//               variant="outlined"
//               placeholder="Enter your email address..."
//               type="email"
//               error={emailError}
//               value={email}
//               onChange={handeleEmailChange}
//               onFocus={handleFocusEmail}
//               onBlur={handleBlurEmail}
//               size="small"
//               sx={{
//                 width: "80%",
//                 fontFamily: "Helvetica",
//                 fontSize: "14px",
//                 fontWeight: "300",
//                 lineHeight: "22px",
//                 textAlign: "left",
//                 color: "#86909C",
//                 backgroundColor: emailBackgroundColor,
//                 mt: "1%",
//               }}
//               InputProps={{
//                 style: {
//                   backgroundColor: emailBackgroundColor,
//                 },
//               }}
//             />

//             {/* Message */}
//             <Box
//               sx={{
//                 height: "15px",
//               }}
//             >
//               {error && (
//                 <Typography
//                   color="#F53F3F"
//                   variant="body2"
//                   sx={{ visibility: "visible" }}
//                 >
//                   {error}
//                 </Typography>
//               )}
//               {message && (
//                 <Typography
//                   color="success"
//                   variant="body2"
//                   sx={{ visibility: "visible" }}
//                 >
//                   {message}
//                 </Typography>
//               )}
//             </Box>

//             {/* Sign in Button */}
//             <Button
//               type="submit"
//               variant="contained"
//               size="large"
//               sx={{
//                 width: "80%",
//                 height: "40px",
//                 position: "relative",
//                 fontFamily: "Helvetica",
//                 fontSize: "14px",
//                 fontWeight: "700",
//                 lineHeight: "22px",
//                 textAlign: "center",
//                 textTransform: "none",
//                 backgroundColor: "#0057FE",
//                 color: "#FFFFFF",
//                 mt: "6%",
//               }}
//             >
//               Sign in
//             </Button>

//             {/* Don't have an account and sign up */}
//             <Typography
//               sx={{
//                 display: "flex",
//                 flexDirection: "row",
//                 width: "100%",
//                 fontFamily: "Helvetica",
//                 fontSize: "14px",
//                 fontWeight: "400",
//                 lineHeight: "22px",
//                 textAlign: "left",
//                 color: "#86909C",
//                 mt: "5%",
//               }}
//             >
//               Remember your password?
//               <Link
//                 to="/"
//                 style={{
//                   textDecoration: "none",
//                   fontFamily: "Helvetica",
//                   fontSize: "14px",
//                   fontWeight: "400",
//                   lineHeight: "22px",
//                   textAlign: "left",
//                   color: "#0057FE",
//                   marginLeft: "1%",
//                 }}
//               >
//                 Sign in
//               </Link>
//             </Typography>
//           </Box>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// };

// export default Forget_Password;
