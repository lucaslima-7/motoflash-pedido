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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { faChevronRight, faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import firebaseService from "app/config/firebase/index";

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

  const submitLoginWithFireBase = ({ email, password }) => {
    setLoading(true)
    firebaseService.auth &&
      firebaseService.auth.signInWithEmailAndPassword(email, password)
        .then((response) => {
          setLoading(false)
          dispatch(Actions.showMessageDialog('info', 'Bem Vindo de Volta!'))
          history.push('/pedidos')
        })
        .catch(error => {
          console.log("Erro", error)
          dispatch(Actions.showMessageDialog('error', 'Ocorreu um erro, tente novamente'))
          setLoading(false)
        });
  }

  const registerWithFirebase = ({ email, password }) => {
    firebaseService.auth && firebaseService.auth.createUserWithEmailAndPassword(email, password)
      .then(response => {
        console.log("Sucesso", response)
        history.push('/pedidos')
      })
      .catch(error => {
        console.log("Erro", error)
      });
  }

  return (
    <>
      <Paper className={"rounded-1 shadow-lg p-10"}>
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
                  onKeyDown={(e) => e.keyCode === 13 ? submitLoginWithFireBase({ email: loginData.email, password: loginData.password }) : null}
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
              <Grid item xs={12} className={"my-12"}>
                <Link
                  className="float-right"
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
                  className={"float-right"}
                  variant="contained"
                  onClick={() => submitLoginWithFireBase({ email: loginData.email, password: loginData.password })}>
                  {loading ? "Verificando..." : "Login"}
                </Button>
              </Grid>
            </>
          )}
          {/* {step === 1 && (
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
              <Grid item xs={12} className={"mt-12"}>
                <Button
                  fullWidth
                  disabled={loading}
                  color="primary"
                  className={"float-right"}
                  variant="contained"
                  onClick={() => registerWithFirebase({ email: signUpData.email, password: signUpData.password })}>
                  {loading ? "Criando..." : "Criar Conta"}
                </Button>
              </Grid>
            </>
          )} */}
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
                  className={"float-right"}
                  variant="contained"
                  onClick={() => console.log("Clicado")}>
                  {loading ? "Enviando..." : "Recuperar Senha"}
                </Button>
              </Grid>
            </>
          )}
        </Grid>
      </Paper >
      {/* {step !== 2 && (
        <Paper className={"rounded-8 shadow-lg p-16 mt-12"}>
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
                    className="float-right"
                    variant="contained"
                    onClick={() => setStep(1)}>
                    Cadastrar
                  <FontAwesomeIcon icon={faChevronRight} className={"ml-8"} />
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
                    className="float-right"
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
      )} */}
    </>
  )
}

export default withRouter(LoginForm)