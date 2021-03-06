import React from "react";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Fab from "@material-ui/core/Fab";

import { styles } from "./index";

////

const submit = ({ classes, onSubmit, disabled, title }) => (
  <Grid
    container
    spacing={8}
    direction="row"
    justify="center"
    alignItems="center"
  >
    <Fab
      className={classes.button}
      variant="extended"
      aria-label="Submit"
      color="primary"
      onClick={onSubmit}
      type="submit"
      disabled={disabled}
    >
      {title}
    </Fab>
  </Grid>
);

submit.defaultProps = {
  disabled: false,
  title: "Submit"
};

submit.propTypes = {
  classes: PropTypes.object,
  onSubmit: PropTypes.func,
  disabled: PropTypes.bool,
  title: PropTypes.string
};

export default withStyles(styles)(submit);
