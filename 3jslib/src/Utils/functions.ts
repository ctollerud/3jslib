//an action that takes one argument
export type Action1<A> = (a:A) => void;

//an action that takes two arguments
export type Action2<A,B> = (a:A, b:B) => void;

//A function that returns no arguments and returns a value
export type Func0<A> = () => A;

export type Func1<A,B> = (a:A) => B;

export type Func2<A,B,C> = (a:A, b:B) => C;