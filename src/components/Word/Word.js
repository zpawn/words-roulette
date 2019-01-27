import React from "react";
import { connect } from "react-redux";
import {
  compose,
  lifecycle,
  withProps,
  withHandlers,
  setDisplayName,
  withStateHandlers,
  withPropsOnChange
} from "recompose";
import _has from "lodash/has";
import _cloneDeep from "lodash/cloneDeep";

import { withStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";

import { styles } from "./index";
import { wordUpdate } from "../../store/words";
import { Word, Submit, AddNewTranslation } from "../New";
import Translation from "./Translation";

////

const mapStateToProps = state => ({
  words: state.words.items
});

const mapDispatchToProps = dispatch => ({
  onUpdate: (word, newTranslations) =>
    dispatch(wordUpdate(word, newTranslations))
});

////

const word = compose(
  setDisplayName("Word"),

  withStyles(styles),

  connect(
    mapStateToProps,
    mapDispatchToProps
  ),

  withProps({
    name: "word"
  }),

  withStateHandlers(
    {
      wordId: null,
      word: "",
      newTranslation: "",
      newTranslations: [],
      disabled: false
    },
    {
      onWordId: () => wordId => ({ wordId }),
      onWord: () => word => ({ word }),
      onDisabledHandler: () => disabled => ({ disabled }),
      onNewTranslationHandler: () => newTranslation => ({ newTranslation }),
      onNewTranslationsHandler: () => newTranslations => ({ newTranslations })
    }
  ),

  withHandlers({
    onChangeWord: ({ word, onWord }) => ({ target: { value } }) =>
      onWord({
        ...word,
        name: value
      }),

    onChangeTranslation: ({ word, onWord }) => id => ({
      target: { value }
    }) => {
      if (_has(word, `translations.${id}`)) {
        const updated = _cloneDeep(word);
        updated.translations[id].translation = value;
        onWord(updated);
      }
    },

    onSave: ({
      word,
      onUpdate,
      newTranslation,
      newTranslations,
      onNewTranslationHandler
    }) => () => {
      word.name = word.name.trim();
      newTranslation = newTranslation.trim();
      newTranslations = newTranslations.map(t => t.trim());

      if (newTranslation.length) {
        newTranslations.push(newTranslation);
      }

      onUpdate(word, newTranslations).finally(() =>
        onNewTranslationHandler("")
      );
    },

    onNewTranslationsChange: ({
      newTranslations,
      onNewTranslationsHandler
    }) => index => ({ target: { value } }) => {
      newTranslations[index] = value;
      onNewTranslationsHandler(newTranslations);
    },

    onNewTranslationChange: ({ newTranslation, onNewTranslationHandler }) => ({
      target: { value }
    }) => {
      onNewTranslationHandler(value);
    },

    onNewTranslationsAdd: ({
      newTranslation,
      newTranslations,
      onNewTranslationHandler,
      onNewTranslationsHandler
    }) => () => {
      const updated = _cloneDeep(newTranslations);
      updated.push(newTranslation);
      onNewTranslationsHandler(updated);
      onNewTranslationHandler("");
    }
  }),

  lifecycle({
    componentDidMount() {
      const {
        words,
        onWord,
        onWordId,
        match: {
          params: { id }
        }
      } = this.props;

      id && onWordId(id);

      if (_has(words, id)) {
        onWord(words[id]);
      }
    }
  }),

  withPropsOnChange(["words"], ({ wordId, words, onWord }) => {
    if (_has(words, wordId)) {
      onWord(words[wordId]);
    }
  })
)(
  ({
    name,
    word,
    words,
    onSave,
    wordId,
    classes,
    onChangeWord,
    newTranslation,
    newTranslations,
    onChangeTranslation,
    onNewTranslationsAdd,
    onNewTranslationChange,
    onNewTranslationsChange
  }) => {
    if (!wordId || !_has(words, wordId) || !word) {
      return <CircularProgress color="secondary" />;
    }

    return (
      <>
        <Word name={name} word={word.name} onChange={onChangeWord} />

        <Typography variant="caption" className={classes.subTitle}>
          Translations:
        </Typography>

        {Object.keys(word.translations).map(id => (
          <Translation
            key={id}
            id={id}
            value={word.translations[id].translation}
            onChange={onChangeTranslation(id)}
          />
        ))}

        {!newTranslations.length
          ? null
          : newTranslations.map((translation, index) => (
              <Translation
                key={index}
                id={index}
                value={translation}
                onChange={onNewTranslationsChange(index)}
              />
            ))}

        <AddNewTranslation
          newTranslation={newTranslation}
          onChange={onNewTranslationChange}
          onAddTranslations={onNewTranslationsAdd}
        />

        <Submit onSubmit={onSave} />
      </>
    );
  }
);

export default word;
