import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { compose } from "redux";

import { withStyles } from "@material-ui/core/styles";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

import { alertRemove } from "../../../../store/alerts";
import { styles } from "./index";

////

const mapDispatchToProps = dispatch => ({
  onRemove: id => dispatch(alertRemove(id))
});

const alert = ({ id, classes, variant, message, onRemove }) => {
  return (
    <SnackbarContent
      className={[classes.Alert, classes[variant]].join(" ")}
      aria-describedby="client-snackbar"
      message={message}
      action={[
        <IconButton
          key="close"
          aria-label="Close"
          color="inherit"
          onClick={() => onRemove(id)}
        >
          <CloseIcon />
        </IconButton>
      ]}
    />
  );
};

alert.defaultProps = {
  variant: "success"
};

alert.propTypes = {
  classes: PropTypes.object,
  id: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  onRemove: PropTypes.func.isRequired,
  variant: PropTypes.oneOf(["success", "warning", "error", "info", "default"])
};

export default compose(
  withStyles(styles),
  connect(null, mapDispatchToProps)
)(alert);
