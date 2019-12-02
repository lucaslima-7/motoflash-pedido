import React from 'react';
import { Icon, ListItem, ListItemText } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import NavLinkAdapter from './NavLinkAdapter';
import { withRouter } from 'react-router-dom';
import clsx from 'clsx';
import { useSelector } from 'react-redux';
import includes from 'lodash/includes';

const useStyles = makeStyles(theme => ({
  item: {
    height: 40,
    paddingRight: 12,
    '&.active': {
      backgroundColor: "#80D8FF70",
      borderRight: `6px ${theme.palette.secondary.main} solid`,
      color: theme.palette.secondary.contrastText + '!important',
      pointerEvents: 'none',
      transition: 'border-radius .15s cubic-bezier(0.4,0.0,0.2,1)',
      '& .list-item-text-primary': {
        color: 'inherit'
      },
      '& .list-item-icon': {
        color: 'inherit'
      }
    },
    '&.square, &.active.square': {
      width: '100%',
      borderRadius: '0'
    },
    '& .list-item-icon': {},
    '& .list-item-text': {},
    color: theme.palette.text.primary,
    cursor: 'pointer',
    textDecoration: 'none!important'
  }
}));

const NavItem = (props) => {
  const { role } = useSelector(({ motoflash }) => motoflash.user);
  const { navMenu } = useSelector(({ motoflash }) => motoflash);
  const folded = navMenu.folded;
  const classes = useStyles(props);
  const { item, nestedLevel, active } = props;
  let paddingValue = 40 + (nestedLevel * 16);
  const listItemPadding = nestedLevel > 0 ? 'pl-' + (paddingValue > 80 ? 80 : paddingValue) : 'pl-24';

  if (!includes(item.auth, role)) {
    return null;
  }

  return (
    <ListItem
      button
      component={NavLinkAdapter}
      to={item.url}
      activeClassName="active square"
      className={clsx(classes.item, listItemPadding, 'list-item', active)}
      exact={item.exact}
    >
      {item.icon && (
        <div className="list-item-icon text-18 flex-shrink-0 mr-16 min-w-24" color="action">{item.icon()}</div>
      )}
      {!folded && (
        <ListItemText className="list-item-text" primary={item.title} classes={{ primary: 'text-16 list-item-text-primary' }} />
      )}
    </ListItem>
  );
}

export default withRouter(React.memo(NavItem));