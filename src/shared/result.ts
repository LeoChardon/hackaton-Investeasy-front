export type Ok<T> = { ok: true; value: T }
export type Err<E> = { ok: false; error: E }
export type Result<E, T> = Ok<T> | Err<E>

export const ok = <T>(value: T): Ok<T> => ({ ok: true, value })
export const err = <E>(error: E): Err<E> => ({ ok: false, error })

export const isOk = <E, T>(r: Result<E, T>): r is Ok<T> => r.ok
export const isErr = <E, T>(r: Result<E, T>): r is Err<E> => !r.ok

