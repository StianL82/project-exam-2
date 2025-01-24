/**
 * Saves a value to localStorage under the specified key.
 *
 * @param {string} key - The key under which the value will be stored in localStorage.
 * @param {*} value - The value to be stored. It will be stringified to JSON format.
 * @returns {void}
 */
export function save(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
