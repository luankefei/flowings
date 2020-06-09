// TODO: env adapt
// tslint: disable
export const methods = (methodList: string[]) => (target: any) => {
  if (typeof window === "undefined") {
    return;
  }

  methodList.forEach((method: any) => {
    Object.assign(target.prototype, {
      [method]: CanvasRenderingContext2D.prototype[method],
    });
  });
};

export const properties = (propDict: any) => (target: any) => {
  Object.keys(propDict).forEach((key: string) => {
    const initialValue = propDict[key];
    const privateKey = `__${key}__`;
    Object.assign(target.prototype, {
      [privateKey]: initialValue,
    });
    Object.defineProperty(target.prototype, key, {
      get() {
        return this[privateKey];
      },
      set(value) {
        this[privateKey] = value;
      },
    });
  });
};

// tslint: enable
