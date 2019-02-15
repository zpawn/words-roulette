import _has from "lodash/has";

import { WordsService } from "./index";
import { TranslationsService } from "../translations";
import { alertShow } from "../alerts";

////

const actionTypes = {
  WORDS_FETCH_START: "WORDS_FETCH_START",
  WORDS_FETCH_SUCCESS: "WORDS_FETCH_SUCCESS",
  WORDS_FETCH_FAIL: "WORDS_FETCH_FAIL",
  WORD_UPDATE_SUCCESS: "WORD_UPDATE_SUCCESS",
  WORD_SAVE_SUCCESS: "WORD_SAVE_SUCCESS",
  WORD_REMOVE_SUCCESS: "WORD_REMOVE_SUCCESS"
};

const wordsFetchStart = () => ({
  type: actionTypes.WORDS_FETCH_START
});

const wordsFetchSuccess = words => ({
  type: actionTypes.WORDS_FETCH_SUCCESS,
  words
});

const wordsFetchFail = () => ({
  type: actionTypes.WORDS_FETCH_FAIL
});

const wordUpdateSuccess = word => ({
  type: actionTypes.WORD_UPDATE_SUCCESS,
  word
});

const wordSaveSuccess = word => ({
  type: actionTypes.WORD_SAVE_SUCCESS,
  word
});

const wordRemoveSuccess = wordId => ({
  type: actionTypes.WORD_REMOVE_SUCCESS,
  wordId
});

////

const wordsFetch = () => async dispatch => {
  dispatch(wordsFetchStart());

  try {
    const wordsPromise = await WordsService.findAll();
    const translationsPromise = await TranslationsService.findAll();

    Promise.all([wordsPromise, translationsPromise]).then(
      ([words, translations]) => {
        const data = {};
        if (!words.length && !translations.length) {
          return;
        }

        words.forEach(word => (data[word.id] = word));
        translations.forEach(({ wordId, ...t }) => {
          if (!_has(data, wordId)) {
            return;
          }

          if (!_has(data, `${wordId}.translations`)) {
            data[wordId].translations = {};
          }

          data[wordId].translations[t.id] = t;
        });

        dispatch(wordsFetchSuccess(data));
      }
    );
  } catch (err) {
    dispatch(alertShow("error", err.message || "Fetched words failure"));
    dispatch(wordsFetchFail());
  }
};

const wordUpdate = (updateWord, newTranslations) => dispatch => {
  return WordsService.update(updateWord, newTranslations)
    .then(({ word }) => {
      dispatch(wordUpdateSuccess(word));
      dispatch(alertShow("success", "Word updated success"));
    })
    .catch(err =>
      dispatch(alertShow("error", err.message || "Word updated failure"))
    );
};

const wordSave = (newWord, newTranslations) => dispatch => {
  return WordsService.save(newWord, newTranslations)
    .then(({ word }) => {
      dispatch(wordSaveSuccess(word));
      dispatch(alertShow("success", "Word created successfully"));
    })
    .catch(err => {
      dispatch(alertShow("error", err.message || "Word created failure"));
    });
};

const wordRemove = wordId => (dispatch, getState) => {
  const {
    words: { items }
  } = getState();

  if (!_has(items, wordId)) {
    dispatch(alertShow("error", "Doesn't is set word"));
    return;
  }

  const translationIds = Object.keys(items[wordId].translations);

  const wordPromise = WordsService.remove(wordId);
  const translationsPromise = TranslationsService.remove(translationIds);

  Promise.all([wordPromise, translationsPromise])
    .then(() => {
      dispatch(wordRemoveSuccess(wordId));
      dispatch(alertShow("success", "Word created successfully"));
    })
    .catch(err => dispatch("error", err.message || "Word created failure"));
};

////

export { wordSave, wordsFetch, wordUpdate, wordRemove, actionTypes };
