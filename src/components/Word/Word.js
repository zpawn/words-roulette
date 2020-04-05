import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import isEmpty from 'lodash/isEmpty';
import cloneDeep from 'lodash/cloneDeep';
import has from 'lodash/has'
import { withStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";

import { mergeNewTranslations, styles } from "./index";
import { wordUpdate, wordRemove } from "../../store/words";
import { Word as NewWord, Submit, AddNewTranslation } from "../New";
import Translations from './Translations';

const mapStateToProps = state => ({
  words: state.words.items
});

const mapDispatchToProps = dispatch => ({
  onUpdate: (id, word) => dispatch(wordUpdate(id, word)),
  onRemove: (id) => dispatch(wordRemove(id)),
});

class Word extends Component {
  state = {
    id: '',
    word: null,
    newTranslation: '',
  };

  onSave = () => {
    const { onUpdate } = this.props;
    const { id, word, newTranslation } = this.state;
    const newWord = mergeNewTranslations(word, newTranslation);

    onUpdate(id, newWord).then(() => this.setState({ newTranslation: '' }));
  }

  onNewTranslationChange = ({ target: { value }}) => {
    this.setState({ newTranslation: value });
  }

  onNewTranslationsAdd = () => {
    const { word, newTranslation } = this.state;

    this.setState({
      word: mergeNewTranslations(word, newTranslation),
      newTranslation: '',
    });
  }

  onRemoveTranslation = (id) => () => {
    const { word } = this.state;
    const newWord = cloneDeep(word);
    newWord.translations = newWord.translations.filter((t, index) => index !==id);
    this.setState({ word: newWord })
  }

  onChangeTranslation = (id) => (translation) => {
    const { word } = this.state;
    if (has(word, `translations.${id}`)) {
      const newWord = cloneDeep(word);
      newWord.translations[id] = translation;
      this.setState({ word: newWord });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { words } = this.props;
    const { id } = this.state;
    if (prevProps.words !== words && id && words[id]) {
      this.setState({ word: words[id] })
    }
  }

  componentDidMount() {
    const { words, match: { params: { id } } } = this.props;

    if (id) { this.setState({ id }); }
    if (!isEmpty(words[id])) { this.setState({ word: words[id] }); }
  }


  render() {
    const { word, newTranslation } = this.state;
    const { classes } = this.props;

    if (isEmpty(word)) {
      return <CircularProgress color="secondary" />;
    }

    return (
      <>
        <NewWord word={word.name} disabled />
        <Typography variant="caption" className={classes.subTitle}>
          Translations:
        </Typography>

        <Translations
          translations={word.translations || []}
          onChange={this.onChangeTranslation}
          onRemove={this.onRemoveTranslation}
        />

        <AddNewTranslation
          newTranslation={newTranslation}
          onChange={this.onNewTranslationChange}
          onAddTranslations={this.onNewTranslationsAdd}
        />

        <Submit onSubmit={this.onSave} title="Save" />
      </>
    )
  }
}

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)(Word);
