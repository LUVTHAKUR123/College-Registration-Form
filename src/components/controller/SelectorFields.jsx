import { Controller } from "react-hook-form";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
function SelectorFields({ name, label, control, defaultValue, option = [] }) {
  return (
    <>
      <div>
        <br />
        <Controller
          name={name}
          control={control}
          defaultValue={defaultValue}
          render={({ field, fieldState: { error } }) => (
            <>
              <FormControl fullWidth>
                <InputLabel htmlFor={name}>{label}</InputLabel>
                <Select {...field} style={{ textAlign: "left" }}>
                  <MenuItem value="">--select the courses---</MenuItem>
                  {option.map((val, index) => (
                    <MenuItem key={index} value={val}>
                      {" "}
                      {val}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {error && (
                <FormHelperText style={{ fontSize: "15px", color: "#d32f2f" }}>
                  {error.message}
                </FormHelperText>
              )}
            </>
          )}
        />
      </div>
    </>
  );
}
export default SelectorFields;
