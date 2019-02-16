import _isString from "lodash/isString";

import { Firestore, parseResponseItems } from "../../core/Firebase";

////

class TranslationsService {
  /**
   * @return {Promise<Array | never>}
   */
  static async findAll() {
    try {
      return Firestore.collection("translations")
        .get()
        .then(res => parseResponseItems(res));
    } catch (e) {
      throw new Error("Fetched translates fail");
    }
  }

  /**
   * @param {String} wordId
   * @param {String} newTranslate
   * @return {Promise<firebase.firestore.DocumentReference | Error>}
   */
  static async save(wordId, newTranslate) {
    return Firestore.collection("translations")
      .add({
        wordId: wordId,
        translations: newTranslate,
        labels: ""
      })
      .catch(() => new Error("Could not create translation"));
  }

  /**
   * @param {String} wordId
   * @param {Array} newTranslates
   * @return {Promise<firebase.firestore.QuerySnapshot | never>}
   */
  static async saveAll(wordId, newTranslates) {
    try {
      const batch = Firestore.batch();

      newTranslates.forEach(t => {
        batch.set(Firestore.collection("translations").doc(), {
          wordId: wordId,
          translation: t,
          labels: ""
        });
      });

      return batch.commit().then(() =>
        Firestore.collection("translations")
          .where("wordId", "==", wordId)
          .get()
      );
    } catch (e) {
      throw new Error("Could not create translations");
    }
  }

  /**
   * @param {String|Array} id
   * @return {Promise<void>}
   */
  static async remove(id) {
    let ids = id;

    if (_isString(id)) {
      ids = [id];
    }

    try {
      const batch = Firestore.batch();

      ids.forEach(id => {
        batch.delete(Firestore.collection("translations").doc(id));
      });

      return batch.commit();
    } catch (e) {
      throw new Error(e.message || "There are Translations remove failure");
    }
  }
}

export { TranslationsService };
