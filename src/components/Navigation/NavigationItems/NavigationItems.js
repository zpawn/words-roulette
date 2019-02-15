import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import List from "@material-ui/core/List";
import AddIcon from "@material-ui/icons/Add";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ExitIcon from "@material-ui/icons/ExitToApp";
import SignInIcon from "@material-ui/icons/PlayForWork";
import ListIcon from "@material-ui/icons/FormatListBulleted";
import GamepadIcon from "@material-ui/icons/Gamepad";

import NavigationItem from "./NavigationItem";

////

const mapStateToProps = state => ({
  isSignIn: state.auth.isSignIn
});

////

const navigationItems = ({ isSignIn }) => (
  <List style={{ width: "250px" }}>
    <NavigationItem text="Dashboard" icon={<DashboardIcon />} />
    <NavigationItem route="/new" text="New" icon={<AddIcon />} />
    <NavigationItem route="/words" text="All Words" icon={<ListIcon />} />
    <NavigationItem
      route="/roulette/settings"
      text="Roulette"
      icon={<GamepadIcon />}
    />
    {isSignIn ? (
      <NavigationItem route="/signout" text="Exit" icon={<ExitIcon />} />
    ) : (
      <NavigationItem route="/signin" text="Login" icon={<SignInIcon />} />
    )}
  </List>
);

navigationItems.propTypes = {
  isSignIn: PropTypes.bool.isRequired
};

export default connect(mapStateToProps)(navigationItems);
