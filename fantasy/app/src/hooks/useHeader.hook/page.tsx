import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export const useHeader = () => {
  // 搜索框
  const [searchTerm, setSearchTerm] = useState("");
  const [searchHistory, setSearchHistory] = useState<string[]>(() => {
    const localStorageHistory = JSON.parse(
      localStorage.getItem("searchHistory") || "[]"
    );
    if (localStorageHistory.length === 0) {
      return [
        "Classical Guitar - Gibson X00345",
        "Classical Nelon X784534",
        "Classion 56X45634",
      ];
    }
    return localStorageHistory;
  });

  const navigate = useNavigate();
  const location = useLocation();

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      const searchPath = `/${encodeURIComponent(searchTerm)}`;
      navigate(searchPath);
      const validPaths = ["/", "/signup", "/forgetpassword"];
      if (!validPaths.includes(searchPath)) {
        navigate("/not-found", { replace: true });
        return;
      }
      navigate(searchPath);

      if (searchTerm && !searchHistory.includes(searchTerm)) {
        const updatedHistory = [searchTerm, ...searchHistory.slice(0, 8)];
        setSearchHistory(updatedHistory);
        localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
      }
    }
  };

  useEffect(() => {
    const searchQuery = decodeURIComponent(
      location.pathname.split("/${encodeURIComponent(searchTerm)}")[1] || ""
    );
    if (searchQuery && !searchHistory.includes(searchQuery)) {
      const updatedHistory = [searchQuery, ...searchHistory.slice(0, 8)];
      setSearchHistory(updatedHistory);
      localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
    }
  }, [location.pathname, searchHistory]);

  // 右侧抽屉
  const [openLocation, setOpenLocation] = React.useState(false);
  const [openPickUp, setOpenPickUp] = React.useState(false);
  const [openContactUs, setOpenContactUs] = React.useState(false);
  const [openCart, setOpenCart] = React.useState<boolean>(false);

  return {
    searchTerm,
    setSearchTerm,
    searchHistory,
    handleKeyDown,
    openLocation,
    setOpenLocation,
    openPickUp,
    setOpenPickUp,
    openContactUs,
    setOpenContactUs,
    openCart,
    setOpenCart,
  };
};
