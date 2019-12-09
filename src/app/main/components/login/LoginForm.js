import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import * as Actions from 'app/store/actions';
import { withRouter } from 'react-router-dom';
import {
  Grid,
  Link,
  Paper,
  IconButton,
  TextField,
  Button,
  Typography
} from "@material-ui/core";
import { isValidEmail, isValidPassword, isNotBlank } from "app/utils/ValidationUtil";
import { formatAuthError } from "app/utils/FirebaseErrors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { faChevronRight, faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import clsx from 'clsx';
import { auth } from 'firebase';

const LoginForm = ({ history }) => {
  const dispatch = useDispatch()
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });
  const [signUpData, setSignUpData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  })
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = ({ email, password }) => {
    if (isValidEmail(email)) {
      if (isValidPassword(password)) {
        submitLoginWithFireBase({ email, password })
      } else {
        dispatch(Actions.showMessageDialog('warning', 'Senha inválida'))
      }
    } else {
      dispatch(Actions.showMessageDialog('warning', 'Email inválido'))
    }
  }

  const handleRegister = () => {
    if (signUpData.password !== signUpData.confirmPassword) {
      return dispatch(Actions.showMessageDialog("warning", "As senhas não conferem!"))
    }

    if (isNotBlank(signUpData.username)) {
      if (isValidEmail(signUpData.email)) {
        if (isValidPassword(signUpData.password)) {
          registerWithFirebase({ email: signUpData.email, password: signUpData.password })
        } else {
          dispatch(Actions.showMessageDialog('warning', 'Senha inválida'))
        }
      } else {
        dispatch(Actions.showMessageDialog("warning", "Email inválido"))
      }
    } else {
      dispatch(Actions.showMessageDialog("warning", "Nome inválido"))
    }
  }

  const submitLoginWithFireBase = async ({ email, password }) => {
    setLoading(true)
    try {
      await auth().signInWithEmailAndPassword(email, password)
      dispatch(Actions.showMessageDialog('info', 'Bem Vindo de Volta!'))
      history.push('/pedidos')
    } catch (error) {
      dispatch(Actions.showMessageDialog('error', formatAuthError(error)))
    } finally {
      setLoading(false)
    }
  }

  const registerWithFirebase = async ({ email, password }) => {
    setLoading(true)
    try {
      const { user } = await auth().createUserWithEmailAndPassword(email, password)
      user.updateProfile({
        displayName: signUpData.username
      })
      dispatch(Actions.showMessageDialog('success', 'Usuário Criado com Sucesso!'))
      history.push('/solicitar')
    } catch (error) {
      dispatch(Actions.showMessageDialog('error', formatAuthError(error)))
    } finally {
      setLoading(false)
    }
  }

  return (
    <Grid container justify="center" alignContent="center">
      <Grid item xs={7}>
        <Paper className={clsx("rounded-1 p-24 shadow-lighter")}>
          <div className={"max-w-128"}>
            <img src={"/assets/images/logos/MOTOFLASH_1.svg"} alt="Logo" />
          </div>
          <Grid container justify="center">
            {step === 0 && (
              <>
                <Grid item xs={12} className={"my-8"}>
                  <TextField
                    fullWidth
                    id="email-login"
                    label="E-mail"
                    variant="outlined"
                    value={loginData.email}
                    onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                    margin="dense"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="password-login"
                    margin={"dense"}
                    label="Senha"
                    variant="outlined"
                    type={showPassword ? 'text' : 'password'}
                    value={loginData.password}
                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                    onKeyDown={(e) => e.keyCode === 13 ? handleSubmit({ email: loginData.email, password: loginData.password }) : null}
                    InputProps={{
                      endAdornment: (
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <FontAwesomeIcon icon={faEye} className="text-14" />
                          ) : (
                              <FontAwesomeIcon icon={faEyeSlash} className="text-14" />
                            )}
                        </IconButton>
                      )
                    }}
                  />
                </Grid>
                <Grid item xs={12} className={"my-24"}>
                  <Link
                    className="float-right font-700"
                    color="primary"
                    component="button"
                    variant="body1"
                    onClick={() => setStep(0)}
                  >
                    Esqueceu a Senha?
                </Link>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    fullWidth
                    disabled={loading}
                    color="primary"
                    className={"float-right capitalize shadow-none"}
                    variant="contained"
                    onClick={() => handleSubmit({ email: loginData.email, password: loginData.password })}>
                    {loading ? "Verificando..." : "Login"}
                  </Button>
                </Grid>
              </>
            )}
            {step === 1 && (
              <>
                <Grid item xs={12} className={"my-8"}>
                  <TextField
                    fullWidth
                    id="username"
                    label="Nome"
                    variant="outlined"
                    value={signUpData.username}
                    onChange={(e) => setSignUpData({ ...signUpData, username: e.target.value })}
                    margin="dense"
                  />
                </Grid>
                <Grid item xs={12} className={"my-8"}>
                  <TextField
                    fullWidth
                    id="email-signup"
                    label="Email"
                    variant="outlined"
                    value={signUpData.email}
                    onChange={(e) => setSignUpData({ ...signUpData, email: e.target.value })}
                    margin="dense"
                  />
                </Grid>
                <Grid item xs={12} className={"my-8"}>
                  <TextField
                    fullWidth
                    id="password-signup"
                    margin={"dense"}
                    label="Senha"
                    variant="outlined"
                    type={showPassword ? 'text' : 'password'}
                    value={signUpData.password}
                    onChange={(e) => setSignUpData({ ...signUpData, password: e.target.value })}
                    InputProps={{
                      endAdornment: (
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <FontAwesomeIcon icon={faEye} className="text-14" />
                          ) : (
                              <FontAwesomeIcon icon={faEyeSlash} className="text-14" />
                            )}
                        </IconButton>
                      )
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="password-confirm"
                    margin={"dense"}
                    label="Confirme a Senha"
                    variant="outlined"
                    type={'password'}
                    value={signUpData.confirmPassword}
                    onChange={(e) => setSignUpData({ ...signUpData, confirmPassword: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} className={"mt-32"}>
                  <Button
                    fullWidth
                    disabled={loading}
                    color="primary"
                    className={"float-right capitalize shadow-none"}
                    variant="contained"
                    onClick={() => handleRegister()}>
                    {loading ? "Criando..." : "Criar Conta"}
                  </Button>
                </Grid>
              </>
            )}
            {step === 2 && (
              <>
                <Grid item xs={12}>
                  <Typography variant="body1">
                    Coloque seu email e clique em recuperar senha
                    para que possamos enviar um email com as instruções!
                </Typography>
                </Grid>
                <Grid item xs={12} className={"my-8"}>
                  <TextField
                    fullWidth
                    id="email-signup"
                    label="Email"
                    variant="outlined"
                    value={loginData.email}
                    onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                    margin="dense"
                  />
                </Grid>
                <Grid item xs={12} className={"mt-12"}>
                  <Button
                    fullWidth
                    disabled={loading}
                    color="primary"
                    className={"float-right capitalize shadow-none"}
                    variant="contained"
                    onClick={() => console.log("Clicado")}>
                    {loading ? "Enviando..." : "Recuperar Senha"}
                  </Button>
                </Grid>
              </>
            )}
          </Grid>
        </Paper >
        {step !== 2 && (
          <Paper className={"rounded-8 shadow-lighter p-16 mt-12"}>
            <Grid container justify="space-between" alignItems="center">
              {step === 0 && (
                <>
                  <Grid item xs={6}>
                    <Typography>
                      Novo usuário?
                </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Button
                      size={"small"}
                      color="primary"
                      className="float-right capitalize shadow-none"
                      variant="contained"
                      onClick={() => setStep(1)}>
                      Cadastrar
                  <FontAwesomeIcon icon={faChevronRight} className={"ml-16"} />
                    </Button>
                  </Grid>
                </>
              )}
              {step === 1 && (
                <>
                  <Grid item xs={6}>
                    <Typography>
                      Já é cadastrado?
                </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Button
                      size={"small"}
                      color="primary"
                      className="float-right capitalize shadow-none"
                      variant="contained"
                      onClick={() => setStep(0)}>
                      <FontAwesomeIcon icon={faChevronLeft} className={"mr-8"} />
                      Fazer Login
                </Button>
                  </Grid>
                </>
              )}
            </Grid>
          </Paper>
        )}
      </Grid>
    </Grid>
  )
}

export default withRouter(LoginForm)