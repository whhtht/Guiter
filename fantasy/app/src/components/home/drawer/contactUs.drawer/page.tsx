import React from "react";
import { Drawer, Box, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface DrawerProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ContactUsDrawer: React.FC<DrawerProps> = ({ open, setOpen }) => {
  return (
    <Box>
      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            positions: "relative",
            width: "420px",
            padding: "30px 30px 0px 30px",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <IconButton
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon fontSize="large" sx={{ color: "#02000C" }} />
            </IconButton>
          </Box>
          <Box sx={{ margin: "10px 0px 4px 0px" }}>
            <Typography
              variant="h6"
              sx={{
                fontFamily: "Roboto",
                fontSize: "20px",
                fontWeight: 500,
                lineHeight: "28px",
                textAlign: "left",
                color: "#02000C",
              }}
            >
              Contact us
            </Typography>
          </Box>
          <Typography
            sx={{
              fontFamily: "Roboto",
              fontSize: "14px",
              fontWeight: 400,
              lineHeight: "22px",
              textAlign: "left",
              color: "#76757C",
            }}
          >
            Feel free to contact us if you need more information about our
            guitars or any of our services.
          </Typography>
          <Box sx={{ margin: "30px 0px 4px 0px" }}>
            <Typography
              sx={{
                fontFamily: "Roboto",
                fontSize: "16px",
                fontWeight: 500,
                lineHeight: "24px",
                textAlign: "left",
                color: "#02000C",
              }}
            >
              Contact number
            </Typography>
          </Box>
          <Typography
            sx={{
              fontFamily: "Roboto",
              fontSize: "14px",
              fontWeight: 400,
              lineHeight: "22px",
              textAlign: "left",
              color: "#02000C",
            }}
          >
            647-555-325
          </Typography>
          <Box sx={{ margin: "30px 0px 4px 0px" }}>
            <Typography
              sx={{
                fontFamily: "Roboto",
                fontSize: "16px",
                fontWeight: 500,
                lineHeight: "24px",
                textAlign: "left",
                color: "#02000C",
              }}
            >
              Email
            </Typography>
          </Box>
          <Typography
            sx={{
              fontFamily: "Roboto",
              fontSize: "14px",
              fontWeight: 400,
              lineHeight: "22px",
              textAlign: "left",
              color: "#02000C",
            }}
          >
            guitar123@guitar.com
          </Typography>
          <Box sx={{ margin: "30px 0px 4px 0px" }}>
            <Typography
              sx={{
                fontFamily: "Roboto",
                fontSize: "16px",
                fontWeight: 500,
                lineHeight: "24px",
                textAlign: "left",
                color: "#02000C",
              }}
            >
              Available hours
            </Typography>
          </Box>
          <Typography
            sx={{
              fontFamily: "Roboto",
              fontSize: "14px",
              fontWeight: 400,
              lineHeight: "22px",
              textAlign: "left",
              color: "#02000C",
            }}
          >
            Mon - Fri, 10:00 am - 10:00 pm (EST)
            <br />
            Sat - Sun, 10:00 am - 6:00pm (EST)
          </Typography>
        </Box>
      </Drawer>
    </Box>
  );
};

export default ContactUsDrawer;
