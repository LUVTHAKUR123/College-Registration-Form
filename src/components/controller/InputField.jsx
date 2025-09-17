import React from "react";
import { TextField, InputLabel, FormHelperText } from "@mui/material";
import { Controller } from "react-hook-form";

function InputField({ name, control, defaultValue, label, placeholder, type }) {
  return (
    <div>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field, fieldState: { error } }) => (
          <div>
            <InputLabel htmlFor={name} sx={{ textAlign: "left" }}>
              {label}
            </InputLabel>
            <TextField
              {...field}
              variant="outlined"
              type={type}
              placeholder={placeholder}
              fullWidth
              margin="dense"
            />
            {error && <FormHelperText error>{error.message}</FormHelperText>}
          </div>
        )}
      />
    </div>
  );
}

export default InputField;
