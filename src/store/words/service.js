import isEmpty from "lodash/isEmpty";
import { DB } from "../../core/Firebase";

////

class WordsService {
  /**
   * @returns {Promise<*>}
   */
  static async findAll() {
    try {
      return DB.ref("/words")
        .once("value")
        .then(snapshot => snapshot.val());
    } catch (e) {
      throw new Error("Fetched words fail");
    }
  }

  /**
   * @param {String} id
   * @returns {Promise<*>}
   */
  static async find(id) {
    try {
      return DB.ref(`/words/${id}`)
        .once("value")
        .then(snapshot => snapshot.val());
    } catch (e) {
      throw new Error("Fetching word fail");
    }
  }

  /**
   * @param {String } id
   * @param {Object} word
   * @returns {Promise<*>}
   */
  static async save(id, word) {
    try {
      const result = await this.find(id);

      if (!result) {
        return this.update(id, word);
      } else {
        throw new Error("This word already exist");
      }
    } catch (e) {
      throw new Error("Could not create translation/word");
    }
  }

  /**
   * @param {String} id
   * @param {Object} word
   * @returns {Promise<void>}
   */
  static async update(id, word) {
    if (!id || isEmpty(word)) {
      throw new Error("Empty word data");
    }

    try {
      return DB.ref("words/" + id).set(word);
    } catch (e) {
      throw new Error(e.message || "There are Word update failure");
    }
  }

  /**
   * @param {String} id
   * @return {Promise<void>}
   */
  static async remove(id) {
    try {
      return DB.ref("words/" + id).remove();
    } catch (e) {
      throw new Error(e.message || "There are Word remove failure");
    }
  }
}

export { WordsService };
