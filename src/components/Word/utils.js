import cloneDeep from "lodash/cloneDeep";
import isArray from "lodash/isArray";

export const mergeNewTranslations = (word, newTranslation) => {
  const newWord = cloneDeep(word);
  const translation = newTranslation.trim();

  if (!translation.length) {
    return newWord;
  }

  newWord.translations = !isArray(newWord.translations)
    ? []
    : newWord.translations;
  newWord.translations.push(translation);

  return newWord;
};
