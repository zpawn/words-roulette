import React from "react";
import PropTypes from "prop-types";

import Typography from "@material-ui/core/Typography";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";

import DottedMenu from "./DottedMenu";

////

const translation = ({ id, translation, onChange, onRemove }) => (
  <TableRow>
    <TableCell>
      <Typography variant="subtitle1">{translation}</Typography>
    </TableCell>
    <TableCell align="right">
      <DottedMenu
        id={id}
        translation={translation}
        onChange={onChange}
        onRemove={onRemove}
      />
    </TableCell>
  </TableRow>
);

translation.propTypes = {
  translation: PropTypes.string,
  id: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
};

export default translation;
