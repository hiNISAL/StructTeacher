export const isObject = obj => (Object.prototype.toString.call(obj) === '[object Object]');
export const isFunction = fn => (Object.prototype.toString.call(fn) === '[object Function]');
export const isNumber = num => (Object.prototype.toString.call(num) === '[object Number]');
export const isString = str => (Object.prototype.toString.call(str) === '[object String]');
export const isBoolean = bool => (Object.prototype.toString.call(bool) === '[object Boolean]');
