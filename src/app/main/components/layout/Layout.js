import React from 'react';
import { makeStyles } from '@material-ui/styles';
import ToolbarLayout from './toolbar/ToolbarLayout';
import NavbarWrapperLayout from './navbar/NavbarWrapperLayout';
import clsx from 'clsx';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    backgroundColor: "#FFF",
    color: theme.palette.text.primary,
    scrollContent: {
      '& $wrapper': {},
      '& $contentWrapper': {},
      '& $content': {}
    }
  },
  wrapper: {
    display: 'flex',
    position: 'relative',
    width: '100%',
    height: '100%',
    flex: '1 1 auto',
  },
  contentWrapper: {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    zIndex: 3,
    overflow: 'hidden',
    flex: '1 1 auto'
  },
  content: {
    position: 'relative',
    display: 'flex',
    overflow: 'auto',
    flex: '1 1 auto',
    flexDirection: 'column',
    width: '100%',
    '-webkit-overflow-scrolling': 'touch',
    zIndex: 2
  }
}));

const Layout = (props) => {
  const classes = useStyles(props);

  return (
    <div className={clsx(classes.root, classes.scrollContent)}>
      <div className="flex flex-1 flex-col overflow-hidden relative">
        <div className={classes.wrapper}>
          <NavbarWrapperLayout />
          <div className={classes.contentWrapper}>
            <ToolbarLayout {...props} />
            <div className={classes.content}>
              {props.children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(Layout);