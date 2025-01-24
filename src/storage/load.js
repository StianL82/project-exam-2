/**
 * Loads a value from localStorage and parses it as JSON.
 *
 * @param {string} key - The key of the item to load from localStorage.
 * @returns {any|null} - The parsed JSON value associated with the key, or null if the key does not exist or parsing fails.
 */
export function load(key) {
  try {
    const value = localStorage.getItem(key);
    return JSON.parse(value);
  } catch {
    return null;
  }
}
