import { useState } from "react";
import moment from "moment";
import "moment/dist/locale/pt-br";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import styles from "./dateMonthText.module.less";

export function DateMonthText() {
  moment.locale("pt-br");
  const [selectedDate, setSelectedDate] = useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedDate(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel
          id="demo-simple-select-label"
          className={styles.selectLabel}
        >
          Referência
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedDate}
          onChange={handleChange}
          label="Referência"
          sx={{
            color: `var(--text-color)`,
            "& .MuiSvgIcon-root": {
              color: `var(--text-color)`,
            },
          }}
        >
          {[...Array(12).keys()].map((index) => (
            <MenuItem key={index} value={moment().month(index).format("MMMM")}>
              {`${moment().month(index).format("MMMM")} / ${moment()
                .month(index)
                .format("YYYY")}`}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
