export default function SessionStorage<T>(
  key: string
): (target: Object, propertyKey: string) => void {
  return function (target: Object, propertyKey: string) {
    Object.defineProperty(target, propertyKey, {
      get: function (): T {
        if (sessionStorage.getItem(this[key])) {
          return JSON.parse(sessionStorage.getItem(this[key]));
        }
      },

      set: function (data: T) {
        Object.getOwnPropertyDescriptor(target, propertyKey).set.bind(this);
      },
      configurable: true,
    });
  };
}
