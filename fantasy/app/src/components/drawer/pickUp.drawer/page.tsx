import React from "react";
import { Drawer, Box, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import * as styles from "../../../styles/drawer.style/page";

interface DrawerProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const PickUpDrawer: React.FC<DrawerProps> = ({ open, setOpen }) => {
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
              Pick up address
            </Typography>
          </Box>
          <Typography
            variant="body1"
            sx={styles.drawerstyles.roboto_14px_76757C}
          >
            Visit our store to pick up your guitar.
          </Typography>
          <Box sx={styles.drawerstyles.drawer_subtitle_margin}>
            <Typography
              variant="subtitle1"
              sx={styles.drawerstyles.roboto_16px_02000C}
            >
              Store address
            </Typography>
          </Box>
          <Typography
            variant="body1"
            sx={styles.drawerstyles.roboto_14px_02000C}
          >
            382 Yonge Street, Toronto
          </Typography>
          <Box sx={styles.drawerstyles.drawer_subtitle_margin}>
            <Typography
              variant="subtitle1"
              sx={styles.drawerstyles.roboto_16px_02000C}
            >
              Opening hours
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

export default PickUpDrawer;
