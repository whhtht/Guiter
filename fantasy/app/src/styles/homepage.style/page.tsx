// Common style
const titleStyle = {
  padding: "0px 72px 0px 72px",
  m: "56px 0px 26px 0px",
};

const imageStyle = {
  width: "100%",
  height: "100%",
};

// Font style
const roboto_16px = {
  fontFamily: "Roboto",
  fontSize: "16px",
  fontWeight: 500,
  lineHeight: "24px",
  textAlign: "left",
  color: "#FFFFFF",
};

const roboto_16px_productName = {
  display: "-webkit-box",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical",
  textOverflow: "ellipsis",
  width: "100%",
  height: "48px",
  fontFamily: "Roboto",
  fontSize: "16px",
  fontWeight: 400,
  lineHeight: "24px",
  textAlign: "left",
  textDecoration: "none",
  color: "#02000C",
  overflow: "hidden",
};

const roboto_14px = {
  fontFamily: "Roboto",
  fontSize: "14px",
  fontWeight: 400,
  lineHeight: "22px",
  textAlign: "left",
  textDecoration: "none",
};

const roboto_14px_service = {
  display: "inline-block",
  width: "85%",
  fontFamily: "Roboto",
  fontSize: "14px",
  fontWeight: 400,
  lineHeight: "22px",
  textAlign: "center",
  textDecoration: "none",
  color: "#02000C",
};

const roboto_20px = {
  fontFamily: "Roboto",
  fontSize: "20px",
  fontWeight: 500,
  lineHeight: "28px",
  textAlign: "left",
  textDecoration: "none",
};

const roboto_20px_service = {
  display: "inline-block",
  fontFamily: "Roboto",
  fontSize: "20px",
  fontWeight: 500,
  lineHeight: "28px",
  textAlign: "center",
  textDecoration: "none",
  color: "#000000D9",
};

const roboto_20px_categoryRight = {
  width: "135px",
  fontFamily: "Roboto",
  fontSize: "20px",
  fontWeight: 500,
  lineHeight: "28px",
  textAlign: "left",
  textDecoration: "none",
  color: "#02000C",
};

const roboto_30px = {
  display: "inline-block",
  fontFamily: "Roboto",
  fontSize: "30px",
  fontWeight: 700,
  lineHeight: "40px",
  textAlign: "left",
  textDecoration: "none",
};

const roboto_carousel_title = {
  fontFamily: "Roboto",
  fontSize: "54px",
  fontWeight: 700,
  lineHeight: "63.28px",
  textAlign: "left",
  color: "#02000C",
};

const roboto_carousel_subtitle = {
  fontFamily: "Roboto",
  fontSize: "24px",
  fontWeight: 400,
  lineHeight: "28.13px",
  textAlign: "left",
  color: "#02000C",
  margin: "28px 0px 40px 0px",
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

const carousel_button = {
  width: "232px",
  height: "48px",
  textDecoration: "none",
};

// Carousel style
const carouselImage = {
  positions: "relative",
  display: "block",
  width: "100%",
  height: "522px",
  backgroundColor: "#D9D9D9",
};

const carouselContent = {
  position: "absolute",
  display: "flex",
  flexDirection: "column",
  width: "440px",
  height: "126px",
  top: "110px",
  left: "82px",
};

// Product list style
const listStyle = {
  position: "relative",
  padding: "0px 72px",
};

const leftButton = {
  position: "absolute",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "50px",
  height: "50px",
  left: "48px",
  top: "35%",
  backgroundColor: "#FFFFFF",
  borderRadius: "50%",
  boxShadow: "0px 0px 8px 0px rgba(0, 0, 0, 0.2)",
  transform: "translateY(-50%)",
  zIndex: 2,
  "&:hover": {
    backgroundColor: "#FFFFFF",
  },
  "&:active": {
    backgroundColor: "#FFFFFF",
  },
};

const arrowBack = {
  color: "#02000C",
  fontSize: "20px",
  transform: "translateX(20%)",
};

const rightButton = {
  position: "absolute",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "50px",
  height: "50px",
  right: "63px",
  top: "35%",
  PointerEvents: "auto",
  backgroundColor: "#FFFFFF",
  borderRadius: "50%",
  boxShadow: "0px 0px 8px 0px rgba(0, 0, 0, 0.2)",
  transform: "translateY(-50%)",
  zIndex: 1,
  "&:hover": {
    backgroundColor: "#FFFFFF",
  },
  "&:active": {
    backgroundColor: "#FFFFFF",
  },
};

const arrowForward = {
  color: "#02000C",
  fontSize: "20px",
  transform: "translateX(10%)",
};

const carouselBox = {
  positions: "relative",
  display: "flex",
  flexdirection: "row",
  overflow: "hidden",
  py: "3px",
};

const sliceBox = {
  display: "flex",
  justifyContent: "space-between",
  flexDirection: "column",
  alignItems: "flex-start",
  width: "calc(100% / 5)",
};

const productList = {
  width: "250px",
  height: "250px",
  borderRadius: "8px",
};

// Service style
const serviceStyle = {
  display: "flex",
  justifyContent: "center",
  width: "100%",
  padding: "0px 72px 0px 72px",
  margin: "100px 0px 20px 0px",
};

const serviceBox = {
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  textAlign: "center",
  width: "calc(100% / 4 - 80px)",
  mx: "40px",
};

const serviceList = {
  width: "113px",
  height: "113px",
  borderRadius: "90%",
  margin: "0px 0px 10px 0px",
};

// Category style
const categoryStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flexDirection: "row",
  width: "100%",
  padding: "0px 72px",
};
const categoryLeft = {
  width: "432px",
  height: "374px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flexDirection: "row",
  background: "#FFEACE",
  borderRadius: "8px",
  flexShrink: 0,
  padding: "0px 20px 0px 50px",
  margin: "0px 20px 0px 0px",
};

const categoryLeftImage = {
  width: "211px",
  height: "329px",
};

const categoryRight = {
  width: "100%",
  height: "374px",
};

const categoryRightBox = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flexDirection: "row",
  width: "100%",
  height: "175px",
  borderRadius: "8px",
  background: "#FFEACE",
  padding: "0px 20px 0px 20px",
};

const categoryRightImage = {
  height: "175px",
};

export const homeStyles = {
  titleStyle,
  imageStyle,
  roboto_16px,
  roboto_16px_productName,
  roboto_14px,
  roboto_14px_service,
  roboto_20px,
  roboto_20px_service,
  roboto_20px_categoryRight,
  roboto_30px,
  roboto_carousel_title,
  roboto_carousel_subtitle,
  buttonStyle_black,
  carousel_button,
  carouselImage,
  carouselContent,
  listStyle,
  leftButton,
  arrowBack,
  rightButton,
  arrowForward,
  carouselBox,
  sliceBox,
  productList,
  serviceStyle,
  serviceBox,
  serviceList,
  categoryStyle,
  categoryLeft,
  categoryLeftImage,
  categoryRight,
  categoryRightBox,
  categoryRightImage,
};
