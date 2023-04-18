import React, { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Typography,
  Button,
  Card,
  IconButton,
  InputAdornment,
  CircularProgress,
  Grid,
  FormControl,
  FormHelperText,
} from "@mui/material";
import InputField from "../components/common/InputField";
import { REGEX } from "../constant";
import { useAuthLoginMutation } from "../apis/user";
import { UserData } from "../types/user";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { COLORS } from "../assets";

type DecodedToken = {
  user_email: string;
  user_name: string;
  user_id: string;
  type: string;
  iat: number;
  exp: number;
};

type LoginState = {
  email: string;
  password: string;
  role: string;
};

type LoginError = {
  email: boolean;
  password: boolean;
};

const sampleLoginError: LoginError = {
  email: false,
  password: false,
};

const sampleObject: LoginState = {
  email: "",
  password: "",
  role: "admin",
};

const loginHelperObject: LoginState = {
  email: "Valid email is required",
  password: "Valid Password is required",
  role: "Not Authorized",
};

const Login = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [fields, setFields] = useState({
    showPassword: false,
  });

  const [loginField, setLoginField] = useState<LoginState>(sampleObject);
  const [loginError, setLoginError] = useState<LoginError>(sampleLoginError);
  const [loginHelperText] = useState<LoginState>(loginHelperObject);
  const [authLogin] = useAuthLoginMutation();

  const handleClickShowPassword = () => {
    setFields({
      ...fields,
      showPassword: !fields.showPassword,
    });
  };

  const handleMouseDownPassword = (event: any) => {
    event.preventDefault();
  };
  const onHandleChange = (event: any) => {
    setLoginField({ ...loginField, [event.target.name]: event.target.value });
    checkLoginValidation(event.target.name, event.target.value);
  };

  const checkLoginValidation = (name: string, value: string) => {
    switch (name) {
      case "email":
        const isEmail = REGEX.EMAIL_REGEX.test(value);
        setLoginError({ ...loginError, [name]: !isEmail });
        break;
      case "password":
        const isPass = value.length > 3;
        setLoginError({ ...loginError, [name]: !isPass });
        break;
      default:
        break;
    }
  };

  // const handlepermissionsnackbar = (event: any) => {
  //   setSuccessSnack(false);
  // };

  const loginApi = async () => {
    try {
      setIsLoading(true);
      const data: UserData = {
        email: loginField.email,
        password: loginField.password,
      };
      const resp: any = await authLogin(data).unwrap();
      if (resp) {
          localStorage.setItem("username", resp.user.name);
          localStorage.setItem("email", resp.user.email);
          localStorage.setItem("avatar", resp.user.avatar);
          localStorage.setItem("token", resp.token);
          navigate("/");
          setIsLoading(false);
          return;
        }
      setIsLoading(false);
      setIsError(true);
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
    }
  };

  const onHandleSubmit = () => {
    if (loginField.password.length < 4) {
      setLoginError({ ...loginError, password: true });
    }
    if (!REGEX.EMAIL_REGEX.test(loginField.email)) {
      setLoginError({ ...loginError, email: true });
    }
    if (
      !Object.values(loginError).includes(true) &&
      REGEX.EMAIL_REGEX.test(loginField.email) &&
      loginField.password.length > 3
    ) {
      loginApi();
    }
  };

  return (
    <div style={styles.mainContainer}>
      <div style={styles.container}>
        <>
          <Card variant="outlined" style={styles.cardContainer}>
            <Grid style={styles.gridContainer}>
              <Typography
                align="center"
                fontFamily={"century_gothicregular"}
                fontWeight={700}
                sx={{
                  fontSize: {
                    md: "28px",
                    xs: "24px",
                  },
                }}
              >
                Login
              </Typography>

              <Typography
                fontFamily={"century_gothicregular"}
                fontWeight={400}
                sx={{
                  fontSize: {
                    md: "16px",
                    xs: "14px",
                  },
                  marginTop: "6%",
                }}
              >
                Email
              </Typography>

              <FormControl style={styles.fieldStyle}>
                <InputField
                  required
                  label="Enter email"
                  name="email"
                  error={loginError.email}
                  onBlur={(event) => checkLoginValidation(event.target.name, event.target.value)}
                  onChange={onHandleChange}
                  value={loginField.email}
                  size="small"
                />
                {loginError.email && (
                  <FormHelperText style={styles.errorRedText}>
                    {loginHelperText.email}
                  </FormHelperText>
                )}
              </FormControl>

              <Typography
                fontFamily={"century_gothicregular"}
                fontWeight={400}
                sx={{
                  fontSize: {
                    md: "16px",
                    xs: "14px",
                  },
                  marginTop: "6%",
                }}
                style={{ color: "#333333" }}
              >
                Password
              </Typography>
              <FormControl style={styles.fieldStyle}>
                <InputField
                  required
                  type={fields.showPassword ? "text" : "password"}
                  label="Enter password"
                  error={loginError.password}
                  name="password"
                  onBlur={(event) => checkLoginValidation(event.target.name, event.target.value)}
                  onChange={onHandleChange}
                  value={loginField.password}
                  size="small"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {fields.showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                {loginError.password && (
                  <FormHelperText style={styles.errorRedText}>
                    {loginHelperText.password}
                  </FormHelperText>
                )}
              </FormControl>
              <Button
                id="login"
                variant="contained"
                style={styles.ButtonStyle}
                onClick={onHandleSubmit}
              >
                {!isLoading ? (
                  "Login"
                ) : (
                  <CircularProgress style={styles.circularProgress} size={25} />
                )}
              </Button>

              {isError && (
                <Typography
                  fontFamily={"century_gothicregular"}
                  fontWeight={400}
                  sx={{
                    fontSize: {
                      md: "16px",
                      xs: "14px",
                    },
                  }}
                  style={{ color: "red" }}
                >
                  Email or password is wrong.
                </Typography>
              )}
            </Grid>
          </Card>
        </>
      </div>
      {/* <Snackbar
        open={successSnack}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        onClose={handlepermissionsnackbar}
        style={{ marginTop: "40px" }}
      >
        <Alert severity={"success"} sx={{ width: "100%" }}>
          Successfully Logged In
        </Alert>
      </Snackbar> */}
    </div>
  );
};

//CSS
const styles: { [key: string]: React.CSSProperties } = {
  mainContainer: {
    backgroundColor: "#E8E8E8",
    height: "100vh",
  },
  container: {
    position: "absolute",
    top: "40%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "444px",
    height: "454px",
    padding: 4,
    borderRadius: "10px",
  },
  cardContainer: {
    borderRadius: "15px",
  },
  gridContainer: {
    display: "flex",
    flexDirection: "column",
    marginTop: "5%",
    padding: "6%",
  },
  fieldStyle: {
    marginTop: "2%",
    background: "#F3F9FE",
    fontFamily: "century_gothicregular",
    fontWeight: 800,
  },
  ButtonStyle: {
    margin: "9% 0% 6% 0%",
    fontWeight: 600,
    fontFamily: "century_gothicregular",
    background: "#0AB2FA",
    borderRadius: "15px",
    height: "auto",
    width: "100%",
  },
  circularProgress: {
    color: "#FFFFFF",
  },
  errorRedText: {
    color: COLORS.error_red,
    fontFamily: "century_gothicregular",
  },
};
export default Login;
