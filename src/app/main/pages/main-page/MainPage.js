import React from 'react'
import { withRouter } from 'react-router-dom';
import clsx from "clsx";
import defaultTheme from 'app/config/themes/defaultTheme';
import { Grid, withStyles, Typography } from "@material-ui/core";
import LoginForm from "../../components/login/LoginForm";
import Fade from 'react-reveal/Fade';

const styles = theme => ({
  mainBackground: {
    textAlign: 'center',
    backgroundColor: "#FFF",
    minHeight: '100vh',
    height: '100%'
  },
  formGradient: {
    textAlign: 'center',
    minHeight: '100vh',
    height: '100%',
    background: 'linear-gradient(54deg, rgba(148,19,243,1) 20%, rgba(43,244,255,1) 85%);'
    // background: 'linear-gradient(54deg, rgba(148,19,243,1) 20%, rgba(14,244,199,1) 85%);'
    // background: 'linear-gradient(54deg, rgba(148,19,243,1) 35%, rgba(14,244,199,1) 74%);'
  },
  logo: {
    width: "100%",
    display: "block",
    paddingLeft: 32
  }
})

const MainPage = ({ classes, history }) => {
  return (
    <Grid container justify="center" alignItems="center" className={clsx("h-screen")}>
      <Grid item xs={12} sm={5} className={clsx(classes.formGradient, "px-36 flex items-center")}>
        <LoginForm />
      </Grid>
      <Grid item xs={12} sm={7} className={clsx(classes.mainBackground, "flex py-96")}>
        <Grid container justify="flex-start">
          <Grid item xs={12}>
            <Typography
              variant="h3"
              className="text-left px-60 font-700"
            >
              Bem-vindo à referencia de entregas no Ceará.
            </Typography>
            <Typography variant={"body1"} className="text-left px-60 mt-20">
              Essa é a motoflash, para começar, faça o login ou cadastre-se
              para solicitar uma coleta ou entrega!
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default withStyles(styles)(MainPage)