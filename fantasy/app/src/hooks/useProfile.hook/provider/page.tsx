import React, { useState, useCallback, useEffect } from "react";
import { ProfileContext } from "../context/page";
import { getAddress } from "../../../api/address/page";

export const ProfileProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const accessToken = localStorage.getItem("accessToken");
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [country, setCountry] = useState<string>("Canada");
  const [province, setProvince] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [postalCode, setPostalCode] = useState<string>("");
  const [pickName, setPickName] = useState<string>("");
  const [pickEmail, setPickEmail] = useState<string>("");
  const [pickPhone, setPickPhone] = useState<string>("");
  const [saveAddress, setSaveAddress] = useState<boolean>(false);
  const [updateMessage, setUpdateMessage] = useState<string>("");

  // 获取地址信息
  const fetchAddress = useCallback(async () => {
    try {
      const response = await getAddress();
      if (response.data.saveAddress === true) {
        const information = response.data.address[0];
        setName(information.name);
        setPhone(information.phone);
        setAddress(information.address);
        setCountry(information.country);
        setProvince(information.province);
        setCity(information.city);
        setPostalCode(information.postalCode);
        setSaveAddress(true);
      } else {
        setSaveAddress(false);
        setUpdateMessage("Update your address here");
      }
    } catch (error) {
      const errorResponse = error as { message: string };
      throw Error(errorResponse.message);
    }
  }, []);

  // 当 accessToken 变化时，重新获取地址信息
  useEffect(() => {
    if (accessToken) {
      fetchAddress();
    }
  }, [fetchAddress, accessToken]);

  const value = {
    fetchAddress,
    name,
    setName,
    phone,
    setPhone,
    address,
    setAddress,
    country,
    setCountry,
    province,
    setProvince,
    city,
    setCity,
    postalCode,
    setPostalCode,
    pickName,
    setPickName,
    pickEmail,
    setPickEmail,
    pickPhone,
    setPickPhone,
    saveAddress,
    updateMessage,
  };
  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  );
};
