import * as React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDateTimePicker } from "@mui/x-date-pickers/StaticDateTimePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDateTimePicker } from "@mui/x-date-pickers/MobileDateTimePicker";
import { DatePicker } from "@mui/x-date-pickers";

const DateTimeSelector = ({startValue, setStartValue, endValue, setEndValue}) => {
  // const [value, setValue] = React.useState(null);
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["MobileDateTimePicker"]}>
        <MobileDateTimePicker
          value={startValue}
          onChange={(newValue) => setStartValue(newValue)}
        />
        <MobileDateTimePicker
          value={endValue}
          onChange={(newValue) => setEndValue(newValue)}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
};
export default DateTimeSelector;
