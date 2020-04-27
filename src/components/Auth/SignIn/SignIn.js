import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { authSignIn } from "../../../store/auth";
import Button from "../../UI/Button";

////

const mapStateToProps = state => ({
  isSignIn: state.auth.isSignIn
});

const mapDispatchToProps = dispatch => ({
  onSignIn: (email, password) => dispatch(authSignIn(email, password))
});

////

class SignIn extends PureComponent {
  state = {
    email: "",
    password: ""
  };

  onChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  onSubmit = e => {
    e.preventDefault();

    const { email, password } = this.state;
    const { onSignIn, history } = this.props;

    onSignIn(email, password).then(() => history.push("/"));
  };

  render() {
    const { email, password } = this.state;

    return (
      <>
        <Typography align="center" variant="h4">
          SignIn
        </Typography>

        <form onSubmit={this.onSubmit}>
          <TextField
            autoFocus
            fullWidth
            id="email"
            label="Email"
            margin="normal"
            name="email"
            value={email}
            onChange={this.onChange}
          />

          <TextField
            fullWidth
            type="password"
            id="password"
            label="password"
            name="password"
            value={password}
            margin="normal"
            onChange={this.onChange}
          />

          <Button type="submit">Send</Button>
        </form>
      </>
    );
  }
}

SignIn.propTypes = {
  isSignIn: PropTypes.bool,
  onSignIn: PropTypes.func,
  history: PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
