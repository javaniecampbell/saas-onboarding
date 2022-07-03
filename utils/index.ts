export function capitalize(str: string) {
    const lower = str.toLowerCase();
    return str.charAt(0).toUpperCase() + lower.slice(1);
}

export function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export function exclude<T, Key extends keyof T>(resultSet: T, ...keys: Key[]): Omit<T, Key> {
    for (let key of keys) {
      delete resultSet[key];
    }
    return resultSet;
  }