import React from "react";
import PropTypes from "prop-types";
import {
  compose,
  setPropTypes,
  withHandlers,
  setDisplayName,
  withStateHandlers
} from "recompose";

import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

import Modal from "../Modal";

////

const dottedMenu = compose(
  setDisplayName("TranslationDottedMenu"),

  setPropTypes({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    translation: PropTypes.string,
    labels: PropTypes.array,
    onChange: PropTypes.func
  }),

  withStateHandlers(
    {
      anchorEl: null,
      isDialogOpen: false
    },
    {
      anchorElHandler: () => anchorEl => ({ anchorEl }),
      isDialogOpenHandler: () => isDialogOpen => ({ isDialogOpen })
    }
  ),

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
  })
)(
  ({
    anchorEl,
    onMenuOpen,
    onMenuClose,
    isDialogOpen,
    onDialogOpen,
    onDialogClose,
    id,
    translation,
    labels,
    onChange
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
        <MenuItem onClick={onDialogOpen}>Edit</MenuItem>
        <MenuItem onClick={onMenuClose}>Remove</MenuItem>
      </Menu>

      <Modal
        isOpen={isDialogOpen}
        onClose={onDialogClose}
        translation={translation}
        labels={labels}
        onChange={onChange}
        id={id}
      />
    </>
  )
);

export default dottedMenu;
