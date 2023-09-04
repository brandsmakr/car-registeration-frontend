import React, { useState } from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Link,
  Box,
  Typography,
  Container,
  ThemeProvider,
  createTheme,
  Grid,
  Alert,
} from "@mui/material";
import { LockOutlined } from "@mui/icons-material";
import Utils from "../../utils";
import { PreLoaderComponent2, WarningAlert } from "../../components";
import Services from "../../services";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Logo from "../../logo.svg";

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {/* {"© Copyright "} */}
      <Link color="inherit" href="car-registeration-system.com" target="_blank">
        car-registeration-system.com
      </Link>{" "}
      {/* {new Date().getFullYear()} */}
      {/* {"."} */}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme({});

const Verfication = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const [errors, setErrors] = useState({
    email: "",
    verifyEmail: "",
  });
  const [email, setEmail] = useState<string>("");
  const [verificationCode, setVerificationCode] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleVerification = () => {
    setIsLoading(true);
    const data = {
      email: email,
      verification_code: verificationCode,
    };
    Services.Auth.VerifyEmail(data)
      .then((res: any) => {
        setIsLoading(false);
          if (res.success) {
            return navigate("/signin");
          } else {
            setErrorMessage(res.message)
            Swal.fire("error", "unauthorized");
            return navigate("/", { replace: true });
          }
      })
      .catch((error: any) => {
        setIsLoading(false);
        // console.log("error", error)
        if (error.response &&
          error.response.data &&
          error.response.data.message) {
          Swal.fire({
            icon: "error",
            title: error.response.data.message,
          });
          setErrorMessage(error.response.data.message);
        }
      });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

     if(!email)
    {
      document.getElementById("email")?.focus()
    } else if(!email)
    {
      document.getElementById("password")?.focus()
    }

    let noOfErrors = 0;
    let firstKey = "";

    Object.values(errors).map((objValue) => {
      if (objValue !== "" && objValue !== null) {
        ++noOfErrors;
      }
    });

    for (let i = 0; i <= Object.keys(errors).length - 1; i++) {
      if (
        Object.values(errors)[i] !== "" &&
        Object.values(errors)[i] !== null
      ) {
        firstKey = Object.keys(errors)[i];
        break;
      }
    }

    if (noOfErrors > 0) {
      setIsLoading(false);
      let getFirstErrorElement: HTMLElement | null =
        document.getElementById(firstKey);
      if (getFirstErrorElement !== null) {
        return getFirstErrorElement.focus();
      }
    } else {
      handleVerification();
    }
  };

  return (
    <>
      {isLoading && <PreLoaderComponent2 />}
      <div className="flex justify-center items-center h-screen	">
        <ThemeProvider theme={defaultTheme}>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div className="flex gap-2 items-center py-3 pb-6">
                <div className="bg-[var(--main-color)] text-white rounded-full border shadow-sm hover:shadow-md  fill-white w-full h-full p-1">
                  <img src={Logo} className="w-10 h-10" />
                </div>
                <h1 className="font-bold text-lg sm:text-3xl">CRS</h1>
              </div>
              <Typography component="h1" variant="h5">
                Verfiy Account
              </Typography>
              <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{ mt: 1, width: "100%" }}
                autoComplete=""
              >
                 {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
                <div className="py-3 w-full">
                  <TextField
                    hiddenLabel
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="off"
                    autoFocus
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    onBlur={() =>
                      Utils.Validator.HandleForm(email, "email", setErrors)
                    }
                    error={errors.email ? true : false}
                    inputProps={{
                      maxLength: 255,
                    }}
                  />
                  <WarningAlert message={errors.email} />
                </div>
                <div className="py-3 w-full">
                  <TextField
                    hiddenLabel
                    variant="outlined"
                    required
                    fullWidth
                    name="verifyEmail"
                    label="Verification Code"
                    type="number"
                    id="verifyEmail"
                    autoComplete="off"
                    onChange={(e) => setVerificationCode(e.target.value)}
                    value={verificationCode}
                    onBlur={() =>
                      Utils.Validator.HandleForm(
                        verificationCode,
                        "verifyEmail",
                        setErrors
                      )
                    }
                    inputProps={{
                      minLength: 6,
                      maxLength: 6,
                    }}
                    error={errors.verifyEmail ? true : false}
                  />
                  <WarningAlert message={errors.verifyEmail} />
                </div>
                <ThemeProvider theme={Utils.Theme.ButtonActiveTheme}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    onClick={(e: any) => handleSubmit(e)}
                    disabled={isLoading ? true : false}
                  >
                    Submit
                  </Button>
                </ThemeProvider>
                {/* <Grid container> */}
                {/* <Grid item xs>
                  <Link href="#" variant="body2" sx={{color: "var(--main-color)"}}>
                    Forgot password?
                  </Link>
                </Grid> */}
                <Grid item>
                  <Link
                    href="/resend-verification"
                    variant="body2"
                    sx={{ color: "var(--main-color)", textDecoration: "none" }}
                  >
                    {"Didn't recive email? Resend Email"}
                  </Link>
                </Grid>
                {/* </Grid> */}
              </Box>
            </Box>
            <Copyright sx={{ mt: 8, mb: 4 }} />
          </Container>
        </ThemeProvider>
      </div>
    </>
  );
};

export default Verfication;
