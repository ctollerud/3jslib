//an action that takes one argument
export type Action<T> = (x:T) => void;

//an action that takes two arguments
export type Action2<T,U> = (x:T, y:U) => void;

//A function that returns no arguments and returns a value
export type Func0<T> = () => T;