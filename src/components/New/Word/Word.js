import React from "react";
import PropTypes from "prop-types";

import TextField from "@material-ui/core/TextField";

////

const word = ({ word, disabled, onChange }) => (
  <TextField
    autoFocus
    fullWidth
    id="Word"
    label="Word"
    margin="normal"
    name={word}
    value={word}
    onChange={onChange}
    disabled={disabled}
    {...(onChange ? { onChange } : {})}
  />
);

word.defaultProps = {
  disabled: false
};

word.propTypes = {
  word: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
};

export default word;
