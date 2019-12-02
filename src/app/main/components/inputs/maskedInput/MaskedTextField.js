import React from "react";
import { TextField } from "@material-ui/core";
import MaskedInput from "react-text-mask";

const TextMaskCustom = props => {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={ref => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={[
        "(",
        /[1-9]/,
        /\d/,
        ")",
        " ",
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        "-",
        /\d/,
        /\d/,
        /\d/,
        /\d/
      ]}
      placeholderChar={"\u2000"}
      showMask
      keepCharPositions={true}
    />
  );
};

const MaskedTextField = props => {
  return (
    <TextField
      {...props}
      InputProps={{
        inputComponent: TextMaskCustom
      }}
    />
  )
}

export default MaskedTextField