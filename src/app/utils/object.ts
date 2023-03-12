export function getProps<T extends Object>(obj: T | undefined) {
  if (!obj || typeof obj !== "object") return [];
  return Object.keys(obj);
}
