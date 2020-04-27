import React from "react";
import PropTypes from "prop-types";

import TextField from "@material-ui/core/TextField";

////

const word = ({ name, word, disabled, onChange }) => (
  <TextField
    autoFocus
    fullWidth
    id="Word"
    label="Word"
    margin="normal"
    name={name}
    value={word}
    disabled={disabled}
    {...(onChange ? { onChange } : {})}
  />
);

word.defaultProps = {
  disabled: false
};

word.propTypes = {
  name: PropTypes.string,
  word: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  onChange: PropTypes.func
};

export default word;
