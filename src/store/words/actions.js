import has from "lodash/has";

import { WordsService } from "./index";
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

const wordsFetchStart = () => ({ type: actionTypes.WORDS_FETCH_START });

const wordsFetchSuccess = words => ({
  type: actionTypes.WORDS_FETCH_SUCCESS,
  words,
});

const wordsFetchFail = () => ({ type: actionTypes.WORDS_FETCH_FAIL });

const wordUpdateSuccess = (id, word) => ({
  type: actionTypes.WORD_UPDATE_SUCCESS,
  id,
  word,
});

const wordRemoveSuccess = wordId => ({
  type: actionTypes.WORD_REMOVE_SUCCESS,
  wordId,
});

////

const wordsFetch = () => async dispatch => {
  dispatch(wordsFetchStart());

  WordsService
    .findAll()
    .then((words) => {
      dispatch(wordsFetchSuccess(words))
    })
    .catch((err) => {
      dispatch(alertShow("error", err.message || "Fetched words failure"));
      dispatch(wordsFetchFail());
    });
};

const wordUpdate = (id, updateWord) => dispatch => {
  return WordsService.update(id, updateWord)
    .then(() => {
      dispatch(wordUpdateSuccess(id, updateWord));
      dispatch(alertShow("success", "Word update success"));
    })
    .catch((err) => dispatch(alertShow("error", err)))
};

const wordSave = (word) => dispatch => {
  const id = word.name.toLowerCase();

  return WordsService.save(id, word)
    .then(() => {
      dispatch(wordUpdateSuccess(id, word));
      dispatch(alertShow("success", "Word save success"));
      return id;
    })
    .catch((err) =>
      dispatch(alertShow('error', err.message || 'Word save failure')))
};

const wordRemove = wordId => (dispatch, getState) => {
  const {
    words: { items }
  } = getState();

  if (!has(items, wordId)) {
    dispatch(alertShow("error", "Doesn't is set word"));
    return;
  }

  WordsService.remove(wordId)
    .then(() => {
      dispatch(wordRemoveSuccess(wordId));
      dispatch(alertShow("success", "Word created successfully"));
    })
    .catch(err =>
      dispatch(alertShow("error", err.message || "Word remove failure"))
    )
};

////

export { wordSave, wordsFetch, wordUpdate, wordRemove, actionTypes };
