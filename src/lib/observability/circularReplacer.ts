export const getCircularReplacer = (): any => {
  const seen = new WeakSet();
  return (_: any, value: any) => {
    if (typeof value === "object" && value !== null) {
      if (seen.has(value)) {
        return;
      }
      seen.add(value);
    }
    return value;
  };
};
