import React, { Component } from "react";
import PropTypes from "prop-types";

import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

////

class DottedMenu extends Component {
  static defaultProps = { items: [] };

  state = {
    anchorEl: null,
  };

  onOpen = (e) => this.setState({ anchorEl: e.currentTarget });

  onClose = () => this.setState({ anchorEl: null });

  onHandlerItem = (fn) => () => {
    fn && fn();
    this.onClose();
  };

  render() {
    const { anchorEl } = this.state;
    const { items } = this.props;

    return (
      <>
        <IconButton
          aria-owns={anchorEl ? "dottedMenu" : undefined}
          aria-haspopup="true"
          onClick={this.onOpen}
        >
          <MoreVertIcon />
        </IconButton>

        <Menu
          id="dottedMenu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.onClose}
        >
          {
            items.map(({ title, fn }, index) => (
              <MenuItem
                key={index}
                onClick={this.onHandlerItem(fn)}
              >{title}</MenuItem>
            ))
          }
        </Menu>
      </>
    );
  }
}

DottedMenu.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    fn: PropTypes.func,
  }))
};

export default DottedMenu;
