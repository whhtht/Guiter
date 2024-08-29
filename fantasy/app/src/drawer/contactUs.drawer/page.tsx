import React from "react";
import { Drawer, Box, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import * as styles from "../../styles/drawer.style/page";

interface DrawerProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ContactUsDrawer: React.FC<DrawerProps> = ({ open, setOpen }) => {
  return (
    <Box>
      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <Box sx={styles.drawerstyles.drawer_style}>
          <Box sx={styles.drawerstyles.drawer_frame}>
            <IconButton
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon
                fontSize="large"
                sx={styles.drawerstyles.drawer_iconcolor}
              />
            </IconButton>
          </Box>
          <Box sx={styles.drawerstyles.drawer_title_margin}>
            <Typography
              variant="h6"
              sx={styles.drawerstyles.roboto_20px_02000C}
            >
              Contact us
            </Typography>
          </Box>
          <Typography
            variant="body1"
            sx={styles.drawerstyles.roboto_14px_76757C}
          >
            Feel free to contact us if you need more information about our
            guitars or any of our services.
          </Typography>
          <Box sx={styles.drawerstyles.drawer_subtitle_margin}>
            <Typography
              variant="subtitle1"
              sx={styles.drawerstyles.roboto_16px_02000C}
            >
              Contact number
            </Typography>
          </Box>
          <Typography
            variant="body1"
            sx={styles.drawerstyles.roboto_14px_02000C}
          >
            647-555-325
          </Typography>
          <Box sx={styles.drawerstyles.drawer_subtitle_margin}>
            <Typography
              variant="subtitle1"
              sx={styles.drawerstyles.roboto_16px_02000C}
            >
              Email
            </Typography>
          </Box>
          <Typography
            variant="body1"
            sx={styles.drawerstyles.roboto_14px_02000C}
          >
            guitar123@guitar.com
          </Typography>
          <Box sx={styles.drawerstyles.drawer_subtitle_margin}>
            <Typography
              variant="subtitle1"
              sx={styles.drawerstyles.roboto_16px_02000C}
            >
              Available hours
            </Typography>
          </Box>
          <Typography
            variant="body1"
            sx={styles.drawerstyles.roboto_14px_02000C}
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
