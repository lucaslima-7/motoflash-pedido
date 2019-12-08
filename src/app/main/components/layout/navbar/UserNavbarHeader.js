import React from 'react';
import { useSelector } from 'react-redux';
import { AppBar, Avatar, Typography, withStyles } from '@material-ui/core';
import classNames from 'classnames';
import defaultTheme from 'app/config/themes/defaultTheme';

const styles = theme => ({
  root: {
    '& .user': {
      '& .username, & .email': {
        transition: theme.transitions.create('opacity', {
          duration: theme.transitions.duration.shortest,
          easing: theme.transitions.easing.easeInOut
        })
      }
    }
  },
  avatar: {
    width: 72,
    height: 72,
    padding: 8,
    background: theme.palette.background.default,
    boxSizing: 'content-box',
    '& > img': {
      borderRadius: '50%'
    }
  },
  paperBg: {
    background: "#FFF"
  }
});

const UserNavbarHeader = ({ classes }) => {
  const { user } = useSelector(({ motoflash }) => motoflash);

  return (
    <AppBar
      position="static"
      color="default"
      classes={{ root: classes.root, colorDefault: classes.paperBg }}
      className="user shadow-none relative flex flex-col items-center justify-center p-12 z-0"
    >
      <Avatar
        className={classNames(classes.avatar, "avatar mb-12")}
        alt="user photo"
        src={user.photoURL && user.photoURL !== '' ? user.photoURL : "/assets/images/avatar/profile.jpg"}
      />
      <Typography className="text-left username whitespace-no-wrap font-700" variant="h5" color="inherit">{user.displayName}</Typography>
      <Typography className="text-left email text-13 mt-4 opacity-50 whitespace-no-wrap" variant="body1" color="inherit">{user.email}</Typography>

    </AppBar>
  );
};

export default withStyles(styles)(UserNavbarHeader)