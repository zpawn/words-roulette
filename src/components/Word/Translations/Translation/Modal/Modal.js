import React from "react";
import PropTypes from "prop-types";
import {
  compose,
  withState,
  setPropTypes,
  defaultProps,
  withHandlers,
  setDisplayName,
  withPropsOnChange
} from "recompose";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

////

const modal = compose(
  setDisplayName("TranslationModal"),

  defaultProps({
    isOpen: false
  }),

  setPropTypes({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    translation: PropTypes.string,
    labels: PropTypes.array,
    onChange: PropTypes.func,
    isOpen: PropTypes.bool,
    onClose: PropTypes.func
  }),

  withState("value", "onValueHandler", ""),

  withHandlers({
    onChangeValue: ({ onValueHandler }) => ({ target: { value } }) =>
      onValueHandler(value),

    onSave: ({ value, onChange, onClose }) => () => {
      onClose();
      onChange(value);
    }
  }),

  withPropsOnChange(["translation"], ({ translation, onValueHandler }) =>
    onValueHandler(translation)
  )
)(({ isOpen, onClose, id, value, onChangeValue, onSave }) => (
  <Dialog
    fullWidth={true}
    maxWidth="lg"
    open={isOpen}
    onClose={onClose}
    aria-labelledby="modal-translation"
  >
    <DialogTitle id="modal-translation">Edit</DialogTitle>
    <DialogContent>
      <TextField
        autoFocus
        fullWidth
        id={`Translation-${id}`}
        margin="normal"
        value={value}
        onChange={onChangeValue}
      />
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose} color="primary">
        Cancel
      </Button>
      <Button onClick={onSave} variant="contained" color="primary">
        Save
      </Button>
    </DialogActions>
  </Dialog>
));

export default modal;
