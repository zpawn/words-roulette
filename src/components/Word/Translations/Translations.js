import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import { styles } from "./index";
import Translation from "./Translation";

////

const translations = ({ translations, onChange }) =>
  Object.keys(translations).map(id => (
    <Translation
      key={id}
      id={id}
      value={translations[id].translation}
      onChange={onChange(id)}
    />
  ));

translations.propTypes = {
  translations: PropTypes.object,
  onChange: PropTypes.func.isRequired
};

export default withStyles(styles)(translations);
