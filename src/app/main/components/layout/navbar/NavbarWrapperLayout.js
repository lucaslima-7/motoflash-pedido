import React from 'react';
import { withStyles } from '@material-ui/core';
import clsx from 'clsx';
import NavbarLayout from './NavbarLayout';
import { useSelector } from 'react-redux';
import defaultTheme from 'app/config/themes/defaultTheme';

const navbarWidth = 180;

const styles = theme => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    zIndex: 4,
    [theme.breakpoints.up('lg')]: {
      width: navbarWidth,
      minWidth: navbarWidth
    }
  },
  wrapperFolded: {
    [theme.breakpoints.up('lg')]: {
      width: 64,
      minWidth: 64
    }
  },
  navbar: {
    display: 'flex',
    overflow: 'hidden',
    flexDirection: 'column',
    flex: '1 1 auto',
    width: navbarWidth,
    minWidth: navbarWidth,
    height: '100%',
    background: `linear-gradient(
      to bottom, 25% ${defaultTheme.palette.primary.light}, 100% ${defaultTheme.palette.primary.main})`,
    zIndex: 4,
    left: 0,
    transition: theme.transitions.create(['width', 'min-width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.shorter
    }),
    boxShadow: theme.shadows[3]
  },
  folded: {
    position: 'absolute',
    width: 64,
    minWidth: 64,
    top: 0,
    bottom: 0
  },
  navbarContent: {
    flex: '1 1 auto',
    background: "white"
  },
});

const NavbarWrapperLayout = ({ classes }) => {
  const { navMenu } = useSelector(({ motoflash }) => motoflash);
  const folded = navMenu.folded;

  return (
    <div className={clsx(classes.wrapper, folded && classes.wrapperFolded)}>
      <div className={clsx(classes.navbar, folded && classes.folded)}>
        <NavbarLayout className={classes.navbarContent} />
      </div>
    </div>
  );
}

export default withStyles(styles)(NavbarWrapperLayout);