# Welcome to Code Hammers!

The journey of learning to code continues after graduation. Code Hammers was created to give Codesmith alumni the opportunity to work together and build something useful for the community.

As you know, alums have access to the Codesmith intranet. While, the intranet is a staple for many during the job search, it lacks a bit of flair. Thus the idea to create a robust intranet for alumni. Enter Code Hammers!

## Why Contribute?

Building and contributing is the best way to learn how to code! We wanted to provide the opportunity for those looking to sharpen their skills to contribute to a large codebase.

1. Experience the development workflow on a much greater scale
2. Recieve code reviews and guidance on tasks
3. Work with engineers currently in the industry (get those referrals!)
4. It's FUN!!!

## Table of Contents

1. [Dev Environment Setup](#dev-environment-setup)
2. [Starting the Application](#starting-the-application)
3. [Style Guide](#style-guide)

## Dev Environment Setup

With any large codebase, there is always going to be some sort of environment setup. Code Hammers is a [monorepo](https://en.wikipedia.org/wiki/Monorepo), the repo for the frontend code and backend code are contained within one repo. You will notice there are multiple `package.json` files. This is not always the case!

- Clone the repo
- Install packages
- Create an `.env` file
  - Reach out Sean or Jimmy for all secret variables
- Run the initial tailwind script
  - `cd` to the `./client`folder and run `npx tailwindcss -i ./src/input.css -o ./dist/output.css --watch` in your terminal.
  - You will be prompted to install Tailwind - Choose YES.
  - This will run the initial CSS build. It will also leave it running and provide live compiles for any changes to styling.

## Starting the Application

There are a few ways to spin up Code Hammers. Scripts are provided for your convenience.

- `npm run docker-dev`
  - This will build containers for the entire application
- `npm run dev-ts`
  - This will start both the webpack-dev-server for frontend and the backend server
- Login credentials
  - **Email:** tester@codehammers.com
  - **Password:** ilovetesting

## Style Guide

We follow the [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript?tab=readme-ov-file). Here is a brief refresher as well as additional style rules we ask contributors to adhere to.

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

### Imports

- Imports should be placed at the top of each file
- Order of preference for imports
  - Frameworks
  - Libraries
  - Modules
  - Styles
  - Side-effects ([?](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import#import_a_module_for_its_side_effects_only))

```
import {useState, useEffect} from 'react'; // Framework
import { useNavigate } from 'react-router-dom'; // Library
import SomeComponent from '../../SomeComponent' // Modules
import helperFunction from '../../utils/helperFunction'
import styles from './MyComponent.module.scss' // Styles
import '../../utils/coolEffects' // Side-effect
```

### Styles

When writing CSS, order the properties in alphabetical order. When using tailwind, order the classes in alphabetical order. There are no performance benefits for doing so, but makes the codebase much more consistent!

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
