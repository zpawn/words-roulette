import React from "react";
import PropTypes from "prop-types";

import Typography from "@material-ui/core/Typography";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";

import DottedMenu from "./DottedMenu";

////

const translation = ({ id, translation, labels, onChange }) => (
  <TableRow>
    <TableCell>
      <Typography variant="subtitle1">{translation}</Typography>
    </TableCell>
    <TableCell align="right">
      <DottedMenu
        id={id}
        translation={translation}
        labels={labels}
        onChange={onChange}
      />
    </TableCell>
  </TableRow>
);

translation.propTypes = {
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  onChange: PropTypes.func.isRequired,
  translation: PropTypes.string,
  labels: PropTypes.array
};

export default translation;
