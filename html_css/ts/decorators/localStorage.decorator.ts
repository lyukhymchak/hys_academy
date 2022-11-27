export default function LocalStorage<T>(
  key: string
): (target: Object, propertyKey: string) => void {
  return function (target: Object, propertyKey: string) {
    Object.defineProperty(target, propertyKey, {
      get: function (): T {
        if (localStorage.getItem(this[key])) {
          return JSON.parse(localStorage.getItem(this[key]));
        }
      },

      set: function (data: T): void {
        if (this.key) {
          localStorage.setItem(this[key], JSON.stringify(data));
        }
      },
    });
  };
}
