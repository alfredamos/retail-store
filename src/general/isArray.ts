export function isArray<T>(obj: T) {
  return Object.prototype.toString.call(obj) === "[object Array]";
}
