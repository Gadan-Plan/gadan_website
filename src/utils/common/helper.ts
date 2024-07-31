declare type Recordable<T extends any = any> = Record<string, T>;
function setNestedProperty(obj: Recordable, key: string, value: any) {
  const keys = key.split('.');
  let current = obj;
  for (let i = 0; i < keys.length - 1; i++) {
    const k = keys[i];
    current[k] = current[k] || {};
    current = current[k];
  }
  current[keys[keys.length - 1]] = value;
}
export function genMessage(langs: Record<string, Record<string, any>>, prefix = 'lang') {
  const obj: Recordable = {};

  Object.keys(langs).forEach((key) => {
    const langFileModule = langs[key].default;
    let fileName = key.replace(`./${prefix}/`, '').replace(/^\.\//, '');
    const lastIndex = fileName.lastIndexOf('.');
    fileName = fileName.substring(0, lastIndex);
    const keyList = fileName.split('/');
    const moduleName = keyList.shift();
    const objKey = keyList.join('.');

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
