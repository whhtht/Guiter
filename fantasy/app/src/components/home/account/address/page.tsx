import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { changeAddress } from "../../../../api/address/page";
import { useProfile } from "../../../../hooks/useProfile.hook/hook/page";

import {
  Box,
  Typography,
  Breadcrumbs,
  Input,
  Select,
  SelectChangeEvent,
  MenuItem,
  Button,
} from "@mui/material";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const Address: React.FC = () => {
  const [swithBox, setSwithBox] = useState<boolean>(false);
  const {
    name,
    phone,
    address,
    country,
    province,
    city,
    postalCode,
    saveAddress,
    fetchAddress,
    updateMessage,
  } = useProfile();
  const [newname, setNewname] = useState<string>("");
  const [newphone, setNewphone] = useState<string>("");
  const [newaddress, setNewaddress] = useState<string>("");
  const [newprovince, setNewProvince] = useState<string>("");
  const [newcity, setNewCity] = useState<string>("");
  const [newpostalcode, setNewPostalCode] = useState<string>("");
  const newcountry = "Canada";

  // 初始化地址信息
  useEffect(() => {
    if (saveAddress === true) {
      setNewname(name);
      setNewphone(phone);
      setNewaddress(address);
      setNewProvince(province);
      setNewCity(city);
      setNewPostalCode(postalCode);
    }
  }, [saveAddress, name, phone, address, country, province, city, postalCode]);

  // 修改地址信息
  const handleAddressChange = () => {
    setSwithBox(!swithBox);
  };
  const handleNewnameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewname(event.target.value);
  };
  const handleNewphoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value.replace(/\D/g, "");
    let formattedPhone = input;

    if (input.length > 3 && input.length <= 6) {
      formattedPhone = `${input.slice(0, 3)}-${input.slice(3)}`;
    } else if (input.length > 6) {
      formattedPhone = `${input.slice(0, 3)}-${input.slice(3, 6)}-${input.slice(
        6
      )}`;
    }

    setNewphone(formattedPhone);
  };
  const handleNewaddressChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewaddress(event.target.value);
  };
  const handleProvinceChange = (event: SelectChangeEvent) => {
    setNewProvince(event.target.value);
  };
  const handleCityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewCity(event.target.value);
  };
  const handlePostalCodeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    let value = event.target.value.toUpperCase().replace(/[^A-Z0-9]/g, ""); // 移除非字母数字字符，并将字母转为大写
    if (value.length > 3) {
      value = value.slice(0, 3) + " " + value.slice(3); // 在第三个字符后插入空格
    }
    setNewPostalCode(value);
  };

  // 保存修改后的地址信息
  const handlechangeAddress = async () => {
    try {
      await changeAddress(
        newname,
        newphone,
        newaddress,
        newcountry,
        newprovince,
        newcity,
        newpostalcode
      );
      setSwithBox(!swithBox);
      fetchAddress();
    } catch (error) {
      const errorResponse = error as { message: string };
      const errorMessage = errorResponse.message;
      throw new Error(errorMessage);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "24px",
        width: "100%",
        height: "1080px",
      }}
    >
      {/* 导航栏 */}
      <Breadcrumbs>
        <Typography
          component={Link}
          to="/account"
          sx={{
            fontFamily: "Roboto",
            fontSize: "14px",
            fontWeight: 400,
            lineHeight: "22px",
            textAlign: "left",
            color: "#76757C",
            textDecoration: "none",
            "&:hover": {
              textDecorationSkipInk: "none",
              textDecoration: "underline",
            },
          }}
        >
          My Account
        </Typography>
        <Typography
          component={Link}
          to="/account/address"
          sx={{
            fontFamily: "Roboto",
            fontSize: "14px",
            fontWeight: 400,
            lineHeight: "22px",
            textAlign: "left",
            color: "#02000C",
            textDecoration: "none",
            "&:hover": {
              textDecorationSkipInk: "none",
              textDecoration: "underline",
            },
          }}
        >
          Shipping address
        </Typography>
      </Breadcrumbs>

      {/* 标题 */}
      <Typography
        sx={{
          fontFamily: "Roboto",
          fontSize: "30px",
          fontWeight: 700,
          lineHeight: "40px",
          textAlign: "left",
          color: "#02000C",
        }}
      >
        Shipping address
      </Typography>

      {/* 地址信息 */}
      {swithBox === true ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "column",
            width: "500px",
            height: "569px",
            border: "1px solid #DDDCDE",
            borderRadius: "4px",
            padding: "24px",
          }}
        >
          {/* 信息表单 */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "18px",
            }}
          >
            {/* 修改名字 */}
            <Box>
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
                Full name
              </Typography>
              <Input
                disableUnderline
                value={newname}
                type="text"
                onChange={handleNewnameChange}
                sx={{
                  width: "452px",
                  height: "48px",
                  border: "1px solid #02000C",
                  borderRadius: "4px",
                  padding: "0px 16px",
                }}
              />
            </Box>
            {/* 修改电话 */}
            <Box>
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
                Phone number
              </Typography>
              <Input
                disableUnderline
                value={newphone}
                type="text"
                onChange={handleNewphoneChange}
                sx={{
                  width: "452px",
                  height: "48px",
                  border: "1px solid #02000C",
                  borderRadius: "4px",
                  padding: "0px 16px",
                }}
              />
            </Box>
            {/* 修改地址 */}
            <Box>
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
                Address
              </Typography>
              <Input
                disableUnderline
                value={newaddress}
                type="text"
                onChange={handleNewaddressChange}
                sx={{
                  width: "452px",
                  height: "48px",
                  border: "1px solid #02000C",
                  borderRadius: "4px",
                  padding: "0px 16px",
                }}
              />
            </Box>
            {/* 修改国家和省份 */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexDirection: "row",
                width: "452px",
                height: "74px",
              }}
            >
              {/* 修改国家 */}
              <Box>
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
                  Country
                </Typography>
                <Input
                  disabled
                  disableUnderline
                  value={newcountry}
                  sx={{
                    fontFamily: "Roboto",
                    fontSize: "16px",
                    fontWeight: 400,
                    lineHeight: "24px",
                    textAlign: "left",
                    width: "220px",
                    height: "48px",
                    border: "1px solid #02000C",
                    borderRadius: "4px",
                    padding: "0px 16px",
                    "& .MuiInputBase-input.Mui-disabled": {
                      WebkitTextFillColor: "#76757C",
                    },
                  }}
                />
              </Box>
              {/* 修改省份 */}
              <Box>
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
                  Province
                </Typography>
                <Select
                  displayEmpty
                  onChange={handleProvinceChange}
                  value={newprovince}
                  IconComponent={(props) => (
                    <KeyboardArrowDownIcon
                      {...props}
                      sx={{ fontSize: "30px" }}
                    />
                  )}
                  sx={{
                    fontFamily: "Roboto",
                    fontSize: "16px",
                    fontWeight: 400,
                    lineHeight: "24px",
                    textAlign: "left",
                    color: "#02000C",
                    width: "220px",
                    height: "48px",
                    border: "1px solid #02000C",
                    borderRadius: "4px",
                    "& .MuiSelect-icon": {
                      color: "#02000C",
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                      border: "none",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      border: "none",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      border: "none",
                    },
                  }}
                >
                  <MenuItem value="NS">NS</MenuItem>
                  <MenuItem value="NB">NB</MenuItem>
                  <MenuItem value="NL">NL</MenuItem>
                  <MenuItem value="PE">PE</MenuItem>
                </Select>
              </Box>
            </Box>
            {/* 修改城市和邮编 */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexDirection: "row",
                width: "452px",
                height: "74px",
              }}
            >
              {/* 修改城市 */}
              <Box>
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
                  City
                </Typography>
                <Input
                  disableUnderline
                  value={newcity}
                  type="text"
                  onChange={handleCityChange}
                  sx={{
                    fontFamily: "Roboto",
                    fontSize: "16px",
                    fontWeight: 400,
                    lineHeight: "24px",
                    textAlign: "left",
                    width: "220px",
                    height: "48px",
                    border: "1px solid #02000C",
                    borderRadius: "4px",
                    padding: "0px 16px",
                  }}
                />
              </Box>
              {/* 修改邮编 */}
              <Box>
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
                  Zip code
                </Typography>
                <Input
                  disableUnderline
                  value={newpostalcode}
                  type="text"
                  onChange={handlePostalCodeChange}
                  sx={{
                    fontFamily: "Roboto",
                    fontSize: "16px",
                    fontWeight: 400,
                    lineHeight: "24px",
                    textAlign: "left",
                    width: "220px",
                    height: "48px",
                    border: "1px solid #02000C",
                    borderRadius: "4px",
                    padding: "0px 16px",
                  }}
                />
              </Box>
            </Box>
          </Box>

          {/* 保存按钮 */}
          <Box sx={{ display: "flex", alignItems: "center", gap: "24px" }}>
            <Button
              onClick={handlechangeAddress}
              sx={{
                width: "137px",
                height: "48px",
                backgroundColor: "#02000C",
                border: "1px solid #02000C",
                borderRadius: "4px",
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "#02000C",
                },
              }}
            >
              <Typography
                sx={{
                  fontFamily: "Roboto",
                  fontSize: "16px",
                  fontWeight: 500,
                  lineHeight: "24px",
                  textAlign: "center",
                  color: "#FFFFFF",
                }}
              >
                Save
              </Typography>
            </Button>
            <Typography
              onClick={handleAddressChange}
              sx={{
                fontFamily: "Roboto",
                fontSize: "14px",
                fontWeight: 400,
                lineHeight: "22px",
                textAlign: "left",
                color: "#02000C",
                textDecoration: "underline",
              }}
            >
              Cancel
            </Typography>
          </Box>
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
            width: "500px",
            height: "178px",
            border: "1px solid #DDDCDE",
            borderRadius: "4px",
            padding: "24px",
          }}
        >
          {saveAddress === true ? (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "4px",
              }}
            >
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
                Your shipping address
              </Typography>
              {/* 名字 */}
              <Typography
                sx={{
                  fontFamily: "Roboto",
                  fontSize: "16px",
                  fontWeight: 400,
                  lineHeight: "24px",
                  textAlign: "left",
                  color: "#02000C",
                }}
              >
                {name}
              </Typography>
              {/* 电话 */}
              <Typography
                sx={{
                  fontFamily: "Roboto",
                  fontSize: "16px",
                  fontWeight: 400,
                  lineHeight: "24px",
                  textAlign: "left",
                  color: "#02000C",
                }}
              >
                {phone}
              </Typography>
              {/* 地址 */}
              <Typography
                sx={{
                  fontFamily: "Roboto",
                  fontSize: "16px",
                  fontWeight: 400,
                  lineHeight: "24px",
                  textAlign: "left",
                  color: "#02000C",
                }}
              >
                {address}, {city}, <br />
                {province}, {postalCode}, {country}
              </Typography>
            </Box>
          ) : (
            <Typography>{updateMessage}</Typography>
          )}

          {/* 修改按钮 */}
          <Typography
            onClick={handleAddressChange}
            sx={{
              fontFamily: "Roboto",
              fontSize: "14px",
              fontWeight: 400,
              lineHeight: "22px",
              textAlign: "right",
              color: "#02000C",
              cursor: "pointer",
              textDecoration: "underline",
              textDecorationSkipInk: "none",
            }}
          >
            change
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default Address;
