# TypeScript Best Practices

This document provides some best practices when using TypeScript and standards to follow to ensure consistency throughout our codebases.

<hr>

- [TypeScript Best Practices](#typescript-best-practices)

  - [1. Use ES Module Syntax for Node Modules](#1-use-es-module-syntax-for-node-modules)
  - [2. Use TypeScript's Static Types](#2-use-typescripts-static-types)
  - [3. Use `interface` for Object Types](#3-use-interface-for-object-types)
  - [4. Use `readonly` Modifier](#4-use-readonly-modifier)
  - [5. Use `as const` Assertion](#5-use-as-const-assertion)
  - [6. Use `enum` for Defined Values](#6-use-enum-for-defined-values)
  - [7. Use `null` and `undefined` for Nullable Types](#7-use-null-and-undefined-for-nullable-types)
  - [8. Use `!` Operator for Non-Null Assertion](#8-use--operator-for-non-null-assertion)
  - [9. Use `as` Operator for Type Assertion](#9-use-as-operator-for-type-assertion)
  - [10. Use `in` Operator for Type Narrowing](#10-use-in-operator-for-type-narrowing)
  - [11. Make Use of `readonly` and `const`](#11-make-use-of-readonly-and-const)
  - [12. Avoid Implicit `any`](#12-avoid-implicit-any)
  - [13. Leverage Type Inference](#13-leverage-type-inference)
  - [14. Use Index Signatures for Dynamic Data](#14-use-index-signatures-for-dynamic-data)
  - [15. Use Generics for Reusable Components](#15-use-generics-for-reusable-components)
  - [16. Use the `JSX.Element` type for React Components](#16-use-jsxelement-type-for-react-components)

  <hr>

## 1. Use ES Module Syntax for Node Modules

- TypeScript files should be written in the style of ES Modules (i.e. `import`, `export`) .
- Our Node files that have not yet been converted to TypeScript are written as CommonJS Modules (i.e. `require`, `module.exports`). To allow for compatability between these two formats, TypeScript is configured to transpile modules into CommonJS so that our legacy JavaScript files can work with them. A few rules to keep in mind:

1. ES Modules must use `import`/`export` statements. If importing a CommonJS module into an ES Module, use `import`.
2. CommonJS Modules cannot use `import`/`export` statements. You must use `require` to import an ES Module into a CommonJS Module.
3. When `require` is used to import an ES Module, it will return an object - i.e., if you are using the standard `export default` syntax in your module, you would receive an object with your export stored on a property called `default`. Therefore, you should instead use the following syntax for Node modules:

`export { myTypeScriptController };`

- If your module is used by a CommonJS module, you would then require it as:

`const { myTypeScriptController } = require('./path-to-controller');`

## 2. Use TypeScript's Static Types

- Always use static types where possible.
- Provide type information in your function signatures.
- Avoid using `any` type.

```typescript
let name: string; // good
let age: any; // bad
```

## 3. Use `interface` for Object Types

- Use `interface` to define object types.
- Use `type` to define union types, function types, etc.

```typescript
interface Person {
  name: string;
  age: number;
}

type Person = {
  name: string;
  age: number;
};
```

## 4. Use `readonly` Modifier

- Use `readonly` modifier to define read-only properties.
- Use `readonly` modifier to define read-only array.

```typescript
interface Person {
  readonly name: string;
  readonly age: number;
}

const people: readonly Person[] = [
  {
    name: 'John',
    age: 20,
  },
  {
    name: 'Jane',
    age: 30,
  },
];
```

## 5. Use `as const` Assertion

- Use `as const` assertion to define literal types.
- Use `as const` assertion to define readonly array.
- Use `as const` assertion to define readonly object.

```typescript
const colors = ['red', 'green', 'blue'] as const;
const person = {
  name: 'John',
  age: 20,
} as const;
```

## 6. Use `enum` for Defined Values

- Enums are a way to group and define a set of related values.
- Enums are especially useful when dealing with a set of constants.

```typescript
enum Weekdays {
  Sunday,
  Monday,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday,
}
```

## 7. Use `null` and `undefined` for Nullable Types

- TypeScript has two types (null and undefined) that are used to indicate the absence of a value.
- Use null and undefined explicitly when necessary, but be careful.

```typescript
let name: string | null = null; // good
let age: number | undefined; // good
```

## 8. Use `!` Operator for Non-Null Assertion

- Use `!` operator to assert non-null types.
- Use `!` operator to assert non-null types in `if` statements.

```typescript
let name: string | null;

if (name) {
  console.log(name.length); // ok
}

console.log(name!.length); // ok
```

## 9. Use `as` Operator for Type Assertion

- Use `as` operator to assert types.
- Use `as` operator to assert types in JSX.

```typescript
let name: string | null;

console.log((name as string).length); // ok

const element = <div>{(name as string).length}</div>; // ok
```

## 10. Use `in` Operator for Type Narrowing

- Use `in` operator to narrow types.
- Use `in` operator to

## 11. Make Use of `readonly` and `const`

- Use readonly for properties that shouldn't change once they're set.
- Use const for variables that are never reassigned.

```typescript
class MyClass {
  readonly myReadonlyProperty: number;
}
const MY_CONST: string = 'constant';
```

## 12. Avoid Implicit `any`

- TypeScript has a compiler option called `noImplicitAny`. When enabled, this prevents the compiler from inferring the `any` type when it can't determine the actual type.

```typescript
function logSomething(something) {
  console.log(something);
} // Implicit 'any'

function logSomething(something: any) {
  console.log(something);
} // Explicit 'any'
```

## 13. Leverage Type Inference

- TypeScript is good at inferring types in many situations. Allow TypeScript to infer types where possible, this can lead to less verbose and more readable code.

```typescript
const myName = 'Alice';
const myAge = 30;
```

## 14. Use Index Signatures for Dynamic Data

- When you don't know the property names of an object until runtime, you can use an index signature to describe the types of possible values.

```typescript
interface Person {
  name: string;
  age: number;
  [key: string]: string | number;
}
```

## 15. Use Generics for Reusable Components

- Generics are a way to make components work with any data type and not restrict to one data type.

```typescript
function identity<T>(arg: T): T {
  return arg;
}
```

## 16. Use `JSX.Element` Type for React Components

- TypeScript has a `JSX` [configuration option](https://www.typescriptlang.org/docs/handbook/jsx.html) that, when enabled, will allow it to recognize and type JSX syntax as React elements.
- You should use the `JSX.Element` type to specify the return value of React functional components. `JSX.Element` is part of TypeScript's built-in type system, so you do not need to import anything to be able to use it.

```typescript
const MyComponent = (): JSX.Element => {
  return <div> This is a component </div>;
};
```
