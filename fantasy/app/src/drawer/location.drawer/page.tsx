import React from "react";
import {
  Drawer,
  Box,
  IconButton,
  Typography,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import * as styles from "../../styles/layout.style/header.style/page";
import { useLocation } from "../../hooks/useLocation.hook/page";

interface DrawerProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const LocationDrawer: React.FC<DrawerProps> = ({ open, setOpen }) => {
  const location = useLocation(setOpen);

  return (
    <Box>
      <Button
        variant="text"
        startIcon={
          <LocalShippingIcon sx={styles.headerstyles.iconStyle_22px} />
        }
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
          Deliver to{" "}
          {location.storedZipCode ? location.storedZipCode : " M5G 2G4 "}
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
            Use your location
          </Typography>
          <Typography
            variant="body1"
            sx={styles.headerstyles.roboto_14px_drawer}
          >
            Enter your zip code to find out if we deliver to your area.
          </Typography>
          <TextField
            variant="outlined"
            placeholder="Enter your zip code, e.g. M5G2G4"
            fullWidth
            value={location.zipCode}
            onChange={(e) => location.setZipCode(e.target.value)}
            onKeyDown={location.handleKeyPress}
            size="small"
            sx={styles.headerstyles.roboto_14px_drawer_input}
          />
          <Button
            variant="text"
            disableFocusRipple
            onClick={location.handleDialogOpen}
            startIcon={<MyLocationIcon />}
            sx={styles.headerstyles.roboto_14px_drawer_button}
          >
            My current location
          </Button>
          <Dialog
            open={location.dialogOpen}
            onClose={location.handleDialogClose}
            PaperProps={styles.headerstyles.dialogFrame}
            slotProps={styles.headerstyles.dialogSlotProps}
          >
            <DialogTitle sx={styles.headerstyles.dialogTitle}>
              <Box sx={styles.headerstyles.drawerFrame}>
                <CloseIcon
                  onClick={() => {
                    location.handleDialogClose();
                  }}
                  fontSize="small"
                  sx={{ color: "#ced1d4" }}
                />
              </Box>
              <Typography sx={styles.headerstyles.roboto_dialog_title}>
                www.google.com wants to
              </Typography>
            </DialogTitle>
            <DialogContent sx={{ backgroundColor: "#292a2d" }}>
              <DialogContentText sx={styles.headerstyles.dialogContent}>
                <LocationOnIcon
                  fontSize="medium"
                  sx={styles.headerstyles.dialogIcon}
                />{" "}
                <Typography sx={styles.headerstyles.dialog_content_text}>
                  Know your location
                </Typography>
              </DialogContentText>
            </DialogContent>

            <DialogActions sx={styles.headerstyles.dialogBackground}>
              <Box sx={styles.headerstyles.dialogAction}>
                <Button
                  onClick={location.handleDialogClose}
                  size="large"
                  sx={styles.headerstyles.dialogAction_button}
                >
                  Block
                </Button>
                <Button
                  onClick={location.handleUseCurrentLocation}
                  size="large"
                  sx={styles.headerstyles.dialogAction_button}
                >
                  Allow
                </Button>
              </Box>
            </DialogActions>
          </Dialog>
          {location.error && (
            <Typography color="error" variant="body1">
              Error: {location.error}
            </Typography>
          )}
        </Box>
      </Drawer>
    </Box>
  );
};

export default LocationDrawer;
