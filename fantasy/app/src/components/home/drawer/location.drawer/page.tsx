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
import { useLocation } from "../../../../hooks/useLocation.hook/page";

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
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "420px",
            height: "100%",
            flexDirection: "column",
          }}
        >
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
              Use your location
            </Typography>
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
                width: "356px",
                height: "40px",
                fontFamily: "Roboto",
                fontSize: "14px",
                fontWeight: 400,
                lineHeight: "22px",
                textAlign: "left",
                borderRadius: "4px",
                border: "1px solid #02000C",
                margin: "30px 0px 4px 0px",
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
                sx={{
                  fontFamily: "Roboto",
                  fontSize: "14px",
                  fontWeight: 400,
                  lineHeight: "22px",
                  textAlign: "left",
                  color: "#EB001B",
                }}
              >
                {location.error}
              </Typography>
            )}
            {location.message && (
              <Typography
                sx={{
                  fontFamily: "Roboto",
                  fontSize: "14px",
                  fontWeight: 400,
                  lineHeight: "22px",
                  textAlign: "left",
                  color: "#EB001B",
                }}
              >
                {location.message}
              </Typography>
            )}
            <Button
              variant="text"
              disableFocusRipple
              onClick={location.handleDialogOpen}
              startIcon={<MyLocationIcon />}
              sx={{
                color: "#02000C",
                textDecoration: "underline",
                textTransform: "none",
              }}
            >
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
                My current location
              </Typography>
            </Button>
            <Dialog
              open={location.dialogOpen}
              onClose={location.handleDialogClose}
              PaperProps={{
                sx: {
                  position: "fixed",
                  width: "410px",
                  top: "-30px",
                  left: "20%",
                  transform: "translateX(-50%)",
                  borderRadius: "8px",
                },
              }}
              slotProps={{
                backdrop: {
                  sx: {
                    backgroundColor: "transparent",
                  },
                },
              }}
            >
              <DialogTitle
                sx={{
                  p: "5px 10px 0px 30px",
                  backgroundColor: "#292a2d",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <CloseIcon
                    onClick={() => {
                      location.handleDialogClose();
                    }}
                    fontSize="small"
                    sx={{ color: "#ced1d4" }}
                  />
                </Box>
                <Typography
                  sx={{
                    fontFamily: "Roboto",
                    fontSize: "20px",
                    fontWeight: "500",
                    lineHeight: "28px",
                    textAlign: "left",
                    color: "#CED1D4",
                  }}
                >
                  www.google.com wants to
                </Typography>
              </DialogTitle>
              <DialogContent sx={{ backgroundColor: "#292a2d" }}>
                <DialogContentText
                  sx={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    mt: "10px",
                  }}
                >
                  <LocationOnIcon
                    fontSize="medium"
                    sx={{ mr: "20px", color: "#999fa5" }}
                  />{" "}
                  <Typography
                    sx={{
                      fontFamily: "Roboto",
                      fontSize: "16px",
                      fontWeight: "500",
                      lineHeight: "28px",
                      textAlign: "left",
                      color: "#CED1D4",
                    }}
                  >
                    Know your location
                  </Typography>
                </DialogContentText>
              </DialogContent>

              <DialogActions sx={{ backgroundColor: "#292a2d" }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    width: "100%",
                    gap: "20px",
                    p: "0px 10px 15px 0px",
                  }}
                >
                  <Button
                    onClick={location.handleDialogClose}
                    size="large"
                    sx={{
                      color: "#6d7275",
                      border: "0.5px solid #6d7275",
                    }}
                  >
                    Block
                  </Button>
                  <Button
                    onClick={location.handleUseCurrentLocation}
                    size="large"
                    sx={{
                      color: "#6d7275",
                      border: "0.5px solid #6d7275",
                    }}
                  >
                    Allow
                  </Button>
                </Box>
              </DialogActions>
            </Dialog>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "113px",
              borderTop: "1px solid #DDDCDE",
            }}
          >
            <Button
              onClick={location.handleSave}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "356px",
                height: "48px",
                backgroundColor: "#02000C",
                "&:hover": {
                  backgroundColor: "#02000C",
                },
              }}
            >
              <Typography
                sx={{
                  fontFamily: "Roboto",
                  fontSize: "16px",
                  fontWeight: 400,
                  lineHeight: "24px",
                  textAlign: "left",
                  color: "#FFFFFF",
                }}
              >
                Save
              </Typography>
            </Button>
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
};

export default LocationDrawer;
