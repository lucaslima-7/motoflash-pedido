import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import * as Actions from "app/store/actions";
import { AppBar, IconButton } from '@material-ui/core';
import clsx from 'clsx';
import Navigation from './Navigation';
import navMenus from "app/config/navigation/NavigationItems";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import defaultTheme from 'app/config/themes/defaultTheme';

const NavbarLayout = (props) => {
  const dispatch = useDispatch();
  const { navMenu } = useSelector(({ motoflash }) => motoflash);
  const folded = navMenu.folded;

  return (
    <div
      style={
        {
          background: `linear-gradient(to bottom, ${defaultTheme.palette.primary.light} 25%, ${defaultTheme.palette.primary.main} 100%)`
        }
      }
      className={clsx("flex flex-col overflow-hidden h-full", props.className)}
    >
      <AppBar
        color="inherit"
        position="static"
        elevation={0}
        className="flex flex-row items-center flex-shrink h-64 min-h-64 pr-12"
      >
        <div className="flex flex-1 pr-8">
          {/* Motoflash Logo */}
        </div>
        <IconButton
          className={"w-40 h-40 p-0"}
          onClick={() => { dispatch(Actions.foldNavbar(true)) }}
          color="inherit"
        >
          <FontAwesomeIcon icon={folded ? faChevronRight : faChevronLeft} className="text-14" />
        </IconButton>
      </AppBar>
      <Navigation navigation={navMenus} />
    </div>
  );
}

export default NavbarLayout;