# Welcome to Code Hammers!

The journey of learning to code continues after graduation. Code Hammers was
created to give Codesmith alumni the opportunity to work together and build
something useful for the community.

As you know, alums have access to the Codesmith intranet. While, the intranet is
a staple for many during the job search, it lacks a bit of flair. Thus the idea
to create a robust intranet for alumni. Enter Code Hammers!

## Why Contribute?

Building and contributing is the best way to learn how to code! We wanted to
provide the opportunity for those looking to sharpen their skills to contribute
to a large codebase.

1. Experience the development workflow on a much greater scale
2. Receive code reviews and guidance on tasks
3. Work with engineers currently in the industry (get those referrals!)
4. It's FUN!!!

## Table of Contents

1. [Dev Environment Setup](#dev-environment-setup)
2. [Starting the Application](#starting-the-application)
3. [Style Guide](#style-guide)

## Dev Environment Setup

With any large codebase, there is always going to be some sort of environment
setup. Code Hammers is a [monorepo](https://en.wikipedia.org/wiki/Monorepo), the
repo for the frontend code and backend code are contained within one repo. You
will notice there are multiple `package.json` files. This is not always the
case!

- Clone the repo
- Create an `.env` file
  - Reach out Sean or Jimmy for all secret variables. These will be provided after engineering onboarding is complete.

## Starting the Application

There are a few ways to spin up Code Hammers. Scripts are provided for your
convenience.

- `npm run docker-dev`
  - This will build containers for the entire application
- `npm run dev-ts`
  - This will start both the webpack-dev-server for frontend and the backend
    server and run the app locally. Using this option will require package installs in both the root and client folders.
- Login credentials
  - **Email:** tester@codehammers.com
  - **Password:** ilovetesting

<!-- ## How to Contribute -->

## Style Guide

We follow the
[Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript?tab=readme-ov-file).
Here is a brief refresher, including additional conventions we follow.

### Prefer function expressions with arrow syntax ([why?](https://github.com/airbnb/javascript?tab=readme-ov-file#functions--declarations))

```
const myFunction = () => {
  ...
}
```

### Destructure objects ([why?](https://github.com/airbnb/javascript?tab=readme-ov-file#destructuring--object))

```
// Good
const MyComponent = ({prop1, prop2}) => {
  ...
}

// Bad
const MyComponent = (props) => {
  const {prop1, prop2} = props;
}

// Worse
const MyComponent = (props) => {
  ...
  props.prop1
  props.prop2
}
```

### Params

- Never mutate or reassign parameters, instead use a default parameter
- Place default parameters at the end of the function signature

```
// Good
const myFunc = (a, b, c = 3) => {
  ...
}

// Bad
const myFunc = (a = 3, b, c) => {
  ...
  b = 5
}
```

### Semicolons

- Add a semicolon at the end of each statement.
  ([why?](https://github.com/airbnb/javascript?tab=readme-ov-file#semicolons--required))

### Single Quotes

- Prefer single quotes for string literals

### Names

- Variables should be `camelCase`, while global constants (i.e. action types)
  should be `SCREAMING_SNAKE_CASE`
- Functions should also be in `camelCase`, but names of components should be
  `PascalCase`
- Testing IDs, when used, should be in `kebab-case`
- Names of objects and classes should be `PascalCase`

### Imports

- Imports should be placed at the top of each file
- Order of preference for imports
  - Frameworks
  - Libraries
  - Modules
  - Styles
  - Side-effects
    ([?](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import#import_a_module_for_its_side_effects_only))

```
// Framework
import {useState, useEffect} from 'react';

// Library
import { useNavigate } from 'react-router-dom';

// Modules
import SomeComponent from '../../SomeComponent';
import helperFunction from '../../utils/helperFunction';

// Styles
import styles from './MyComponent.module.scss';

// Side-effect
import '../../utils/coolEffects';
```

### Styles

Order CSS styles and JSX class names alphabetically

```
// styles.css
.button {
    display: inline-block;
    font-size: 16px;
    padding: 10px 20px;
    text-align: center;
    text-decoration: none;
}

// Button.jsx
...
<Button className='bg-white border border-green-500 font-semibold rounded shadow'>
...
```
