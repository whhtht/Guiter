// Header styles
const header_frame = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
  height: "78px",
  backgroundColor: "#02000C",
  padding: "16px 72px 16px 72px",
};

const navigation_frame = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
  height: "48px",
  backgroundColor: "#FFFFFF",
  borderBottom: "1px solid #DDDCDE",
  padding: "0px 62px 0px 62px",
};

const link_frame = {
  mx: "10px",
};

const left_group_frame = {
  display: "flex",
  alignItems: "center",
  height: "100%",
  margin: "0px 10px 0px 10px",
  ":hover": {
    backgroundColor: "#FFFFFF",
    borderBottom: "2px solid #02000C",
    transition: "width 0.3s ease-in-out",
  },
};

const right_group = {
  display: "flex",
  flexDirection: "row",
  height: "100%",
};

const right_group_frame = {
  display: "flex",
  alignItems: "center",
  height: "100%",
  mx: "10px",
  ":hover": {
    backgroundColor: "#FFFFFF",
    borderBottom: "2px solid #02000C",
    transition: "width 0.3s ease-in-out",
  },
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
  fontFamily: "Roboto",
  fontSize: "24px",
  fontWeight: 500,
  lineHeight: "28px",
  textAlign: "left",
  color: "#FFFFFF",
};

// Button style
const button_black = {
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

const button_white = {
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

const component_space = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
};

// Icon style
const icon_32px = {
  width: "32px",
  height: "32px",
};

const icon_22px = {
  width: "22px",
  height: "22px",
};

// Font style
const roboto_14px_02000C = {
  fontFamily: "Roboto",
  fontSize: "14px",
  fontWeight: 400,
  lineHeight: "22px",
  textAlign: "left",
  color: "#02000C",
};

const roboto_16px_FFFFFF = {
  fontFamily: "Roboto",
  fontSize: "16px",
  fontWeight: 500,
  lineHeight: "24px",
  textAlign: "left",
  color: "#FFFFFF",
};

export const headerstyles = {
  header_frame,
  navigation_frame,
  link_frame,
  autocomplete,
  logoName,
  left_group_frame,
  right_group,
  right_group_frame,
  button_black,
  button_white,
  component_space,
  roboto_14px_02000C,
  roboto_16px_FFFFFF,
  icon_22px,
  icon_32px,
};
