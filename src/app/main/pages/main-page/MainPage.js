import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import clsx from "clsx";
import { Grid, withStyles } from "@material-ui/core";
import LoginForm from "../../components/login/LoginForm";

const styles = theme => ({
  mainBackground: {
    backgroundImage: "url(/assets/images/main-wallpaper.jpg)",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    height: "100vh",
  }
})

const MainPage = ({ classes, history }) => {
  return (
    <Grid container justify={"center"} alignContent={"center"} className={clsx(classes.mainBackground, "py-40 px-80")}>
      <Grid item xs={10} sm={5} md={4} lg={3} xl={2}>
        <LoginForm />
      </Grid>
    </Grid>
  );
}

export default withStyles(styles)(withRouter(MainPage))