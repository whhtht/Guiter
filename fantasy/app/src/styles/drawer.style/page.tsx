const drawer_page = {
  display: "flex",
  justifyContent: "space-between",
  flexDirection: "column",
};

const drawer_style = {
  positions: "relative",
  width: "420px",
  height: "100%",
  padding: "30px 30px 0px 30px",
};

const drawer_frame = {
  display: "flex",
  justifyContent: "flex-end",
};

const drawer_title_margin = {
  margin: "10px 0px 4px 0px",
};

const drawer_subtitle_margin = {
  margin: "30px 0px 4px 0px",
};

const drawer_iconcolor = {
  color: "#02000C",
};

const drawer_save_frame = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: "113px",
  borderTop: "1px solid #DDDCDE",
};

const drawer_save_button = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "356px",
  height: "48px",
  backgroundColor: "#02000C",
  "&:hover": {
    backgroundColor: "#02000C",
  },
};

const drawer_button = {
  color: "#02000C",
  textDecoration: "underline",
  textTransform: "none",
};

// Dialog style
const dialog_frame = {
  sx: {
    position: "fixed",
    width: "410px",
    top: "-30px",
    left: "20%",
    transform: "translateX(-50%)",
    borderRadius: "8px",
  },
};

const dialog_slotProps = {
  backdrop: {
    sx: {
      backgroundColor: "transparent",
    },
  },
};

const dialog_title = {
  p: "5px 10px 0px 30px",
  backgroundColor: "#292a2d",
};

const dialog_content = {
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  mt: "10px",
};

const dialog_action = {
  display: "flex",
  justifyContent: "flex-end",
  width: "100%",
  gap: "20px",
  p: "0px 10px 15px 0px",
};

const dialog_action_button = {
  color: "#6d7275",
  border: "0.5px solid #6d7275",
};

const dialog_background = {
  backgroundColor: "#292a2d",
};

const dialog_icon = { mr: "20px", color: "#999fa5" };

const dialog_color = {
  color: "#ced1d4",
};

const dialog_backgroundcolor = {
  backgroundColor: "#292a2d",
};

// Font Style
const roboto_14px_02000C = {
  fontFamily: "Roboto",
  fontSize: "14px",
  fontWeight: 400,
  lineHeight: "22px",
  textAlign: "left",
  color: "#02000C",
};

const roboto_14px_76757C = {
  fontFamily: "Roboto",
  fontSize: "14px",
  fontWeight: 400,
  lineHeight: "22px",
  textAlign: "left",
  color: "#76757C",
};

const roboto_14px_EB001B = {
  fontFamily: "Roboto",
  fontSize: "14px",
  fontWeight: 400,
  lineHeight: "22px",
  textAlign: "left",
  color: "#EB001B",
};

const roboto_14px_drawer_input = {
  width: "356px",
  height: "40px",
  fontFamily: "Roboto",
  fontSize: "14px",
  fontWeight: 400,
  lineHeight: "22px",
  textAlign: "left",
  borderRadius: "4px",
  border: "1px solid #02000C",
  margin: "30px 0px 4px 0px",
};

const roboto_16px_02000C = {
  fontFamily: "Roboto",
  fontSize: "16px",
  fontWeight: 500,
  lineHeight: "24px",
  textAlign: "left",
  color: "#02000C",
};

const roboto_16px_FFFFFF = {
  fontFamily: "Roboto",
  fontSize: "16px",
  fontWeight: 400,
  lineHeight: "24px",
  textAlign: "left",
  color: "#FFFFFF",
};

const roboto_16px_CED1D4 = {
  fontFamily: "Roboto",
  fontSize: "16px",
  fontWeight: "500",
  lineHeight: "28px",
  textAlign: "left",
  color: "#CED1D4",
};

const roboto_20px_02000C = {
  fontFamily: "Roboto",
  fontSize: "20px",
  fontWeight: 500,
  lineHeight: "28px",
  textAlign: "left",
  color: "#02000C",
};

const roboto_20px_CED1D4 = {
  fontFamily: "Roboto",
  fontSize: "20px",
  fontWeight: "500",
  lineHeight: "28px",
  textAlign: "left",
  color: "#CED1D4",
};

export const drawerstyles = {
  drawer_page,
  drawer_style,
  drawer_frame,
  drawer_title_margin,
  drawer_subtitle_margin,
  drawer_iconcolor,
  drawer_save_frame,
  drawer_save_button,
  drawer_button,
  dialog_frame,
  dialog_slotProps,
  dialog_title,
  dialog_content,
  dialog_action,
  dialog_action_button,
  dialog_background,
  dialog_icon,
  dialog_color,
  dialog_backgroundcolor,
  roboto_14px_02000C,
  roboto_14px_76757C,
  roboto_14px_EB001B,
  roboto_14px_drawer_input,
  roboto_16px_02000C,
  roboto_16px_FFFFFF,
  roboto_16px_CED1D4,
  roboto_20px_02000C,
  roboto_20px_CED1D4,
};
