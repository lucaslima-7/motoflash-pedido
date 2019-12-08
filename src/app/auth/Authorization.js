import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "app/store/actions";
import history from "@history";
import firebaseService from "app/config/firebase/index";

class Authorization extends Component {
  constructor(props) {
    super(props);
    this.firebaseCheck();
  }

  firebaseCheck = () => {
    firebaseService.init();

    firebaseService.onAuthStateChanged(authUser => {
      if (authUser) {
        const user = {
          uid: authUser.uid,
          role: "admin",
          displayName: authUser.displayName ? authUser.displayName : "User",
          email: authUser.email,
          phoneNumber: authUser.phoneNumber ? authUser.phoneNumber : "",
          profilePic: authUser.photoURL ? authUser.photoURL : "/assets/images/avatar/profile.jpg",
          accessToken: authUser.ma ? authUser.ma : "",
          refreshToken: authUser.refreshToken ? authUser.refreshToken : "",
        }
        if (!localStorage.getItem('user')) {
          localStorage.setItem('user', JSON.stringify(user))
        }
        this.props.setUserData(user)
        history.push('/solicitar')
        // TODO Snackbar Logando...
        // firebaseService.getUserData(authUser.uid).then(user => {
        //   console.log(user, authUser);

        //   console.log({ message: "Logged in with Firebase" });
        //   // TODO snackbar com sucesso
        // });
      } else {
        localStorage.removeItem("user")
        // TODO snackbar falando que o usuário foi deslogado
      }
    });
  };

  render() {
    const { children } = this.props;

    return <React.Fragment>{children}</React.Fragment>;
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      // logout: Actions.logoutUser,
      setUserData: Actions.setUserData,
    },
    dispatch
  );
}

export default connect(null, mapDispatchToProps)(Authorization);