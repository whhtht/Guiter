import React, { useEffect, useState, useCallback } from "react";

interface AddressComponent {
  long_name: string;
  short_name: string;
  types: string[];
}

export const useLocation = (
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const [error, setError] = React.useState<string>("");
  const [zipCode, setZipCode] = React.useState<string>("");
  const [storedZipCode, setStoredZipCode] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = React.useState<boolean>(false);

  const apiKey = "AIzaSyD1Dj4dgfme8L4PXpePOnpsIUprpmjA3QI";

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
            setError("");
            setDialogOpen(false);
            setOpen(false);

            localStorage.setItem("PostalCode", postalCode);
            setStoredZipCode(postalCode);
          } else {
            setError("No address found for these coordinates.");
            setDialogOpen(false);
            setOpen(false);
          }
        })
        .catch((err) => {
          setError("Error occurred while fetching address");
          console.error(err);
          setDialogOpen(false);
          setOpen(false);
        });
    };

    // 获取当前位置
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchAddressFromCoords(latitude, longitude);
          localStorage.setItem("GetLocation", "true");
        },
        (err) => {
          setError("Error fetching location");
          console.error(err);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  }, [setOpen]);

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
        setError("");

        localStorage.setItem("PostalCode", postalCode);
        setStoredZipCode(postalCode);
        setOpen(false);
      } else {
        setError("No address found for this postal code.");
      }
    } catch (err) {
      setError("Error occurred while fetching address");
      console.error(err);
    }
  };

  // 按下回车键搜索
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleZipCodeSearch();
    }
  };

  return {
    error,
    zipCode,
    setZipCode,
    storedZipCode,
    handleUseCurrentLocation,
    handleZipCodeSearch,
    handleKeyPress,
    handleDialogOpen,
    dialogOpen,
    handleDialogClose,
  };
};
