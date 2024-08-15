// Header styles
const headerFrame = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
  height: "78px",
  backgroundColor: "#02000C",
  padding: "16px 72px 16px 72px",
};

const navigationFrame = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
  height: "48px",
  backgroundColor: "#FFFFFF",
  padding: "16px 62px 16px 62px",
  borderBottom: "1px solid #DDDCDE",
};

const linkFrame = {
  mx: "10px",
};

const autocomplete = {
  borderRadius: "4px",
  border: "1px solid #02000C",
  fontFamily: "Roboto",
  fontSize: "14px",
  fontWeight: 400,
  lineHeight: "22px",
  textAlign: "left",
  color: "#595959",
  backgroundColor: "#FFFFFF",
};

// Logo style
const logoName = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "130px",
  height: "40px",
  mx: "8px",
  gap: "16px",
  fontFamily: "Roboto",
  fontSize: "24px",
  fontWeight: 500,
  lineHeight: "28px",
  textAlign: "left",
  color: "#FFFFFF",
  flexShrink: 0,
};

// Button style
const buttonStyle_black = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  color: "#FFFFFF",
  backgroundColor: "#02000C",
  textTransform: "none",
  textDecoration: "none",
  "&:hover": {
    backgroundColor: "#02000C",
  },
  "&.Mui-focusVisible": {
    boxShadow: "0 0 0 2px #5796dc",
  },
};

const buttonStyle_white = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: "40px",
  color: "#02000C",
  backgroundColor: "#FFFFFF",
  textTransform: "none",
  textDecoration: "none",
  "&:hover": {
    backgroundColor: "#FFFFFF",
  },
  "&.Mui-focusVisible": {
    boxShadow: "0 0 0 2px #5796dc",
  },
};

const componentSpace = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
};

// Icon style
const iconStyle_32px = {
  width: "32px",
  height: "32px",
};

const iconStyle_22px = {
  width: "22px",
  height: "22px",
};

// Drawer style
const drawerStyle = {
  positions: "relative",
  width: "420px",
  height: "100%",
  backgroundColor: "#FFFFFF",
  padding: "30px 30px 0px 30px",
};

const drawerFrame = {
  display: "flex",
  justifyContent: "flex-end",
};

// Dialog style
const dialogFrame = {
  sx: {
    position: "fixed",
    width: "410px",
    top: "-30px",
    left: "20%",
    transform: "translateX(-50%)",
    borderRadius: "8px",
  },
};

const dialogSlotProps = {
  backdrop: {
    sx: {
      backgroundColor: "transparent",
    },
  },
};

const dialogTitle = {
  p: "5px 10px 0px 30px",
  backgroundColor: "#292a2d",
};

const dialogContent = {
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  mt: "10px",
};

const dialogAction = {
  display: "flex",
  justifyContent: "flex-end",
  width: "100%",
  gap: "20px",
  p: "0px 10px 15px 0px",
};

const dialogAction_button = {
  color: "#6d7275",
  border: "0.5px solid #6d7275",
};

const dialogBackground = {
  backgroundColor: "#292a2d",
};

const dialogIcon = { mr: "20px", color: "#999fa5" };

// Font style
const roboto_14px = {
  fontFamily: "Roboto",
  fontSize: "14px",
  fontWeight: 400,
  lineHeight: "22px",
  textAlign: "left",
  textDecoration: "none",
};

const roboto_14px_drawer = {
  fontFamily: "Roboto",
  fontSize: "14px",
  fontWeight: 400,
  lineHeight: "22px",
  textAlign: "left",
  color: "#76757C",
};

const roboto_14px_drawer_black = {
  fontFamily: "Roboto",
  fontSize: "14px",
  fontWeight: 400,
  lineHeight: "22px",
  textAlign: "left",
  color: "#02000C",
};

const roboto_14px_drawer_input = {
  width: "356px",
  height: "40px",
  fontFamily: "Roboto",
  fontSize: "14px",
  fontWeight: 400,
  lineHeight: "22px",
  textAlign: "left",
  color: "#76757C",
  borderRadius: "4px",
  border: "1px solid #02000C",
  margin: "30px 0px 4px 0px",
};

const roboto_14px_drawer_button = {
  fontFamily: "Roboto",
  fontSize: "14px",
  fontWeight: 400,
  lineHeight: "22px",
  textAlign: "left",
  color: "#02000C",
  textDecoration: "underline",
  textTransform: "none",
};

const roboto_16px = {
  fontFamily: "Roboto",
  fontSize: "16px",
  fontWeight: 500,
  lineHeight: "24px",
  textAlign: "left",
  color: "#FFFFFF",
};

const roboto_16px_drawer = {
  fontFamily: "Roboto",
  fontSize: "16px",
  fontWeight: 500,
  lineHeight: "24px",
  textAlign: "left",
  color: "#02000C",
  margin: "30px 0px 4px 0px",
};

const roboto_20px_drawer = {
  fontFamily: "Roboto",
  fontSize: "20px",
  fontWeight: 500,
  lineHeight: "28px",
  textAlign: "left",
  color: "#02000C",
  margin: "10px 0px 4px 0px",
};

const roboto_dialog_title = {
  fontFamily: "Roboto",
  fontSize: "20px",
  fontWeight: "500",
  lineHeight: "28px",
  textAlign: "left",
  color: "#ced1d4",
};

const dialog_content_text = {
  fontFamily: "Roboto",
  fontSize: "16px",
  fontWeight: "500",
  lineHeight: "28px",
  textAlign: "left",
  color: "#ced1d4",
};

export const headerstyles = {
  headerFrame,
  navigationFrame,
  linkFrame,
  autocomplete,
  logoName,
  buttonStyle_black,
  buttonStyle_white,
  componentSpace,
  drawerStyle,
  drawerFrame,
  dialogFrame,
  dialogSlotProps,
  dialogTitle,
  dialogContent,
  dialogAction,
  dialogAction_button,
  dialogBackground,
  dialogIcon,
  roboto_14px,
  roboto_14px_drawer,
  roboto_14px_drawer_black,
  roboto_14px_drawer_input,
  roboto_14px_drawer_button,
  roboto_16px,
  roboto_16px_drawer,
  roboto_20px_drawer,
  roboto_dialog_title,
  dialog_content_text,
  iconStyle_22px,
  iconStyle_32px,
};
