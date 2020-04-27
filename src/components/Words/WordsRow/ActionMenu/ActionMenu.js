import React, { Component } from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

import { DottedMenu } from "../../../UI/DottedMenu";
import { SubmitModal } from "../../../UI/SubmitModal";

class ActionMenu extends Component {
  state = {
    isOpen: false
  };

  onRemove = () => {
    const { onWordRemove } = this.props;
    onWordRemove();
  };

  onOpen = () => {
    this.setState({ isOpen: true });
  };

  render() {
    const { isOpen } = this.state;
    const { wordId } = this.props;

    return (
      <>
        <DottedMenu
          items={[
            { title: "Edit", component: NavLink, to: `/words/${wordId}` },
            { title: "Remove", fn: this.onOpen }
          ]}
        />
        <SubmitModal isOpen={isOpen} fn={this.onRemove} />
      </>
    );
  }
}

ActionMenu.propTypes = {
  wordId: PropTypes.string.isRequired,
  onWordRemove: PropTypes.func.isRequired
};

export default ActionMenu;
