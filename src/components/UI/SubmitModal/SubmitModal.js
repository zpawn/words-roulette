import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";

import { styles } from '.'

class SubmitModal extends Component {

  static defaultProps = { isOpen: false };

  state = {
    isOpen: false
  };

  onClose = () => this.setState({ isOpen: false });

  onAction = () => {
    const { fn } = this.props;

    fn && fn();
    this.onClose()
  };

  componentDidMount() {
    const { isOpen } = this.props;

    this.setState({ isOpen })
  }

  render() {
    const { isOpen } = this.state;
    const { classes, fn } = this.props;

    return (
      <Dialog
        open={isOpen}
        onClose={this.onClose}
        aria-labelledby="dialog-submit-title"
      >
        <DialogTitle id="dialog-submit-title">Are you sure?</DialogTitle>
        <DialogActions className={classes.SubmitModal}>
          <Button onClick={this.onClose} color="primary">
            No
          </Button>
          <Button onClick={this.onAction} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

SubmitModal.propTypes = {
  isOpen: PropTypes.bool,
  fn: PropTypes.func,
};

export default withStyles(styles)(SubmitModal);
