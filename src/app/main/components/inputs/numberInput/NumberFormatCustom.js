import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import NumberFormatInput from './NumberFormatInput';
// import NumberFormat from 'react-number-format';


const styles = theme => ({
    container: {
    },
    formControl: {
        // margin: theme.spacing.unit,
    },
});


class NumberFormatCustom extends React.Component {

    render() {
        const { classes, onChange, tabIndex, InputProps, ...other } = this.props;

        return (
            <div className={classes.container}>

                <TextField
                    {...other}
                    // className={classes.textField}
                    value={this.props.value}
                    onChange={onChange}
                    id="formatted-numberformat-input"
                    variant="outlined"
                    // type="number"   
                    InputProps={{
                        inputComponent: (InputProps) =>
                            <NumberFormatInput
                                {...InputProps}
                                {...InputProps}

                                thousandSeparator={this.props.thousandSeparator}
                                decimalSeparator={this.props.decimalSeparator}
                                fixedDecimalScale={this.props.fixedDecimalScale}
                                type="tel"
                                prefix={this.props.prefix}
                                format={this.props.format}
                                mask={this.props.mask}
                                allowNegative={this.props.allowNegative}
                                decimalScale={this.props.decimalScale}
                                tabIndex={tabIndex}
                            />
                    }}

                />
            </div>
        );
    }
}

NumberFormatCustom.propTypes = {
    classes: PropTypes.object.isRequired,
    thousandSeparator: PropTypes.string,
    decimalSeparator: PropTypes.string,

};

export default withStyles(styles)(NumberFormatCustom);