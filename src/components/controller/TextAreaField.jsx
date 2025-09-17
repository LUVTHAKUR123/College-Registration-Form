import {
  FormControl,
  FormHelperText,
  FormLabel,
  TextareaAutosize,
} from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";

function TextAreaField({
  placeholder,
  rows,
  defaultValue,
  name,
  label,
  control,
}) {
  return (
    <>
      <div>
        <Controller
          name={name}
          control={control}
          defaultValue={defaultValue}
          render={({ field, fieldState: { error } }) => (
            <>
              <FormControl fullWidth margin="normal">
                {label && (
                  <FormLabel component="legend" sx={{ textAlign: "left" }}>
                    {label}
                  </FormLabel>
                )}
                <TextareaAutosize
                  maxRows={10}
                  aria-label="maximum height"
                  {...field}
                  minRows={rows}
                  placeholder={placeholder}
                  style={{
                    height: "70px",
                  }}
                />
                {error && (
                  <FormHelperText
                    style={{ fontSize: "15px", color: "#d32f2f" }}
                  >
                    {error.message}
                  </FormHelperText>
                )}
              </FormControl>
            </>
          )}
        />
      </div>
    </>
  );
}

export default TextAreaField;
