import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";

import { styles } from "./index";
import Translation from "./Translation";

////

const translations = ({ translations, onChange }) => (
  <Table padding="none">
    <TableBody>
      {Object.keys(translations).map(id => (
        <Translation
          key={id}
          id={id}
          {...translations[id]}
          onChange={onChange(id)}
        />
      ))}
    </TableBody>
  </Table>
);

translations.propTypes = {
  translations: PropTypes.object,
  onChange: PropTypes.func.isRequired
};

export default withStyles(styles)(translations);
