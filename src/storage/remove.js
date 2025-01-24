/**
 * Removes an item from localStorage.
 *
 * @param {string} key - The key of the item to remove from localStorage.
 * @returns {void}
 */
export function remove(key) {
  localStorage.removeItem(key);
}

