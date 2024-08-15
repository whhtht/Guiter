import React from "react";
import { Drawer, Box, IconButton, Typography, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PhoneEnabledIcon from "@mui/icons-material/PhoneEnabled";

import * as styles from "../../styles/layout.style/header.style/page";

interface DrawerProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ContactUsDrawer: React.FC<DrawerProps> = ({ open, setOpen }) => {
  return (
    <Box>
      <Button
        variant="text"
        startIcon={<PhoneEnabledIcon sx={styles.headerstyles.iconStyle_22px} />}
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
          Contact Us
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
            Contact us
          </Typography>
          <Typography
            variant="body1"
            sx={styles.headerstyles.roboto_14px_drawer}
          >
            Feel free to contact us if you need more information about our
            guitars or any of our services.
          </Typography>
          <Typography
            variant="subtitle1"
            sx={styles.headerstyles.roboto_16px_drawer}
          >
            Contact number
          </Typography>
          <Typography
            variant="body1"
            sx={styles.headerstyles.roboto_14px_drawer_black}
          >
            647-555-325
          </Typography>

          <Typography
            variant="subtitle1"
            sx={styles.headerstyles.roboto_16px_drawer}
          >
            Email
          </Typography>
          <Typography
            variant="body1"
            sx={styles.headerstyles.roboto_14px_drawer_black}
          >
            guitar123@guitar.com
          </Typography>
          <Typography
            variant="subtitle1"
            sx={styles.headerstyles.roboto_16px_drawer}
          >
            Available hours
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

export default ContactUsDrawer;
