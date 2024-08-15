// Common styles
const mainStyle = {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    width: "100%",
    height: "100%",
  };
  
  // Font styles
  const helvetica_title = {
    fontFamily: "Helvetica",
    fontSize: "28px",
    fontWeight: "700",
    lineHeight: "36px",
    textAlign: "left",
    color: "#1D2129",
    m: "35px 0px 10px 0px",
  };
  
  const pingFangSC_subtitle = {
    fontFamily: "PingFang SC",
    fontSize: "16px",
    fontWeight: "400",
    lineHeight: "22px",
    textAlign: "left",
    color: "#4E5969",
  };
  
  const helvetica_email = {
    fontFamily: "Helvetica",
    fontSize: "14px",
    fontWeight: "700",
    lineHeight: "22px",
    textAlign: "left",
    color: "#4E5969",
    m: "45px 0px 10px 0px",
  };
  
  const helvetica_password = {
    fontFamily: "Helvetica",
    fontSize: "14px",
    fontWeight: "700",
    lineHeight: "22px",
    textAlign: "left",
    color: "#4E5969",
    m: "25px 0px 10px 0px",
  };
  
  const helvetica_input = {
    width: "432px",
    fontFamily: "Helvetica",
    fontSize: "14px",
    fontWeight: "300",
    lineHeight: "22px",
    textAlign: "left",
    color: "#86909C",
    borderRadius:"8px",
    border: "1px solid #E5E6EB",
  };
  
  const helvetica_forgetPassword = {
    fontFamily: "Helvetica",
    fontSize: "14px",
    fontWeight: "400",
    lineHeight: "22px",
    textAlign: "left" as const,
    color: "#4E5969",
    textDecoration: "none",
  };
  
  const helvetica_button = {
    width: "432px",
    height: "40px",
    position: "relative",
    fontFamily: "Helvetica",
    fontSize: "14px",
    fontWeight: "700",
    lineHeight: "22px",
    textAlign: "left",
    textTransform: "none",
    backgroundColor: "#0057FE",
    color: "#FFFFFF",
    mt: "40px",
  };
  
  const pingFangSC_guest = {
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
  };
  
  const helvetica_noAccount = {
    display: "flex",
    flexDirection: "row",
    width: "432px",
    fontFamily: "Helvetica",
    fontSize: "14px",
    fontWeight: "400",
    lineHeight: "22px",
    textAlign: "left",
    color: "#86909C",
    mt: "30px",
  };
  
  const helvetica_sign = {
    textDecoration: "none",
    fontFamily: "Helvetica",
    fontSize: "14px",
    fontWeight: "400",
    lineHeight: "22px",
    textAlign: "left" as const,
    color: "#0057FE",
    marginLeft: "10px",
  };
  
  // Image styles
  const imageStyle = {
    width: "45%",
    height: "100%",
    flexShrink: 0,
  };
  
  // Text styles
  const textStyles = {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100%",
    m: "0px 0px 0px 200px",
    p: "135px 0px 0px 0px",
  };
  
  // Circule styles
  const circuleStyle = {
    width: "32px",
    height: "32px",
    border: "6px solid #000000",
    borderRadius: "50%",
  };
  
  //Title styles
  const titleStyle = {
    position: "relative",
    display: "flex",
    flexDirection: "column",
  };
  
  // Message styles
  const messageBox = {
    width: "432px",
    height: "20px",
  };
  const messageStyle = {
    visibility: "visible",
  };
  
  // Remember me and Forget password styles
  const rememberMeBox = {
    width: "432px",
    height: "24px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  };
  
  // Link styles
  const linkStyle = {
    width: "432px",
    height: "40px",
    marginTop: "25px",
  };
  
  export const styles = {
    mainStyle,
    helvetica_title,
    pingFangSC_subtitle,
    helvetica_email,
    helvetica_password,
    helvetica_input,
    helvetica_forgetPassword,
    helvetica_button,
    pingFangSC_guest,
    helvetica_noAccount,
    helvetica_sign,
    imageStyle,
    textStyles,
    circuleStyle,
    titleStyle,
    messageBox,
    messageStyle,
    rememberMeBox,
    linkStyle,
  };