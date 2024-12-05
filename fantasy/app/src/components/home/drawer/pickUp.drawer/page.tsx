import React from "react";
import { Drawer, Box, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface DrawerProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const PickUpDrawer: React.FC<DrawerProps> = ({ open, setOpen }) => {
  return (
    <Box>
      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            positions: "relative",
            width: "420px",
            height: "100%",
            padding: "30px 30px 0px 30px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
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
              sx={{
                fontFamily: "Roboto",
                fontSize: "20px",
                fontWeight: 500,
                lineHeight: "28px",
                textAlign: "left",
                color: "#02000C",
              }}
            >
              Pick up address
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
            Visit our store to pick up your guitar.
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
              Store address
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
            382 Yonge Street, Toronto
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
              Opening hours
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

export default PickUpDrawer;
