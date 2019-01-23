import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { compose, setPropTypes, setDisplayName } from "recompose";
import _isEmpty from "lodash/isEmpty";

import { withStyles } from "@material-ui/core/styles";
import Snackbar from "@material-ui/core/Snackbar";

import { styles } from "./index";
import Alert from "./Alert";

////

const mapStateToProps = state => ({
  alerts: state.alerts.items
});

////

const alerts = compose(
  setDisplayName("Alerts"),

  setPropTypes({
    alerts: PropTypes.array,
    classes: PropTypes.object.isRequired
  }),

  connect(mapStateToProps)
)(({ classes, alerts }) => {
  return !Array.isArray(alerts) || _isEmpty(alerts) ? null : (
    <Snackbar
      className={classes.Alert}
      anchorOrigin={{
        vertical: "top",
        horizontal: "center"
      }}
      open={true}
    >
      <div>
        {alerts.map((item, key) => (
          <Alert key={key} {...item} />
        ))}
      </div>
    </Snackbar>
  );
});

export default withStyles(styles)(alerts);
