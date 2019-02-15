import React from "react";
import { connect } from "react-redux";
import { compose, withHandlers, setDisplayName } from "recompose";
import TextField from "@material-ui/core/TextField";

import { rouletteSettingsChange } from "../../../../store/rouletteSettings";

////

const mapStateToProps = state => ({
  count: state.rouletteSettings.count
});

const mapDispatchToProps = dispatch => ({
  onChangeSettings: (name, value) =>
    dispatch(rouletteSettingsChange(name, value))
});

////

const wordsCount = compose(
  setDisplayName("WordsCount"),

  connect(
    mapStateToProps,
    mapDispatchToProps
  ),

  withHandlers({
    onChange: ({ onChangeSettings }) => name => e => {
      const { value } = e.target;
      if (name && value) {
        onChangeSettings(name, Math.abs(value));
      }
    }
  })
)(({ count, onChange }) => (
  <TextField
    fullWidth
    margin="normal"
    label="Words count"
    type="number"
    value={count}
    onChange={onChange("count")}
    InputLabelProps={{
      shrink: true
    }}
  />
));

export default wordsCount;
