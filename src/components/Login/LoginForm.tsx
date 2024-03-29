import { useState, useContext } from "react";
import AuthContext from "../../context/auth-context";
import { useNavigate } from "react-router-dom";
import classes from "./LoginForm.module.css";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useFormik } from "formik";
import * as yup from "yup";
import API from "../../utils/api";
import AlertDialog from "../generic/AlertDialog/AlertDialog";
import CircularIndeterminate from "../generic/CircularIndeterminate/CircularIndeterminate";
import PlatformLogo from "../generic/PlatformLogo/PlatformLogo";
import { Paper } from "@mui/material";

const validationSchema = yup.object({
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

const LoginForm = () => {
  const navigate = useNavigate();

  const authCtx = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setIsLoading(true);
      API.login(values.email, values.password)
        .then((res) => {
          authCtx.setTenants(res.data.tenants);
          API.tenantLogin(res.data.tenants[0].token)
          .then((res) => {
            authCtx.login(res.data.token);
            navigate("/dashboard");
          });
        })
        .catch((error) => {
          setIsLoading(false);
          setErrorMessage(error.message);
        });
    },
  });

  return (
    <div className={classes.container}>
      <PlatformLogo />
      <Paper elevation={2} className={classes.paper}>
        {errorMessage && (
          <AlertDialog
            title=""
            message={errorMessage}
            onClose={() => setErrorMessage("")}
          />
        )}

        <Typography component="h1" variant="h5">
          Welcome
        </Typography>
        <Box
          component="form"
          onSubmit={formik.handleSubmit}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            margin="normal"
            fullWidth
            id="email"
            name="email"
            label="Email or user"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            autoFocus
          />
          <TextField
            margin="normal"
            fullWidth
            id="password"
            name="password"
            label="Password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <div>
            {!isLoading && (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 1, mb: 2 }}
              >
                Log In
              </Button>
            )}
            {isLoading && <CircularIndeterminate />}
          </div>
        </Box>
      </Paper>
    </div>
  );
};

export default LoginForm;
