/**
 * Create an object composed of the picked object properties
 * @param {T} object - The source object
 * @param {Array<keyof T>} keys - Array of keys to pick from the source object
 * @returns {Partial<T>} - A new object with only the picked properties
 */
const pick = <T extends Record<string, unknown>>(
  object: T,
  keys: Array<keyof T>
): Partial<T> =>
  keys.reduce((result, key) => {
    if (key in object) {
      result[key] = object[key];
    }
    return result;
  }, {} as Partial<T>);

export default pick;
