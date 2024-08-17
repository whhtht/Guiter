import React, { useState, useEffect } from "react";
import { Autocomplete, TextField, Box } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

const SearchBarWithHover: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchHistory, setSearchHistory] = useState<string[]>(
    JSON.parse(localStorage.getItem("searchHistory") || "[]")
  );
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      const searchPath = `/${encodeURIComponent(searchTerm)}`;
      navigate(searchPath);

      // Check if navigation is successful based on path change
      if (location.pathname !== searchPath) {
        if (searchTerm && !searchHistory.includes(searchTerm)) {
          const updatedHistory = [searchTerm, ...searchHistory.slice(0, 8)];
          setSearchHistory(updatedHistory);
          localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
        }
      }
    }
  };

  useEffect(() => {
    const searchQuery = decodeURIComponent(location.pathname.split("/")[1] || "");
    if (searchQuery && !searchHistory.includes(searchQuery)) {
      const updatedHistory = [searchQuery, ...searchHistory.slice(0, 8)];
      setSearchHistory(updatedHistory);
      localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
    }
  }, [location.pathname, searchHistory]);

  return (
    <Box
      onMouseEnter={() => setShowDropdown(true)}
      onMouseLeave={() => setShowDropdown(false)}
      sx={{ position: "relative", width: "300px", margin: "20px auto" }}
    >
      <Autocomplete
        freeSolo
        options={showDropdown ? searchHistory : []}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="Find guitars you love..."
            variant="outlined"
            size="small"
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
            value={searchTerm}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "4px",
                backgroundColor: "#FFFFFF",
                borderColor: "#ccc",
                "&:hover fieldset": {
                  borderColor: "#6200EE",
                },
              },
            }}
          />
        )}
        sx={{
          "& .MuiAutocomplete-listbox": {
            display: showDropdown ? "block" : "none",
            position: "absolute",
            top: "40px",
            left: 0,
            width: "100%",
            backgroundColor: "#FFFFFF",
            border: "1px solid #ccc",
            borderRadius: "4px",
            zIndex: 1,
          },
        }}
      />
    </Box>
  );
};

export default SearchBarWithHover;
