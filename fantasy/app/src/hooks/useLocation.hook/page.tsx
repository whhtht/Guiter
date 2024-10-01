import React, { useEffect, useState, useCallback } from "react";
import { AddressComponent } from "./context/page";

export const useLocation = (
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const [error, setError] = React.useState<string>("");
  const [message, setMessage] = React.useState<string>("");
  const [zipCode, setZipCode] = React.useState<string>("");
  const [storedZipCode, setStoredZipCode] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = React.useState<boolean>(false);
  const [isError, setIsError] = useState(false);

  const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;

  // 自动获取当前位置
  const handleUseCurrentLocation = useCallback(() => {
    // 从坐标获取地址
    const fetchAddressFromCoords = (latitude: number, longitude: number) => {
      fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.results && data.results.length > 0) {
            const addressComponents = data.results[0].address_components;
            const postalCode = postalCodeShow(addressComponents);

            setMessage(`Your postal code is ${postalCode}`);
            setZipCode(postalCode);
            setDialogOpen(false);
            setError("");
          } else {
            setError(
              "The zip code you entered is not valid. Please try again."
            );
            setDialogOpen(false);
            setOpen(false);
            window.location.reload();
          }
        })
        .catch((err) => {
          setError("The zip code you entered is not valid. Please try again.");
          console.error(err);
          setDialogOpen(false);
          setOpen(false);
          window.location.reload();
        });
    };

    // 获取当前位置
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchAddressFromCoords(latitude, longitude);
        },
        (err) => {
          setError("Error fetching location");
          console.error(err);
        }
      );
    } else {
      setError("The zip code you entered is not valid. Please try again.");
    }
  }, [apiKey, setOpen]);

  // 打开dialog
  const handleDialogOpen = () => {
    const getLocation = localStorage.getItem("GetLocation");
    if (!getLocation) {
      setDialogOpen(true);
    } else {
      handleUseCurrentLocation();
    }
  };

  // 关闭dialog
  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  // 从google api获取邮政编码
  const postalCodeShow = (components: AddressComponent[]) => {
    const postalCode = components.find((comp) =>
      comp.types.includes("postal_code")
    );
    return postalCode ? postalCode.long_name : "Postal code not found";
  };

  // 验证邮政编码
  const validateZipCode = (zip: string) => {
    const zipCodeRegex = /^[A-Za-z0-9\s-]{5,10}$/;
    return zipCodeRegex.test(zip);
  };

  // 从localStorage获取邮政编码
  useEffect(() => {
    const storedPostal = localStorage.getItem("PostalCode");
    if (storedPostal) {
      setStoredZipCode(storedPostal);
    }
  }, []);

  // 通过邮政编码搜索地址
  const handleZipCodeSearch = async () => {
    if (!validateZipCode(zipCode)) {
      setError("Invalid postal code");
      setIsError(true);
      return;
    }

    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${zipCode}&key=${apiKey}`
      );
      const data = await response.json();

      if (data.results && data.results.length > 0) {
        const addressComponents = data.results[0].address_components;
        const postalCode = postalCodeShow(addressComponents);

        setMessage(`Your postal code is ${postalCode}`);
        setIsError(false);
        setError("");
      } else {
        setError("The zip code you entered is not valid. Please try again.");
        setIsError(true);
      }
    } catch (err) {
      setError("The zip code you entered is not valid. Please try again.");
      console.error(err);
      setIsError(true);
    }
  };

  // 按下回车键搜索
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleZipCodeSearch();
    }
  };

  // 保存邮政编码
  const handleSave = useCallback(() => {
    if (zipCode) {
      const formattedZipCode = zipCode
        .toUpperCase()
        .replace(/(\w{3})(\w{3})/, "$1 $2");
      localStorage.setItem("GetLocation", "true");
      localStorage.setItem("PostalCode", formattedZipCode);
      setStoredZipCode(zipCode);
      setOpen(false);
      setError("");
      window.location.reload();
    } else {
      setOpen(false);
    }
  }, [zipCode, setOpen, setStoredZipCode, setError]);

  // 从 localStorage 获取并监听邮政编码变化
  useEffect(() => {
    const storedPostal = localStorage.getItem("PostalCode");
    if (storedPostal) {
      setStoredZipCode(storedPostal);
    }
    // 添加 storage 事件监听器
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === "PostalCode") {
        setStoredZipCode(event.newValue);
      }
    };
    window.addEventListener("storage", handleStorageChange);
    // 移除 storage 事件监听器
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return {
    error,
    message,
    isError,
    setIsError,
    zipCode,
    setZipCode,
    validateZipCode,
    storedZipCode,
    handleUseCurrentLocation,
    handleZipCodeSearch,
    handleKeyPress,
    handleDialogOpen,
    dialogOpen,
    handleDialogClose,
    handleSave,
  };
};
