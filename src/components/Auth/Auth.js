import React from "react";
import { compose, withHandlers, setDisplayName } from "recompose";

import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";

import Button from "../UI/Button";

////

const auth = compose(
  setDisplayName("Auth"),

  withHandlers({
    onSubmit: () => e => {
      e.preventDefault();
    }
  })
)(({ onSubmit }) => (
  <>
    <Typography align="center" variant="h4">
      Auth
    </Typography>

    <form onSubmit={onSubmit}>
      <TextField autoFocus fullWidth id="email" label="Email" margin="normal" />

      <TextField
        autoFocus
        fullWidth
        type="password"
        id="password"
        label="password"
        margin="normal"
      />

      <Button type="submit">Send</Button>
    </form>
  </>
));

export default auth;
