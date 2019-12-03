import React, { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from 'app/store/actions';
import clsx from 'clsx';
import { Snackbar, SnackbarContent, withStyles, Icon, IconButton, Slide } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close';

const styles = theme => ({
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1),
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
});

const variantIcon = {
  success: "check_circle",
  warning: "warning",
  error  : "error_outline",
  info   : "info"
};

const variantStyles = {
  success: "text-green-900 bg-green-100",
  error: "text-red-900 bg-red-100",
  info: "text-blue-900 bg-blue-100",
  warning: "text-yellow-900 bg-yellow-100",
}

const SlideTransition = (props) => {
  return <Slide {...props} direction="down" />
}

const MessageAlert = memo(({ classes }) => {
  const dispatch = useDispatch();
  const options = useSelector(({ ui }) => ui)
  
  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      TransitionComponent={SlideTransition}
      open={options.showDialog}
      autoHideDuration={3000}
      onClose={() => dispatch(Actions.clearMessageDialog())}
    >
      <SnackbarContent
        className={clsx(variantStyles[options.dialogType])}
        aria-describedby="client-snackbar"
        message={
          <span id="client-snackbar" className={classes.message}>
            <Icon className={clsx(classes.icon, classes.iconVariant)}>
              {variantIcon[options.dialogType]}
            </Icon>
            {options.dialogMessage}
          </span>
        }
        action={[
          <IconButton key="close" aria-label="close" color="inherit" onClick={() => Actions.clearMessageDialog()}>
            <CloseIcon className={classes.icon} />
          </IconButton>,
        ]}
      />
    </Snackbar>
  )
})

export default withStyles(styles)(MessageAlert)