/*
Copyright (C) 2024  Arafat Husayn <hello@arafat.dev>

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

export type Some<T> = NonNullable<T>;

export type None = null | undefined;

export type Option<T> = T extends None ? None : Some<T>;

export function option<T>(value: T | None): Option<T> {
  return value as Option<T>;
}

export function some<T>(value: T): Some<T> {
  return value as Some<T>;
}

export function none(): None {
  return null as None;
}

export function isSome<T>(value: T): value is Some<T> {
  return value !== null && value !== undefined;
}

export function isNone(value: any): value is None {
  return value === null || value === undefined;
}

/**
 * @throws {Error} if the value is None
 */
export function unwrap<T>(value: Option<T>): T {
  if (isNone(value)) {
    throw new Error("Tried to unwrap a None value");
  }

  return some(value);
}

export function unwrapOr<T>(value: Option<T>, defaultValue: T): T {
  if (isNone(value)) {
    return defaultValue;
  }

  return some(value);
}

export function unwrapOrElse<T>(
  value: Option<T>,
  defaultValueFunction: () => T,
): T {
  if (isNone(value)) {
    return defaultValueFunction();
  }

  return some(value);
}

export function map<T, U>(value: Option<T>, fn: (value: T) => U): Option<U> {
  if (isNone(value)) {
    return none() as Option<U>;
  }

  return some(fn(some(value))) as Option<U>;
}

export function chain<T, U>(
  value: Option<T>,
  fn: (value: T) => Option<U>,
): Option<U> {
  return map(value, fn) as Option<U>;
}

export function flatMap<T, U>(
  value: Option<T>,
  fn: (value: T) => Option<U>,
): Option<U> {
  if (isNone(value)) {
    return none() as Option<U>;
  }

  return fn(some(value));
}
