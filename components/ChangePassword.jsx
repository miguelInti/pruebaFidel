import { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  Grid,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useForm, Controller } from "react-hook-form";
import Alert from "@components/Alerts/Alert";
import useChangePasswordSet from "@hooks/useChangePassSet";
import VirtualKeyboard from "@components/VirtualKeyboard";
import KeyboardIcon from "@mui/icons-material/Keyboard";

export default function ChangePassword() {
  const [open, setOpen] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [showPassword3, setShowPassword3] = useState(false);

  const {
    handleSubmit,
    control,
    formState: { errors },
    register,
    watch,
    setValue,
  } = useForm();

  //Estados
  const [activeField, setActiveField] = useState(""); // Campo de entrada activo para el teclado virtual
  const [showKeyboard, setShowKeyboard] = useState(false); // Estado para la visibilidad del teclado virtual

  const inputValue = watch(activeField, "");

  const { callBackChangePassword, messageError, openError, setOpenError } =
    useChangePasswordSet();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = (data) => {
    if (data.newPassword === data.confirmPassword) {
      callBackChangePassword(data.password, data.newPassword);
      handleClose();
    } else {
      setErrorPassword(true);
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowPassword2 = () => {
    setShowPassword2(!showPassword2);
  };

  const handleClickShowPassword3 = () => {
    setShowPassword3(!showPassword3);
  };

  const handleInputChange = (value, name) => {
    setValue(name, value);
  };

  const handleFieldFocus = (field) => {
    setActiveField(field);
  };

  return (
    <>
      <Button
        size="small"
        style={{ display: "grid", position: "relative" }}
        onClick={handleClickOpen}
        variant="contained"
        color="primary"
      >
        Cambiar contraseña
      </Button>
      <Grid
        container
        alignItems="center"
        direction="row"
        style={{ marginTop: "-30px" }}
      >
        <Dialog
          open={open}
          onClose={handleClose}
          fullWidth
          maxWidth="md"
          style={{ ml: "100" }}
        >
          <DialogContent>
            <DialogContentText>
              <Grid container direction="row">
                <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
                  <DialogTitle>Cambiar contraseña</DialogTitle>
                  <Grid container direction="column">
                    <form
                      onSubmit={handleSubmit(onSubmit)}
                      style={{ width: "70%" }}
                    >
                      {/* Password fields */}
                      <FormControl fullWidth style={{ marginBottom: 8 }}>
                        <Input
                          fullWidth
                          type={showPassword ? "text" : "password"}
                          {...register("password", {
                            required: "Este campo es requerido",
                          })}
                          placeholder="Contraseña actual"
                          onFocus={() => handleFieldFocus("password")}
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={(e) => e.preventDefault()}
                              >
                                {showPassword ? (
                                  <Visibility />
                                ) : (
                                  <VisibilityOff />
                                )}
                              </IconButton>
                            </InputAdornment>
                          }
                          style={{ color: "#000" }}
                        />
                        {errors.password && (
                          <span>{errors.password.message}</span>
                        )}
                      </FormControl>

                      <FormControl fullWidth style={{ marginBottom: 8 }}>
                        <Input
                          fullWidth
                          type={showPassword2 ? "text" : "password"}
                          {...register("newPassword", {
                            required: "Este campo es requerido",
                          })}
                          placeholder="Contraseña nueva"
                          onFocus={() => handleFieldFocus("newPassword")}
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword2}
                              >
                                {showPassword2 ? (
                                  <Visibility />
                                ) : (
                                  <VisibilityOff />
                                )}
                              </IconButton>
                            </InputAdornment>
                          }
                          style={{ color: "#000" }}
                        />
                        {errors.newPassword && (
                          <span>{errors.newPassword.message}</span>
                        )}
                      </FormControl>

                      <FormControl fullWidth style={{ marginBottom: 8 }}>
                        <Input
                          fullWidth
                          type={showPassword3 ? "text" : "password"}
                          {...register("confirmPassword", {
                            required: "Este campo es requerido",
                          })}
                          placeholder="Confirmar Contraseña"
                          onFocus={() => handleFieldFocus("confirmPassword")}
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword3}
                                onMouseDown={(e) => e.preventDefault()}
                              >
                                {showPassword3 ? (
                                  <Visibility />
                                ) : (
                                  <VisibilityOff />
                                )}
                              </IconButton>
                            </InputAdornment>
                          }
                          style={{ color: "#000" }}
                        />
                        {errors.confirmPassword && (
                          <span>{errors.confirmPassword.message}</span>
                        )}
                      </FormControl>

                      <Grid item>
                        <DialogActions>
                          <Button
                            size="small"
                            onClick={handleClose}
                            variant="contained"
                            color="primary"
                            autoFocus
                          >
                            Cerrar
                          </Button>
                          <Button
                            size="small"
                            type="submit"
                            variant="contained"
                            color="secondary"
                            autoFocus
                          >
                            Enviar
                          </Button>
                          <IconButton
                            color="secondary"
                            onClick={() => setShowKeyboard(!showKeyboard)}
                            sx={{
                              marginTop: "-18px",
                            }}
                          >
                            <KeyboardIcon
                              sx={{
                                fontSize: "3rem",
                              }}
                            />
                          </IconButton>
                        </DialogActions>
                      </Grid>
                    </form>
                  </Grid>
                </Grid>
                <Grid item xl={6} lg={6} md={6} sm={6} xs={6}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    marginTop: "1rem", // Ajusta el valor según sea necesario para centrar el teclado.
                  }}
                >
                  {showKeyboard && (
                    <VirtualKeyboard
                      inputValue={inputValue} // Asegúrate de que `inputValue` esté definido en tu estado.
                      onKeyPress={(value) => {
                        handleInputChange(value, activeField);
                        // Implementa la lógica para manejar la entrada del teclado virtual aquí
                      }}
                      keyboardType={"numeric"}
                    />
                  )}
                </Grid>
              </Grid>
            </DialogContentText>
          </DialogContent>
        </Dialog>
      </Grid>
      {messageError ? (
        <Alert
          open={openError}
          onClose={() => setOpenError(false)}
          message={messageError}
        />
      ) : null}
    </>
  );
}
