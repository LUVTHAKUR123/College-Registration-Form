import {
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";

function RadioBtn({ control, name, defaultValue, label, gender = [] }) {
  return (
    
    <div>

      <Controller    sx={{ textAlign:"left"}}
        name={name}
        control={control}
        defaultValue={defaultValue}
        render=
        {({ field, fieldState: { error } }) => (
            <FormControl>
            {label && <FormLabel  sx={{textAlign:"left"}}>{label}</FormLabel>}
            <RadioGroup sx={{ flexDirection: "row",  textAlign:"left"}}
              {...field}
              value={field.value || ""}
              onChange={(e) => field.onChange(e.target.value)}
              >
              {gender.map((val, index) => (
                  <FormControlLabel
                  key={index}
                  value={val}
                  control={<Radio />}
                  label={val}
           />
              ))}
            </RadioGroup>
            {error && <FormHelperText style={{fontSize :"15px", color:"red"}}>{error.message}</FormHelperText>}
          </FormControl>
        )}
   />
        </div>

  );
}

export default RadioBtn;
