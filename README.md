

1. What is the difference between var, let, and const?

var, let, and const are used to declare variables in JavaScript, but they behave differently in terms of scope, reassignment, and redeclaration.

var:::

1.Function-scoped or globally scoped.

2.Can be redeclared and reassigned.

3.Variables declared with var are hoisted, meaning they are moved to the top of their scope during compilation.

let:::

1.Block-scoped (limited to { } such as loops or condition blocks).

2.Cannot be redeclared in the same scope.

3.Can be reassigned.

4.Hoisted but not initialized, which leads to the temporal dead zone before declaration.

const:::

1.Also block-scoped.

2.Cannot be redeclared or reassigned after initialization.

3.Must be initialized at the time of declaration.

4.Often used for values that should remain constant.

2. What is the Spread Operator (...)?

The spread operator (...) is used to expand elements of an iterable (such as arrays, objects, or strings) into individual elements.

It is commonly used for:

a.Copying arrays or objects

b.Merging arrays or objects

c.Passing elements of an array as function arguments

d.Converting iterable objects (like NodeList) into arrays

EXAMPLE::

const arr1 = [1, 2, 3];
const arr2 = [...arr1, 4, 5];
// Output: [1, 2, 3, 4, 5]

const obj1 = { a: 1, b: 2 };
const obj2 = { ...obj1, c: 3 };
// Output: { a: 1, b: 2, c: 3 }