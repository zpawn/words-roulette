import React from "react";
import { connect } from "react-redux";
import {
  compose,
  withState,
  withHandlers,
  setDisplayName,
  withPropsOnChange
} from "recompose";

import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";

import history from "../../../history";
import { initForm, authSignIn } from "../../../store/auth";
import Button from "../../UI/Button";

////

const mapStateToProps = state => ({
  isSignIn: state.auth.isSignIn
});

const mapDispatchToProps = dispatch => ({
  onSignIn: (email, password) => dispatch(authSignIn(email, password))
});

////

const signIn = compose(
  setDisplayName("Auth"),

  connect(
    mapStateToProps,
    mapDispatchToProps
  ),

  withState("form", "onFormHandler", initForm),

  withHandlers({
    onChange: ({ form, onFormHandler }) => ({ target: { name, value } }) => {
      const updated = Object.assign({}, form, { [name]: value });
      onFormHandler(updated);
    },

    onSubmit: ({ form: { email, password }, onSignIn }) => e => {
      e.preventDefault();
      onSignIn(email, password);
    }
  }),

  withPropsOnChange(["isSignIn"], ({ isSignIn }) => {
    if (isSignIn) {
      history.push("/");
    }
  })
)(({ onChange, onSubmit, form: { email, password } }) => (
  <>
    <Typography align="center" variant="h4">
      SignIn
    </Typography>

    <form onSubmit={onSubmit}>
      <TextField
        autoFocus
        fullWidth
        id="email"
        label="Email"
        margin="normal"
        name="email"
        value={email}
        onChange={onChange}
      />

      <TextField
        fullWidth
        type="password"
        id="password"
        label="password"
        name="password"
        value={password}
        margin="normal"
        onChange={onChange}
      />

      <Button type="submit">Send</Button>
    </form>
  </>
));

export default signIn;
