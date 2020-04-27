import _random from "lodash/random";
import { QUESTION_FROM_ENGLISH } from "../../core/Constants";

////

export const initStateField = {
  question: QUESTION_FROM_ENGLISH,
  answer: "",
  wordId: ""
};

/**
 * @param {Array} ids
 * @param {Object} settings
 * @return {Array}
 */
export const getRandomWordIds = (ids, settings) => {
  let result;

  if (settings.count >= ids.length) {
    result = new Set(ids);
  } else {
    result = new Set();

    while (result.size < settings.count) {
      const id = ids[_random(0, ids.length - 1)];

      if (!result.has(id)) {
        result.add(id);
      }
    }
  }

  return Array.from(result);
};

/**
 * @param {Array} wordIds
 * @return {Array}
 */
export const getSteps = wordIds =>
  wordIds.map(id => ({
    ...initStateField,
    wordId: id
  }));

/**
 * @param {Object} words
 * @param {Array} steps
 * @returns {Number}
 */
export const getValidScore = (words, steps) => {
  return steps.reduce((result, step) => {

    const { answer, wordId } = step;
    const { translations } = words[wordId];

    const t = Object.keys(translations).map(id =>
      translations[id].toLowerCase()
    );

    const isValid = t.includes(answer.toLowerCase());

    if (isValid) {
      result += 1;
    }

    return result;
  }, 0);
};
