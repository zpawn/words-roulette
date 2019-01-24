import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import { styles } from "./index";

////

const footer = ({ classes }) => (
  <footer className={classes.root}>
    <Typography variant="subtitle1" color="textSecondary" component="p">
      &#x1F6E0; -> &#x2764; -> xt3.js
    </Typography>
  </footer>
);

footer.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(footer);
