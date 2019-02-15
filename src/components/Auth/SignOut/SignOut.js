import { PureComponent } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { authSignOut } from "../../../store/auth";

////

const mapDispatchToProps = dispatch => ({
  onSignOut: () => dispatch(authSignOut())
});

////

class SignOut extends PureComponent {
  componentDidMount() {
    this.props.onSignOut();
  }

  render() {
    return null;
  }
}

SignOut.propTypes = {
  onSignOut: PropTypes.func.isRequired
};

export default connect(
  null,
  mapDispatchToProps
)(SignOut);
