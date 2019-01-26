import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import {
  compose,
  withState,
  withHandlers,
  setPropTypes,
  setDisplayName
} from "recompose";

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

const dottedMenu = compose(
  setDisplayName("WordsDottedMenu"),

  withStyles(styles),

  setPropTypes({
    wordId: PropTypes.string.isRequired,
    onWordRemove: PropTypes.func.isRequired
  }),

  withState("anchorEl", "anchorElHandler", null),
  withState("isDialogOpen", "isDialogOpenHandler", false),

  withHandlers({
    onMenuOpen: ({ anchorElHandler }) => e => anchorElHandler(e.currentTarget),

    onMenuClose: ({ anchorElHandler }) => () => anchorElHandler(null)
  }),

  withHandlers({
    onDialogOpen: ({ isDialogOpenHandler }) => () => isDialogOpenHandler(true),

    onDialogClose: ({ isDialogOpenHandler, onMenuClose }) => () => {
      isDialogOpenHandler(false);
      onMenuClose();
    }
  }),

  withHandlers({
    onRemove: ({ wordId, onWordRemove, onMenuClose, onDialogClose }) => () => {
      onWordRemove(wordId);
      onDialogClose();
      onMenuClose();
    }
  })
)(
  ({
    classes,
    wordId,
    anchorEl,
    onMenuOpen,
    onMenuClose,
    onRemove,
    isDialogOpen,
    onDialogOpen,
    onDialogClose
  }) => (
    <>
      <IconButton
        aria-owns={anchorEl ? "dottedMenu" : undefined}
        aria-haspopup="true"
        onClick={onMenuOpen}
      >
        <MoreVertIcon />
      </IconButton>

      <Menu
        id="dottedMenu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={onMenuClose}
      >
        <MenuItem
          onClick={onMenuClose}
          component={NavLink}
          to={`/words/${wordId}`}
        >
          Edit
        </MenuItem>
        <MenuItem onClick={onDialogOpen}>Remove</MenuItem>
      </Menu>

      <Dialog
        open={isDialogOpen}
        onClose={onDialogClose}
        aria-labelledby="dialog-submit-title"
      >
        <DialogTitle id="dialog-submit-title">Are you sure?</DialogTitle>
        <DialogActions className={classes.DialogButtons}>
          <Button onClick={onDialogClose} color="primary">
            No
          </Button>
          <Button onClick={onRemove} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
);

export default dottedMenu;
