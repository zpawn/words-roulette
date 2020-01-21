import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";

import { styles } from "./index";
import Translation from "./Translation";

////

const translations = ({ translations, onChange, onRemove }) => (
  <Table padding="none">
    <TableBody>
      {translations.map((t, id) => (
        <Translation
          key={id}
          id={id}
          translation={t}
          onChange={onChange(id)}
          onRemove={onRemove(id)}
        />
      ))}
    </TableBody>
  </Table>
);

translations.propTypes = {
  translations: PropTypes.array,
  onChange: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
};

export default withStyles(styles)(translations);
