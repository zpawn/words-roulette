import React, { PureComponent } from "react";
import AppBar from "@material-ui/core/AppBar";
import Drawer from "@material-ui/core/Drawer";

import TopAppBar from "./TopAppBar";
import NavigationItems from "./NavigationItems";

////

class Navigation extends PureComponent {
  state = {
    isOpen: false
  };

  isOpenToggle = () => this.setState({ isOpen: !this.state.isOpen });

  render() {
    const { isOpen } = this.state;

    return (
      <AppBar position="static">
        <TopAppBar onClick={this.isOpenToggle} />
        <Drawer open={isOpen} onClose={() => this.isOpenToggle(false)}>
          <div
            tabIndex={0}
            role="button"
            onClick={() => this.isOpenToggle(false)}
            onKeyDown={() => this.isOpenToggle(false)}
          >
            <NavigationItems />
          </div>
        </Drawer>
      </AppBar>
    )
  }
}

export default Navigation;
