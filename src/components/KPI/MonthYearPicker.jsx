import React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const MonthYearPicker = ({
  value,
  onChange,
  label = "Select Month and Year",
  inputStyles = {},
  containerStyles = {},
}) => {
  return (
    <div style={containerStyles}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label={label}
          views={["year", "month"]}
          value={value}
          onChange={onChange}
          sx={inputStyles}
          renderInput={(params) => (
            <input
              {...params}
              style={{
                padding: "8px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                ...inputStyles, // Custom input styles
              }}
            />
          )}
        />
      </LocalizationProvider>
    </div>
  );
};

export default MonthYearPicker;
