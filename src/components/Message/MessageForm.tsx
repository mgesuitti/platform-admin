import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./MessageForm.module.css";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { NotificationToPersonalsDTO } from "../../models/notificationToPersonals.DTO";
import { useFormik } from "formik";
import * as yup from "yup";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { AddresseesDTO } from "../../models/addressees.DTO";
import AuthContext from "../../context/auth-context";
import API from "../../utils/api";
import CircularIndeterminate from "../generic/CircularIndeterminate/CircularIndeterminate";
import AlertDialog from "../generic/AlertDialog/AlertDialog";
import CompanySelector from "../CompanySelector/CompanySelector";

const validationSchema = yup.object({
  title: yup
    .string()
    .max(
      250,
      "The content of the title exceeds the maximum number of characters allowed"
    )
    .required("El título es obligatorio"),
  description: yup
    .string()
    .max(
      65000,
      "The content of the communication exceeds the maximum number of characters allowed"
    )
    .required("Description is required"),
});

const MessageForm = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [checked, setChecked] = useState<string[]>([]);
  const [companyModalOpened, setCompanyModalOpened] = useState(false);

  const authCtx = useContext(AuthContext);

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const notificacionModelDTO = new NotificationToPersonalsDTO();
      notificacionModelDTO.title = values.title;
      notificacionModelDTO.details = values.description;
      notificacionModelDTO.destinatarios = new AddresseesDTO();
      notificacionModelDTO.destinatarios.todaLaNomina = true;

      const formData = new FormData();
      formData.append("json", JSON.stringify(notificacionModelDTO));

      const promises = checked.map((token) => {
        return API.tenantLogin(token)
          .then((res) => {
            authCtx.login(res.data.token);
            API.notificar(formData).then();
          });
      });

      setIsLoading(true);
      Promise.all(promises).then(() => {
        navigate("/dashboard");
      }).catch((error) => {
        setIsLoading(false);
        setErrorMessage(error.message);
      });
    },
  });

  const onCompanySelectorClose = (checked: string[]) => {
    setChecked(checked);
    setCompanyModalOpened(false);
  };

  return (
    <section className={classes.container}>
      {companyModalOpened && (
        <CompanySelector
          onClose={(checked: string[]) => onCompanySelectorClose(checked)}
          checked={checked}
        />
      )}
      {errorMessage && (
        <AlertDialog
          title=""
          message={errorMessage}
          onClose={setErrorMessage.bind(this, "")}
        />
      )}
      <Typography component="h1" variant="h5">
        Send communication
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
          id="title"
          name="title"
          label="Título"
          value={formik.values.title}
          onChange={formik.handleChange}
          error={formik.touched.title && Boolean(formik.errors.title)}
          helperText={formik.touched.title && formik.errors.title}
          autoFocus
        />
        <ReactQuill
          id="description"
          theme="snow"
          value={formik.values.description}
          onChange={(e) => formik.setFieldValue("description", e)}
        />
        <div>
          <Button
            type="button"
            variant="contained"
            sx={{ mt: 1, mb: 2 }}
            onClick={() => setCompanyModalOpened(true)}
          >
            Select Companies ({checked.length})
          </Button>
        </div>
        <div>
          {!isLoading && (
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 1, mb: 2 }}
            >
              Send
            </Button>
          )}
          {isLoading && <CircularIndeterminate />}
        </div>
      </Box>
    </section>
  );
};

export default MessageForm;
