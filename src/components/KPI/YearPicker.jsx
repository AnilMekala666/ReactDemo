import React from "react";
import { Box, MenuItem, Select, InputLabel, FormControl } from "@mui/material";

const YearPicker = ({ value, onChange, label, inputStyles, containerStyles }) => {
  // Generate a list of years (e.g., from 1900 to the current year)
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 125 }, (_, i) => currentYear - i);

  return (
    <Box sx={{ ...containerStyles }}>
      <FormControl fullWidth>
        {/* <InputLabel id="year-picker-label">{label}</InputLabel> */}
        <Select
          labelId="year-picker-label"
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          displayEmpty
          style={inputStyles}
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: "50vh", // Restrict the dropdown to 50% of viewport height
              },
            },
          }}
        >
          <MenuItem value="" disabled>
            Select a Year
          </MenuItem>
          {years.map((year) => (
            <MenuItem key={year} value={year}>
              {year}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default YearPicker;
