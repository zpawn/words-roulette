import React from "react";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Fab from "@material-ui/core/Fab";

import { styles } from "./index";

////

const button = ({ classes, disabled, onClick, type, children, color }) => {
  const buttonProps = {
    className: classes.button,
    variant: "extended",
    "aria-label": type,
    type: type,
    disabled: disabled
  };

  if (onClick) {
    buttonProps.onClick = onClick;
  }

  switch (color) {
    case "gray":
      buttonProps.color = "default";
      break;
    default:
      buttonProps.color = color;
  }

  return (
    <Grid
      container
      spacing={8}
      direction="row"
      justify="center"
      alignItems="center"
    >
      <Fab {...buttonProps}>{children}</Fab>
    </Grid>
  );
};

button.defaultProps = {
  disabled: false,
  onClick: null,
  type: "button",
  children: "Submit",
  color: "primary"
};

button.propTypes = {
  classes: PropTypes.object.isRequired,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(["button", "submit"]),
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  color: PropTypes.oneOf(["gray", "primary", "secondary"])
};

export default withStyles(styles)(button);
