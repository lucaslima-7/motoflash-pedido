import React from 'react'
import { withRouter } from 'react-router-dom';
import clsx from "clsx";
import defaultTheme from 'app/config/themes/defaultTheme';
import { Grid, withStyles } from "@material-ui/core";
import LoginForm from "../../components/login/LoginForm";

const styles = theme => ({
  mainBackground: {
    backgroundImage: "url(/assets/images/main-wallpaper.jpg)",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat"
  },
  formGradient: {
    background: `linear-gradient(90deg, ${defaultTheme.palette.primary.light} 50%, ${defaultTheme.palette.primary.main} 100%)`
  }
})

const MainPage = ({ classes, history }) => {
  return (
    <Grid container className={clsx("h-screen")}>
      <Grid item xs={12} sm={5} md={4} xl={3} className={clsx(classes.formGradient, "h-screen px-36 self-center")}>
        <LoginForm />
      </Grid>
      <Grid item xs={12} sm={7} md={8} xl={9} className={clsx(classes.mainBackground)} />
    </Grid>
  );
}

export default withStyles(styles)(withRouter(MainPage))