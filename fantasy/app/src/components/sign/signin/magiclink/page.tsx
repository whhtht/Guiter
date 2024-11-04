import React from "react";
import { Link } from "react-router-dom";

import { Box, Typography } from "@mui/material";

const MagicLink: React.FC = () => {
  const email = localStorage.getItem("email");

  return (
    <Box>
      {/* 顶部显示 */}
      <Box
        sx={{
          borderBottom: "1px solid #DDDCDE",
          padding: "0px 72px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            height: "72px",
          }}
        >
          <Box component={Link} to="/" sx={{ textDecoration: "none" }}>
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
              Logo Name
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Magic Link 表单 */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          margin: " 82px 0px 447px 0px",
          gap: "24px",
        }}
      >
        <Typography
          sx={{
            fontFamily: "Roboto",
            fontSize: "30px",
            fontWeight: 700,
            lineHeight: "40px",
            textAlign: "center",
            color: "#02000C",
          }}
        >
          Click your magic link, <br /> and you'll be instantly signed in.
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            margin: "10px 0px",
            gap: "8px",
          }}
        >
          <Typography
            sx={{
              fontFamily: "Roboto",
              fontSize: "16px",
              fontWeight: 400,
              lineHeight: "24px",
              textAlign: "center",
              color: "#02000C",
            }}
          >
            We've sent the magic link to
          </Typography>

          {/* 返回重新输入邮箱地址 */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "row",
              gap: "8px",
            }}
          >
            <Typography
              sx={{
                fontFamily: "Roboto",
                fontSize: "16px",
                fontWeight: 700,
                lineHeight: "24px",
                textAlign: "center",
                color: "#02000C",
              }}
            >
              {email}
            </Typography>
            <Typography
              component={Link}
              to="/signin"
              sx={{
                fontFamily: "Roboto",
                fontSize: "14px",
                fontWeight: 400,
                lineHeight: "22px",
                textAlign: "center",
                color: "#02000C",
                textDecoration: "underline",
                cursor: "pointer",
              }}
            >
              Use a different email
            </Typography>
          </Box>
        </Box>

        {/* 重新获得 Magic Link */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "4px",
          }}
        >
          <Typography
            sx={{
              fontFamily: "Roboto",
              fontSize: "14px",
              fontWeight: 400,
              lineHeight: "22px",
              textAlign: "center",
              color: "#02000C",
            }}
          >
            Didn’t receive it?
          </Typography>
          <Typography
            sx={{
              fontFamily: "Roboto",
              fontSize: "14px",
              fontWeight: 400,
              lineHeight: "22px",
              textAlign: "center",
              color: "#02000C",
              textDecoration: "underline",
              cursor: "pointer",
            }}
          >
            Resend Magic Link
          </Typography>
        </Box>
      </Box>

      {/* 页脚 */}
      <Box
        sx={{
          width: "100%",
          height: "72px",
          backgroundColor: "#02000C",
        }}
      />
    </Box>
  );
};

export default MagicLink;
