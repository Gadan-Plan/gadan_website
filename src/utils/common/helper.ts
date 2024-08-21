declare type Recordable<T extends any = any> = Record<string, T>;
function setNestedProperty(obj: Recordable, key: string, value: any) {
  const keys = key.split(".");
  let current = obj;
  for (let i = 0; i < keys.length - 1; i++) {
    const k = keys[i];
    current[k] = current[k] || {};
    current = current[k];
  }
  current[keys[keys.length - 1]] = value;
}
export function genMessage(
  langs: Record<string, Record<string, any>>,
  prefix = "lang"
) {
  const obj: Recordable = {};

  Object.keys(langs).forEach((key) => {
    const langFileModule = langs[key].default;
    let fileName = key.replace(`./${prefix}/`, "").replace(/^\.\//, "");
    const lastIndex = fileName.lastIndexOf(".");
    fileName = fileName.substring(0, lastIndex);
    const keyList = fileName.split("/");
    const moduleName = keyList.shift();
    const objKey = keyList.join(".");

    if (moduleName) {
      if (objKey) {
        setNestedProperty(obj, moduleName, obj[moduleName] || {});
        setNestedProperty(obj[moduleName], objKey, langFileModule);
      } else {
        setNestedProperty(obj, moduleName, langFileModule || {});
      }
    }
  });
  return obj;
}

//get参数字符串处理
export function stringify(
  obj: any,
  encoder = encodeURIComponent,
  arrayFormat = "indices"
) {
  if (!obj || typeof obj !== "object") {
    return "";
  }

  const keys = Object.keys(obj);
  let result: any = [];

  keys.forEach((key) => {
    const value = obj[key];
    if (value === null || value === undefined) {
      return; // 跳过null和undefined值
    }

    if (Array.isArray(value)) {
      // 处理数组
      if (arrayFormat === "indices") {
        value.forEach((val, idx) => {
          result.push(`${encoder(key)}[${encoder(idx)}]=${encoder(val)}`);
        });
      } else if (arrayFormat === "brackets") {
        result.push(`${encoder(key)}[]=${encoder(value[0])}`);
      } else if (arrayFormat === "repeat") {
        value.forEach((val) => {
          result.push(`${encoder(key)}=${encoder(val)}`);
        });
      }
    } else {
      // 处理非数组值
      result.push(`${encoder(key)}=${encoder(value)}`);
    }
  });

  return result.join("&");
}

export function getFirstAndLastN(arr: any, n: number) {
  // 获取前n个元素
  let firstN = arr.slice(0, n);

  // 获取后n个元素（或数组末尾剩余的所有元素，如果它们少于n个）
  let lastN = arr.length > n ? arr.slice(arr.length - n) : arr.slice(); // 但这里直接使用 arr.slice(-n) 更简洁

  // 由于arr.slice()会返回整个数组（如果不传递参数），所以上面的条件实际上可以简化为：
  lastN = arr.slice(-n); // 这将总是返回数组末尾的n个元素，或者如果不足n个，则返回所有剩余元素

  // 返回包含前n个和后n个元素的数组
  return [firstN, lastN];
}
