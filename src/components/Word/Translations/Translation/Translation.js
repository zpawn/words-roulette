import React from "react";
import PropTypes from "prop-types";

import TextField from "@material-ui/core/TextField";

////

const translation = ({ id, value, onChange }) => (
  <TextField
    autoFocus
    fullWidth
    id={`Translation-${id}`}
    margin="normal"
    value={value}
    onChange={onChange}
  />
);

translation.propTypes = {
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string
};

export default translation;
