import _isArray from "lodash/isArray";
import _isEmpty from "lodash/isEmpty";

import { Firebase, parseResponseItems } from "../../core/Firebase";
import { TranslationsService } from "../translations";

////

class WordsService {
  /**
   * @return {Promise<Array | never>}
   */
  static async findAll() {
    try {
      return Firebase.collection("words")
        .get()
        .then(res => parseResponseItems(res));
    } catch (e) {
      throw new Error("Fetched words fail");
    }
  }

  /**
   * @param {String} newWord
   * @param {Array} newTranslations
   * @return {Promise<{Object}>}
   */
  static async save(newWord, newTranslations) {
    if (!_isArray(newTranslations)) {
      return Promise.reject("Empty translations");
    }

    try {
      const createdWord = await Firebase.collection("words")
        .add({
          name: newWord,
          createdAt: Date.now(),
          updatedAt: Date.now()
        })
        .catch(err => {
          throw new Error(err.message || "Could not create word");
        });

      const createdTranslations = await TranslationsService.saveAll(
        createdWord.id,
        newTranslations
      );

      return Promise.resolve({
        word: {
          id: createdWord.id,
          name: newWord,
          translations: parseResponseItems(createdTranslations)
        }
      });
    } catch (e) {
      throw new Error("Could not create translation/word");
    }
  }

  /**
   * @param {Object} word
   * @param {Array} newTranslations
   * @return {Promise<void>}
   */
  static async update(word, newTranslations) {
    if (_isEmpty(word)) {
      throw new Error("Empty word data");
    }

    try {
      const now = Date.now();
      const wordPromise = await Firebase.collection("words")
        .doc(word.id)
        .update({
          name: word.name,
          updatedAt: now
        });

      const translationsBatch = Firebase.batch();

      Object.keys(word.translations).forEach(id => {
        translationsBatch.update(Firebase.collection("translations").doc(id), {
          translation: word.translations[id].translation
        });
      });

      const translationsPromise = await translationsBatch.commit();

      const newTranslationsPromise = await TranslationsService.saveAll(
        word.id,
        newTranslations
      );

      return Promise.all([
        wordPromise,
        translationsPromise,
        newTranslationsPromise
      ])
        .then(([updatedWord, updatedTranslations, updatedNewTranslations]) => {
          const translations = parseResponseItems(updatedNewTranslations);
          return Promise.resolve({
            word: {
              ...word,
              name: word.name,
              updatedAt: now,
              translations: translations.reduce((result, t) => {
                result[t.id] = t;
                return result;
              }, {})
            }
          });
        })
        .catch(err => {
          throw new Error(err.message || "Updated word failure");
        });
    } catch (e) {
      throw new Error(e.message || "Firestore error");
    }
  }

  /**
   * @param {String} id
   * @return {Promise<void>}
   */
  static async remove(id) {
    try {
      return Firebase.collection("words")
        .doc(id)
        .delete();
    } catch (e) {
      throw new Error(e.message || "There are Word remove failure");
    }
  }
}

export { WordsService };
