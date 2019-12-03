import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from 'app/store/actions';
import clsx from 'clsx';
import { Snackbar, SnackbarContent, withStyles, IconButton, Slide } from '@material-ui/core'
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import { green, yellow, red, teal } from '@material-ui/core/colors';
import WarningIcon from '@material-ui/icons/Warning';

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
};

const styles = theme => ({
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: red[300],
  },
  info: {
    backgroundColor: teal[300],
  },
  warning: {
    backgroundColor: yellow[300],
  },
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

const ContentWrapper = ({ classes, className, message, onClose, variant, ...other }) => {
  const Icon = variantIcon[variant];

  return (
    <SnackbarContent
      className={clsx(classes[variant], className)}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          <Icon className={clsx(classes.icon, classes.iconVariant)} />
          {message}
        </span>
      }
      action={[
        <IconButton key="close" aria-label="close" color="inherit" onClick={onClose}>
          <CloseIcon className={classes.icon} />
        </IconButton>,
      ]}
      {...other}
    />
  );
}

const MessageAlert = ({  }) => {
  const dispatch = useDispatch();
  const options = useSelector(({ ui }) => ui)


  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      TransitionComponent={<Slide direction="down" />}
      open={options.showDialog}
      onRequestClose={() => dispatch(Actions.clearMessageDialog())}
      autoHideDuration={3000}
      onClose={() => dispatch(Actions.clearMessageDialog())}
    >
      <ContentWrapper
        onClose={() => dispatch(Actions.clearMessageDialog())}
        variant={option.dialogType}
        message={option.dialogMessage}
      />
    </Snackbar>
  )
}

export default withStyles(styles)(MessageAlert)