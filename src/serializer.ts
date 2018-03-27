import { isObservableObject, toJS } from 'mobx';

export function toJson(value: any): string {
  if (isObservableObject(value)) {
    return JSON.stringify(toJS(value));
  }
  if (typeof value === 'object') {
    return JSON.stringify(value);
  }
  return value;
}

export function fromJson(value: string): any {
  try {
    return JSON.parse(value);
  } catch (error) {
    return value;
  }
}
