import React from "react";
import { connect } from "react-redux";
import { compose } from 'redux';
import PropTypes from "prop-types";
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

const alerts = ({ classes, alerts }) => {
  return _isEmpty(alerts) ? null : (
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
  )
};

alerts.propTypes = {
  alerts: PropTypes.array,
  classes: PropTypes.object.isRequired
};

export default compose(
  withStyles(styles),
  connect(mapStateToProps),
)(alerts);
