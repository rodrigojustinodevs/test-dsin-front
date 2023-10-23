import Box from "@mui/material/Box";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import React from "react";

const InputGeneric = React.forwardRef(
    (props: TextFieldProps, ref: TextFieldProps["ref"]) => {
        return (
            <Box component="div">
                <TextField
                    sx={{ mb: 2 }}
                    className="inputGenericGlobalStyle"
                    variant="outlined"
                    {...props}
                    ref={ref}
                />
            </Box>
        );
    }
);
export default InputGeneric;
