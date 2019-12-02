import React from 'react';
import NumberFormat from 'react-number-format';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
  container: {
  },
  formControl: {
    // margin: theme.spacing.unit,
  },
  inputNumber:{}
  
});

class NumberFormatInput extends React.Component {

  render() {
    const { inputRef, onChange, classes, ...other } = this.props;

    const name = this.props.name
    return (
      <div className={classes.container}>
        <NumberFormat
          {...other}
          getInputRef={inputRef}
          onValueChange={values => {
            onChange({
              target: {
                name:name,
                value: values.value
              },
            });
          }}
        />
      </div>
    );
  }
}

NumberFormatInput.propTypes = {
  inputRef: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired
};

export default withStyles(styles)(NumberFormatInput);