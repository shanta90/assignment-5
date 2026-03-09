

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

3. What is the difference between map(), filter(), and forEach()?

These are commonly used array methods in JavaScript, but they serve different purposes.

map():::

1.Transforms each element of an array.

2.Returns a new array with the same length.

filter()::;

1.Selects elements based on a condition.

2.Returns a new array containing only the elements that satisfy the condition.

forEach():::

1.Executes a function for each array element.

2.Does not return a new array (returns undefined).

3.Mostly used for performing actions like logging or updating external variables

EXAMPLE:::
const numbers = [1, 2, 3, 4, 5];

const doubled = numbers.map(num => num * 2);
// [2, 4, 6, 8, 10]

const evenNumbers = numbers.filter(num => num % 2 === 0);
// [2, 4]

numbers.forEach(num => console.log(num));
// Logs each number to the console

4. What is an Arrow Function?

An arrow function is a shorter syntax for writing function expressions in JavaScript, introduced in ES6.

Key characteristics:

a.More concise syntax than traditional functions.

b.Uses lexical this, meaning it inherits this from the surrounding scope.

c.Does not have its own arguments object.

d.Cannot be used as a constructor with the new keyword.

e.Supports implicit return when the function body contains a single expression.

EXAMPLE:::

// Traditional function
const add = function(a, b) {
  return a + b;
};

// Arrow function
const add = (a, b) => a + b;

// Arrow function with a block body
const multiply = (a, b) => {
  const result = a * b;
  return result;
};

5. What are Template Literals?

Template literals are a modern way to work with strings in JavaScript. They use backticks ( ) instead of single or double quotes.

Main advantages:

1.Allow embedding expressions using ${ }

2.Support multi-line strings

3.Improve readability and string formatting

EXAMPLE:::

const name = "John";
const age = 30;

// Traditional concatenation
const message1 = "My name is " + name + " and I am " + age + " years old.";

// Template literal
const message2 = `My name is ${name} and I am ${age} years old.`;

// Multi-line string
const multiline = `
Hello,
Welcome to JavaScript!
`;