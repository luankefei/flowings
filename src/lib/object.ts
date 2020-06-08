/**
 * 对象的扩展
 */
function deepClone(obj) {
  const isObject = (o) =>
    (typeof o === "object" || typeof o === "function") && o !== null;

  if (!isObject(obj)) throw TypeError("param 1 is not object");

  const newObj = Array.isArray(obj) ? [...obj] : { ...obj };

  Reflect.ownKeys(newObj).forEach((key) => {
    newObj[key] = isObject(obj[key]) ? deepClone(obj[key]) : obj[key];
  });

  return newObj;
}

export { deepClone };
