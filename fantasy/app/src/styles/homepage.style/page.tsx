// Common style
export const mainStyle = {
    width: "100%",
    padding: "16px 72px 0px 72px",
  };
  
  export const headerStyle = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    my: "15px",
  };
  
  export const linkStyle = {
    mx: "10px",
    textDecoration: "none",
  };
  
  export const titleStyle = {
    padding: "0px 72px 0px 72px",
    m: "56px 0px 26px 0px",
  };
  
  // Font style
  export const roboto_16px = {
    fontFamily: "Roboto",
    fontSize: "16px",
    fontWeight: 400,
    lineHeight: "24px",
    textAlign: "left",
    textDecoration: "none",
  };
  
  export const roboto_14px = {
    fontFamily: "Roboto",
    fontSize: "14px",
    fontWeight: 400,
    lineHeight: "22px",
    textAlign: "left",
    textDecoration: "none",
  };
  
  export const roboto_14px_center = {
    display: "inline-block",
    width: "85%",
    fontFamily: "Roboto",
    fontSize: "14px",
    fontWeight: 400,
    lineHeight: "22px",
    textAlign: "center",
    textDecoration: "none",
  };
  
  export const roboto_20px = {
    fontFamily: "Roboto",
    fontSize: "20px",
    fontWeight: 500,
    lineHeight: "28px",
    textAlign: "left",
    textDecoration: "none",
  };
  
  export const roboto_20px_center = {
    display: "inline-block",
    fontFamily: "Roboto",
    fontSize: "20px",
    fontWeight: 500,
    lineHeight: "28px",
    textAlign: "center",
    textDecoration: "none",
  };
  
  export const roboto_30px = {
    display: "inline-block",
    fontFamily: "Roboto",
    fontSize: "30px",
    fontWeight: 500,
    lineHeight: "40px",
    textAlign: "left",
    textDecoration: "none",
  };
  
  // Logo style
  export const logoName = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "120px",
    height: "40px",
    mx: "8px",
    gap: "16px",
    fontFamily: "Roboto",
    fontSize: "24px",
    fontWeight: 500,
    lineHeight: "28px",
    textAlign: "left",
    color: "#000000D9",
  };
  
  // Search bar style
  export const searchBar = {
    flexGrow: 1,
    height: "40px",
    mx: "5px",
    borderRadius: "4px",
    border: "1px solid #02000C",
    fontFamily: "Roboto",
    fontSize: "14px",
    fontWeight: 400,
    lineHeight: "22px",
    textAlign: "left",
    color: "#595959",
  };
  
  // Button style
  export const buttonStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "40px",
    color: "#02000C",
    backgroundColor: "#FFFFFF",
    textTransform: "none",
  };
  
  export const componentSpace = {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  };
  
  // Icon style
  export const iconStyle_1 = {
    width: "32px",
    height: "32px",
  };
  
  export const iconStyle_2 = {
    width: "22px",
    height: "22px",
  };
  
  // Carousel style
  export const carouselImage = {
    display: "block",
    width: "100%",
    height: "522px",
    backgroundColor: "#D9D9D9",
  };
  
  // Product list style
  export const listStyle = {
    position: "relative",
    padding: "0px 72px",
  };
  
  export const leftButton = {
    position: "absolute",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "50px",
    height: "50px",
    left: "55px",
    top: "43%",
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
  
  export const arrowBack = {
    color: "#02000C",
    fontSize: "20px",
    transform: "translateX(20%)",
  };
  
  export const rightButton = {
    position: "absolute",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "50px",
    height: "50px",
    right: "55px",
    top: "43%",
    PointerEvents:"auto",
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
  
  export const arrowForward = {
    color: "#02000C",
    fontSize: "20px",
    transform: "translateX(10%)",
  };
  
  export const carouselBox = {
    positions: "relative",
    display: "flex",
    flexdirection: "row",
    overflow: "hidden",
  };
  
  export const sliceBox = {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    width: "calc(100% / 5 - 16px)",
    mx: "8px",
  };
  
  export const productList = {
    width: "250px",
    height: "250px",
    borderRadius: "8px",
  };
  
  // Service style
  export const serviceStyle = {
    display: "flex",
    justifyContent: "center",
    width: "100%",
    padding: "0px 72px 0px 72px",
    margin: "100px 0px 90px 0px",
  };
  
  export const serviceBox = {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    textAlign: "center",
    width: "calc(100% / 4 - 80px)",
    mx: "40px",
  };
  
  export const serviceList = {
    width: "178px",
    height: "178px",
    borderRadius: "90%",
    margin: "0px 0px 10px 0px",
  };
  
  // Category style
  export const categoryStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
    padding: "0px 72px",
  };
  export const categoryLeft = {
    width: "432px",
    height: "374px",
    background: "#F0F0F0",
    borderRadius: "8px",
    flexShrink: 0,
    padding: "0px 20px 0px 50px",
    margin: "0px 20px 0px 0px",
  };
  
  export const categoryLeftBox = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
    height: "100%",
  };
  
  export const categoryLeftImage = {
    width: "197px",
    height: "310px",
    borderRadius: "8px",
  };
  
  export const categoryRight = {
    width: "100%",
    height: "374px",
  };
  
  export const categoryRightBox = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
    height: "100%",
    borderRadius: "8px",
    background: "#F0F0F0",
    padding: "18.5px 20px 18.5px 60px",
  };
  
  export const categoryRightImage = {
    width: "168px",
    height: "138px",
    borderRadius: "8px",
  };
  