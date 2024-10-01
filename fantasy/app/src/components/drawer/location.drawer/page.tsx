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
import MyLocationIcon from "@mui/icons-material/MyLocation";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import * as styles from "../../../styles/drawer.style/page";
import { useLocation } from "../../../hooks/useLocation.hook/page";

interface DrawerProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const LocationDrawer: React.FC<DrawerProps> = ({ open, setOpen }) => {
  const location = useLocation(setOpen);

  return (
    <Box>
      <Drawer
        anchor="right"
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        sx={styles.drawerstyles.drawer_page}
      >
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
          <Typography variant="h6" sx={styles.drawerstyles.roboto_20px_02000C}>
            Use your location
          </Typography>
          <Typography
            variant="body1"
            sx={styles.drawerstyles.roboto_14px_76757C}
          >
            Enter your zip code to find out if we deliver to your area.
          </Typography>
          <TextField
            variant="outlined"
            placeholder="Enter your zip code, e.g. M5G2G4"
            fullWidth
            value={location.zipCode}
            onChange={(e) => {
              const newZipCode = e.target.value;
              location.setZipCode(newZipCode);
              if (newZipCode === "") {
                location.setIsError(false);
              }
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                location.handleZipCodeSearch();
              }
            }}
            size="small"
            sx={{
              ...styles.drawerstyles.roboto_14px_drawer_input,
              "& .MuiOutlinedInput-root": {
                "& input": {
                  color:
                    location.zipCode === ""
                      ? "#76757C"
                      : location.isError
                      ? "#EB081B"
                      : "#76757C",
                },
              },
            }}
          />

          {location.error && (
            <Typography
              variant="body1"
              sx={styles.drawerstyles.roboto_14px_EB001B}
            >
              {location.error}
            </Typography>
          )}
          {location.message && (
            <Typography
              variant="body1"
              sx={styles.drawerstyles.roboto_14px_EB001B}
            >
              {location.message}
            </Typography>
          )}
          <Button
            variant="text"
            disableFocusRipple
            onClick={location.handleDialogOpen}
            startIcon={<MyLocationIcon />}
            sx={styles.drawerstyles.drawer_button}
          >
            <Typography sx={styles.drawerstyles.roboto_14px_02000C}>
              My current location
            </Typography>
          </Button>
          <Dialog
            open={location.dialogOpen}
            onClose={location.handleDialogClose}
            PaperProps={styles.drawerstyles.dialog_frame}
            slotProps={styles.drawerstyles.dialog_slotProps}
          >
            <DialogTitle sx={styles.drawerstyles.dialog_title}>
              <Box sx={styles.drawerstyles.drawer_frame}>
                <CloseIcon
                  onClick={() => {
                    location.handleDialogClose();
                  }}
                  fontSize="small"
                  sx={styles.drawerstyles.dialog_color}
                />
              </Box>
              <Typography sx={styles.drawerstyles.roboto_20px_CED1D4}>
                www.google.com wants to
              </Typography>
            </DialogTitle>
            <DialogContent sx={styles.drawerstyles.dialog_background}>
              <DialogContentText sx={styles.drawerstyles.dialog_content}>
                <LocationOnIcon
                  fontSize="medium"
                  sx={styles.drawerstyles.dialog_icon}
                />{" "}
                <Typography sx={styles.drawerstyles.roboto_16px_CED1D4}>
                  Know your location
                </Typography>
              </DialogContentText>
            </DialogContent>

            <DialogActions sx={styles.drawerstyles.dialog_backgroundcolor}>
              <Box sx={styles.drawerstyles.dialog_action}>
                <Button
                  onClick={location.handleDialogClose}
                  size="large"
                  sx={styles.drawerstyles.dialog_action_button}
                >
                  Block
                </Button>
                <Button
                  onClick={location.handleUseCurrentLocation}
                  size="large"
                  sx={styles.drawerstyles.dialog_action_button}
                >
                  Allow
                </Button>
              </Box>
            </DialogActions>
          </Dialog>
        </Box>
        <Box sx={styles.drawerstyles.drawer_save_frame}>
          <Button
            onClick={location.handleSave}
            sx={styles.drawerstyles.drawer_save_button}
          >
            <Typography sx={styles.drawerstyles.roboto_16px_FFFFFF}>
              Save
            </Typography>
          </Button>
        </Box>
      </Drawer>
    </Box>
  );
};

export default LocationDrawer;
