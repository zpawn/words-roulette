import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { compose, defaultProps, setPropTypes, setDisplayName } from "recompose";

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

const alert = compose(
  setDisplayName("Alert"),

  withStyles(styles),

  connect(
    null,
    mapDispatchToProps
  ),

  defaultProps({
    variant: "success"
  }),

  setPropTypes({
    classes: PropTypes.object,
    id: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    onRemove: PropTypes.func.isRequired,
    variant: PropTypes.oneOf(["success", "warning", "error", "info", "default"])
  })
)(({ id, classes, variant, message, onRemove }) => (
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
));

export default alert;
