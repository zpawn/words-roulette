import { PureComponent } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { wordsFetch } from "../store/words";
import { authCheck } from "../store/auth";

////

const mapDispatchToProps = dispatch => ({
  onFetchWords: () => dispatch(wordsFetch()),
  onAuth: () => dispatch(authCheck())
});

////

class Preload extends PureComponent {
  componentDidMount() {
    this.props.onFetchWords();
    this.props.onAuth();
  }

  render() {
    return null;
  }
}

Preload.propTypes = {
  onAuth: PropTypes.func.isRequired,
  onFetchWords: PropTypes.func.isRequired
};

export default connect(
  null,
  mapDispatchToProps
)(Preload);
