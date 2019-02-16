import _isEmpty from "lodash/isEmpty";

////

/**
 * @param {String} translation
 * @param {Array} labels
 * @param {Number|String} id
 * @return {Object}
 */
export const generateField = (translation, labels = [], id = null) => {
  const field = { translation, labels };

  if (id) {
    field.id = id;
  }

  return field;
};

/**
 * @param {Object} translations
 * @param {String} translation
 * @return {Array}
 */
export const prepareNewTranslations = (translations, translation) => {
  let prepared = [];

  if (!_isEmpty(translations)) {
    prepared = Object.values(translations).map(t => ({
      ...t,
      translation: t.translation.trim()
    }));
  }

  translation = translation.trim();

  if (translation.length) {
    prepared.push(generateField(translation));
  }

  return prepared;
};
