import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";

import { styles } from "./index";

////

class DottedMenu extends PureComponent {
  state = {
    anchorEl: null,
    isDialogOpen: false,
  };

  anchorElHandler = (anchorEl) => this.setState({ anchorEl });

  isDialogOpenHandler = (isDialogOpen) => this.setState({ isDialogOpen });

  onMenuOpen = (e) => this.anchorElHandler(e.currentTarget);

  onMenuClose = () => this.anchorElHandler(null);

  onDialogOpen = () => this.isDialogOpenHandler(true);

  onDialogClose = () => {
    this.isDialogOpenHandler(false);
    this.onMenuClose();
  };

  onRemove = () => {
    const { wordId, onWordRemove } = this.props;

    onWordRemove(wordId);
    this.onDialogClose();
    this.onMenuClose();
  };

  render() {
    const { anchorEl, isDialogOpen } = this.state;
    const { wordId, classes } = this.props;

    return (
      <>
        <IconButton
          aria-owns={anchorEl ? "dottedMenu" : undefined}
          aria-haspopup="true"
          onClick={this.onMenuOpen}
        >
          <MoreVertIcon />
        </IconButton>

        <Menu
          id="dottedMenu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.onMenuClose}
        >
          <MenuItem
            onClick={this.onMenuClose}
            component={NavLink}
            to={`/words/${wordId}`}
          >
            Edit
          </MenuItem>
          <MenuItem onClick={this.onDialogOpen}>Remove</MenuItem>
        </Menu>

        <Dialog
          open={isDialogOpen}
          onClose={this.onDialogClose}
          aria-labelledby="dialog-submit-title"
        >
          <DialogTitle id="dialog-submit-title">Are you sure?</DialogTitle>
          <DialogActions className={classes.DialogButtons}>
            <Button onClick={this.onDialogClose} color="primary">
              No
            </Button>
            <Button onClick={this.onRemove} color="primary" autoFocus>
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </>
    )
  }
}

DottedMenu.propTypes = {
  wordId: PropTypes.string.isRequired,
  onWordRemove: PropTypes.func.isRequired
};

export default withStyles(styles)(DottedMenu);
