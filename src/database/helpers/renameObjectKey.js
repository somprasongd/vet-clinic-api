import { snakeCase } from 'change-case';

export const renameWithKeymap = (obj, keyMap) =>
  Object.keys(obj).reduce((newObj, oldKey) => {
    const newKey = keyMap[oldKey] || oldKey;
    newObj[newKey] = obj[oldKey];
    return newObj;
  }, {});

export const changeToSnakeCase = obj =>
  Object.keys(obj).reduce((newObj, oldKey) => {
    const newKey = snakeCase(oldKey);
    newObj[newKey] = obj[oldKey];
    return newObj;
  }, {});
