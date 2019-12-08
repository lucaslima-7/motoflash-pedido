import React from 'react';
import { Divider, List } from '@material-ui/core';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import NavItem from './NavItem';

const Navigation = (props) => {
  const { navigation, active, dense } = props;

  const verticalNav = (
    <List className={clsx("navigation whitespace-no-wrap")}>
      {
        navigation.map((item) => (

          <React.Fragment key={item.id}>

            {item.type === 'item' && (
              <NavItem item={item} nestedLevel={0} active={active} dense={dense} />
            )}

            {item.type === 'divider' && (
              <Divider className="my-4" />
            )}
          </React.Fragment>
        ))
      }
    </List>
  );

  if (navigation.length > 0) {
    return verticalNav;
  }
  else {
    return null;
  }
}

Navigation.propTypes = {
  navigation: PropTypes.array.isRequired
};

export default React.memo(Navigation);