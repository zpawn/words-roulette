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
    const { onSignOut, history } = this.props;
    onSignOut().then(() => history.push("/"));
  }

  render() {
    return null;
  }
}

SignOut.propTypes = {
  history: PropTypes.object,
  onSignOut: PropTypes.func.isRequired
};

export default connect(null, mapDispatchToProps)(SignOut);
