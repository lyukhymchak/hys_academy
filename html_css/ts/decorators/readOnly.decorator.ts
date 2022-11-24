export default function ReadOnly(flag: boolean) {
  return function (
    target: Object,
    propertyKey: string,
    descriptors: PropertyDescriptor
  ) {
    Object.defineProperty(target, propertyKey, {
      writable: !flag,
    });
  };
}
