import React, { useState } from "react";
import {
  Typography,
  Button,
  Card,
  CircularProgress,
  Grid,
  FormControl,
  FormHelperText,
} from "@mui/material";
import InputField from "../components/common/InputField";
import { REGEX } from "../constant";
import { useRegisterMutation } from "../apis/user";
import { UserRegisterData } from "../types/user";
import { useNavigate } from "react-router-dom";
import { COLORS } from "../assets";

type RegisterState = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type RegisterError = {
  name: boolean;
  email: boolean;
  password: boolean;
  confirmPassword: boolean;
};

const sampleRegisterError: RegisterError = {
  name: false,
  email: false,
  password: false,
  confirmPassword: false,
};

const sampleObject: RegisterState = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const RegisterHelperObject: RegisterState = {
  name: "Name required",
  email: "Valid email is required",
  password: "Valid Password is required",
  confirmPassword: "Password doesn't match",
};

const Register = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isError,setIsError] = useState(false);

  const [registerField, setRegisterField] =
    useState<RegisterState>(sampleObject);
  const [registerError, setRegisterError] =
    useState<RegisterError>(sampleRegisterError);
  const [registerHelperText] = useState<RegisterState>(RegisterHelperObject);
  const [register] = useRegisterMutation();

  const onHandleChange = (event: any) => {
    setRegisterField({
      ...registerField,
      [event.target.name]: event.target.value,
    });
    checkRegisterValidation(event.target.name, event.target.value);
  };

  const checkRegisterValidation = (name: string, value: string) => {
    switch (name) {
      case "name":
        const isName = value.length > 1;
        setRegisterError({ ...registerError, [name]: !isName });
        break;
      case "email":
        const isEmail = REGEX.EMAIL_REGEX.test(value);
        setRegisterError({ ...registerError, [name]: !isEmail });
        break;
      case "password":
        const isPass = value.length > 3;
        setRegisterError({ ...registerError, [name]: !isPass });
        break;
      case "confirmPassword":
        const isConfPass = value === registerField.password;
        setRegisterError({ ...registerError, [name]: !isConfPass });
        break;
      default:
        break;
    }
  };

  // const handlepermissionsnackbar = (event: any) => {
  //   setSuccessSnack(false);
  // };

  const registerApi = async () => {
    try {
      setIsLoading(true);
      const data: UserRegisterData = {
        email: registerField.email,
        password: registerField.password,
        name: registerField.name,
      };
      const resp: any = await register(data).unwrap();
      if (resp) {
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
    if (registerField.password.length < 4) {
      setRegisterError({ ...registerError, password: true });
    }
    if (registerField.name.trim().length === 0) {
        setRegisterError({ ...registerError, name: true });
      }
    if (!REGEX.EMAIL_REGEX.test(registerField.email)) {
      setRegisterError({ ...registerError, email: true });
    }
    if (registerField.password !== registerField.confirmPassword) {
        setRegisterError({ ...registerError, confirmPassword: true });
      }
    if (
      !Object.values(registerError).includes(true) &&
      REGEX.EMAIL_REGEX.test(registerField.email) &&
      registerField.password.length > 3 &&
      registerField.password === registerField.confirmPassword
    ) {
      registerApi();
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
                Register
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
                Name
              </Typography>

              <FormControl style={styles.fieldStyle}>
                <InputField
                  required
                  label="Enter name"
                  name="name"
                  error={registerError.name}
                  onBlur={(event) =>
                    checkRegisterValidation(
                      event.target.name,
                      event.target.value
                    )
                  }
                  onChange={onHandleChange}
                  value={registerField.name}
                  size="small"
                />
                {registerError.name && (
                  <FormHelperText style={styles.errorRedText}>
                    {registerHelperText.name}
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
              >
                Email
              </Typography>

              <FormControl style={styles.fieldStyle}>
                <InputField
                  required
                  label="Enter email"
                  name="email"
                  error={registerError.email}
                  onBlur={(event) =>
                    checkRegisterValidation(
                      event.target.name,
                      event.target.value
                    )
                  }
                  onChange={onHandleChange}
                  value={registerField.email}
                  size="small"
                />
                {registerError.email && (
                  <FormHelperText style={styles.errorRedText}>
                    {registerHelperText.email}
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
                  label="Enter password"
                  error={registerError.password}
                  name="password"
                  onBlur={(event) =>
                    checkRegisterValidation(
                      event.target.name,
                      event.target.value
                    )
                  }
                  onChange={onHandleChange}
                  value={registerField.password}
                  size="small"
                />
                {registerError.password && (
                  <FormHelperText style={styles.errorRedText}>
                    {registerHelperText.password}
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
                Confirm Password
              </Typography>
              <FormControl style={styles.fieldStyle}>
                <InputField
                  required
                  label="Confirm password"
                  error={registerError.confirmPassword}
                  name="confirmPassword"
                  onBlur={(event) =>
                    checkRegisterValidation(
                      event.target.name,
                      event.target.value
                    )
                  }
                  onChange={onHandleChange}
                  value={registerField.confirmPassword}
                  size="small"
                />
                {registerError.confirmPassword && (
                  <FormHelperText style={styles.errorRedText}>
                    {registerHelperText.confirmPassword}
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
                  "Sign Up"
                ) : (
                  <CircularProgress style={styles.circularProgress} size={25} />
                )}
              </Button>
            </Grid>
          </Card>
        </>
      </div>
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
export default Register;
