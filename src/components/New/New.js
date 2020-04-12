import React, { Component } from "react";
import { connect } from "react-redux";
import isEmpty from "lodash/isEmpty"
import Typography from "@material-ui/core/Typography";

import { wordSave } from "../../store/words";
import Word from "./Word";
import Submit from "./Submit";

////

const mapDispatchToProps = dispatch => ({
  onSave: (word) => dispatch(wordSave(word))
});

////

class New extends Component {
  state = {
    word: {
      name: '',
    },
    processing: false,
    isSuccess: true
  };

  onChangeWord = ({ target: { value } }) => {
    this.setState({
      word: {
        ...this.state.word,
        name: value
      }
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { onSave, history } = this.props;
    const { word } = this.state;
    word.name = word.name.trim();

    if (!isEmpty(word.name)) {
      this.setState({ disabled: true });
      onSave(word)
        .then((id) => {
          history.push(`/words/${id}`)
        })
        .catch(() => this.setState({ processing: false }))
        .finally(() => this.setState({ processing: false }))
    }
  };

  render() {
    const { word: { name }, processing } = this.state;

    return (
      <>
        <form noValidate autoComplete="off">
          <Typography align="center" variant="h4">
            New Word
          </Typography>

          <Word
            name="newWord"
            word={name}
            onChange={this.onChangeWord}
            disabled={processing}
          />

          <Submit onSubmit={this.onSubmit} disabled={processing} />
        </form>
      </>
    )
  }
}

export default connect(
  null,
  mapDispatchToProps
)(New);
