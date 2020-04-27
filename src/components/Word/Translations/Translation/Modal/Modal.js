import React, { PureComponent } from "react";
import PropTypes from "prop-types";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

////

class Modal extends PureComponent {
  constructor(props) {
    super(props);

    const { translation = "" } = props;
    this.state = { value: translation };
  }

  onChangeValue = ({ target: { value } }) => this.setState({ value });

  onSave = () => {
    const { value } = this.state;
    const { onChange, onClose } = this.props;
    onClose();
    onChange(value);
  };

  render() {
    const { value } = this.state;
    const { id, isOpen, onClose } = this.props;

    return (
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
            onChange={this.onChangeValue}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
          <Button onClick={this.onSave} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

Modal.defaultProps = {
  isOpen: false
};

Modal.propTypes = {
  id: PropTypes.number,
  translation: PropTypes.string,
  labels: PropTypes.array,
  onChange: PropTypes.func,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func
};

export default Modal;
