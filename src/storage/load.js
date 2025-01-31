/**
 * Loads a value from localStorage and attempts to parse it as JSON.
 * If parsing fails, the raw string value is returned instead.
 *
 * @function
 * @param {string} key - The key of the item to retrieve from localStorage.
 * @returns {any|null} - The parsed JSON value if successful, the raw string if parsing fails, or null if the key does not exist.
 */
export function load(key) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  } catch {
    return localStorage.getItem(key);
  }
}
