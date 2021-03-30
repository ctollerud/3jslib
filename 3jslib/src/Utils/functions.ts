export type Action<T> = (x:T) => void;
export type Action2<T,U> = (x:T, y:U) => void;
export type Func0<T> = () => T;