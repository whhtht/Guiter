import React from "react";
import { Box, Grid, } from "@mui/material";
import * as styles from "../../../styles/layout.style/footer.style/page";

const Footer: React.FC = () => {
    return (
        // Part 8
        <Box>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Box sx={styles.footerstyles.footerStyle} />
        </Grid>
        </Box>
    );
};

export default Footer;