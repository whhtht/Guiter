import React from "react";
import { Drawer, Box, IconButton, Typography, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import StoreIcon from "@mui/icons-material/Store";

import * as styles from "../../styles/layout.style/header.style/page";

interface DrawerProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const PickUpDrawer: React.FC<DrawerProps> = ({ open, setOpen }) => {
  return (
    <Box>
      <Button
        variant="text"
        startIcon={<StoreIcon sx={styles.headerstyles.iconStyle_22px} />}
        disableFocusRipple
        sx={styles.headerstyles.buttonStyle_white}
        onClick={() => {
          setOpen(true);
        }}
      >
        <Typography
          variant="body1"
          sx={{ ...styles.headerstyles.roboto_14px, color: "#02000C" }}
        >
          Pick up at Toronto Downtown
        </Typography>
      </Button>
      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <Box sx={styles.headerstyles.drawerStyle}>
          <Box sx={styles.headerstyles.drawerFrame}>
            <IconButton
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon fontSize="large" sx={{ color: "#02000C" }} />
            </IconButton>
          </Box>
          <Typography variant="h6" sx={styles.headerstyles.roboto_20px_drawer}>
            Pick up address
          </Typography>
          <Typography
            variant="body1"
            sx={styles.headerstyles.roboto_14px_drawer}
          >
            Visit our store to pick up your guitar.
          </Typography>
          <Typography
            variant="subtitle1"
            sx={styles.headerstyles.roboto_16px_drawer}
          >
            Store address
          </Typography>
          <Typography
            variant="body1"
            sx={styles.headerstyles.roboto_14px_drawer_black}
          >
            382 Yonge Street, Toronto
          </Typography>

          <Typography
            variant="subtitle1"
            sx={styles.headerstyles.roboto_16px_drawer}
          >
            Opening hours
          </Typography>
          <Typography
            variant="body1"
            sx={styles.headerstyles.roboto_14px_drawer_black}
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
