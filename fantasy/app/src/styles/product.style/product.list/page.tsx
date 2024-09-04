// Frame
const list_frame = {
  padding: "16px 72px 16px 72px",
};

const main_frame = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  width: "100%",
  gap: "45px",
  margin: "48px 0px 0px 0px",
};

const left_frame = {
  display: "flex",
  flexDirection: "column",
  width: "310px",
  height: "100%",
  flexShrink: 0,
};

const right_frame = {
  display: "flex",
  flexDirection: "column",
  gap: "20px",
};

const right_width = {
  width: "100%",
};

const filter_frame = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flexDirection: "row",
  width: "100%",
  padding: "20px 0px 20px 0px",
};

// Border
const border_bottom = {
  borderBottom: "1px solid #DDDCDE",
};

// Button
const button_frame = { textTransform: "none" };

// Icon
const expandmore_icon = {
  color: "#000000D9",
  transition: "transform 0.3s",
};

const expandmore_icon_02000C = {
  transition: "transform 0.3s ease-in-out",
  color: "#02000C",
};

// Category
const category_frame = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flexDirection: "row",
  width: "100%",
  padding: "0px 0px 20px 0px",
};

const category_list = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  flexDirection: "column",
  width: "100%",
  margin: "0px 0px 15px 0px",
  padding: "0px 0px 0px 0px",
};

const category_item = {
  width: "100%",
  padding: "5px 0px 5px 0px",
  "&.Mui-selected": {
    color: "#02000C",
    backgroundColor: "transparent",
  },
  "&.Mui-selected:hover": {
    color: "#02000C",
    backgroundColor: "transparent",
  },
  "&:hover": {
    color: "#02000C",
    backgroundColor: "transparent",
  },
};

const category_text = {
  fontFamily: "Roboto",
  fontSize: "16px",
  lineHeight: "24px",
  textAlign: "left",
};

// Form
const form_frame = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  flexDirection: "column",
  width: "100%",
  margin: "0px 0px 20px 0px",
};

const form_label = {
  "&.Mui-checked": {
    color: "#02000C",
  },
};

// Price
const price_form = {
  display: "flex",
  flexDirection: "column",
  margin: "0px 0px 20px 0px",
};

const price_input = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flexDirection: "row",
};

const price_text = {
  "& .MuiOutlinedInput-root": {
    fontFamily: "Roboto",
    fontSize: "14px",
    fontWeight: 400,
    lineHeight: "22px",
    textAlign: "left",
    color: "#76757C",
    width: "132px",
    height: "40px",
    border: "1px solid #02000C",
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "transparent",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "transparent",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "transparent",
    },
    "&.Mui-error .MuiOutlinedInput-notchedOutline": {
      border: "1px solid #FFFFFF",
    },
  },
};

const price_line = {
  width: "16px",
  height: "1px",
  backgroundColor: "#02000C",
};

const price_error_frame = {
  position: "relative",
  width: "100%",
};

const error_min = {
  position: "absolute",
  left: "0px",
  width: "125px",
  height: "66px",
};

const error_max = {
  position: "absolute",
  right: "5px",
  width: "125px",
  height: "66px",
};

// Sort
const sort_frame = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flexDirection: "row",
  width: "100%",
  margin: "0px 0px 20px 0px",
};

const menu_frame = {
  paper: {
    sx: {
      width: "258px",
      Height: "152px",
    },
  },
};

// Product List
const product_frame = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "20px",
};

const product_space = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "308px",
  height: "308px",
  overflow: "hidden",
  borderRadius: "8px",
  margin: "0px 0px 10px 0px",
};

const product_image = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
};

const product_text = {
  display: "inline-flex",
  flexDirection: "column",
  gap: "5px",
};

// Pagination
const pagination_frame = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  margin: "80px 0px 0px 0px",
};

const pagination_previous = {
  borderRadius: "50%",
  width: "56px",
  height: "56px",
  border: "1px solid #DDDCDE",
};

const pagination_next = {
  borderRadius: "0%",
  margin: "0 8px",
  "&.Mui-selected": {
    backgroundColor: "#FFFFFF",
    borderBottom: "2px solid #02000C",
  },
};

// Font
const roboto_14px_EB001B = {
  fontFamily: "Roboto",
  fontSize: "14px",
  fontWeight: 400,
  lineHeight: "22px",
  textAlign: "left",
  color: "#EB001B",
};

const roboto_14px_76757C = {
  fontFamily: "Roboto",
  fontSize: "14px",
  fontWeight: 400,
  lineHeight: "22px",
  textAlign: "left",
  color: "#76757C",
};

const roboto_16px_02000C = {
  fontFamily: "Roboto",
  fontSize: "16px",
  fontWeight: 400,
  lineHeight: "24px",
  textAlign: "left",
  color: "#02000C",
};

const roboto_20px_02000C = {
  fontFamily: "Roboto",
  fontSize: "20px",
  fontWeight: 500,
  lineHeight: "28px",
  textAlign: "left",
  color: "#02000C",
};

const roboto_20px_000000D9 = {
  fontFamily: "Roboto",
  fontSize: "20px",
  fontWeight: 500,
  lineHeight: "28px",
  textAlign: "left",
  color: "#000000D9",
};

const roboto_30px_02000C = {
  fontFamily: "Roboto",
  fontSize: "30px",
  fontWeight: 700,
  lineHeight: "40px",
  textAlign: "left",
  color: "#02000C",
};

export const list_styles = {
  list_frame,
  main_frame,
  left_frame,
  right_frame,
  right_width,
  border_bottom,
  button_frame,
  expandmore_icon,
  expandmore_icon_02000C,
  category_frame,
  category_list,
  category_item,
  category_text,
  filter_frame,
  form_frame,
  form_label,
  price_form,
  price_input,
  price_text,
  price_line,
  price_error_frame,
  error_min,
  error_max,
  sort_frame,
  menu_frame,
  product_frame,
  product_space,
  product_image,
  product_text,
  pagination_frame,
  pagination_previous,
  pagination_next,
  roboto_14px_EB001B,
  roboto_14px_76757C,
  roboto_16px_02000C,
  roboto_20px_02000C,
  roboto_20px_000000D9,
  roboto_30px_02000C,
};
