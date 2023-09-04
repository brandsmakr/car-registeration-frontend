import React, { useState } from "react";
import { ThemeProvider } from "@mui/material";
import Utils from "../utils";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";

interface IProps {
  fieldName: string;
  setPassword: any;
  password: any;
  required: boolean;
}

const PasswordInputField: React.FC<IProps> = ({
  fieldName,
  setPassword,
  password,
  required,
}) => {
  const [passwordType, setPasswordType] = useState("password");

  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };

  return (
    <div className="mt-2 w-full mb-2">
      <p className="text-[15px] text-start mb-1 text-gray-500 w-full ">
        {fieldName}
      </p>
      <div className="flex flex-row ">
        <ThemeProvider theme={Utils.Theme.ButtonTheme}>
          <TextField
            id="password-input-with-icon-textfield"
            // label="TextField"
            type={passwordType}
            style={{ width: "100%" }}
            size="small"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required={required}
            onBlur={()=>togglePassword()}
            InputProps={{
              endAdornment: (
                <InputAdornment onClick={togglePassword} position="start" className="cursor-pointer">
                  {passwordType === "password" ? (
                    <VisibilityOffOutlinedIcon />
                  ) : (
                    <VisibilityOutlinedIcon />
                  )}
                </InputAdornment>
              ),
            }}
            variant="outlined"
          />
        </ThemeProvider>
      </div>
    </div>
  );
};

export default PasswordInputField;
