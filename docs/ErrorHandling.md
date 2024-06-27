# Error Handling

## Quick Links

- [Back End Error Handling](#backend)
  - [Express Async Errors](#async-errors)
  - [Custom Error Classes](#custom-errors)
- [Front End Error Handling](#frontend)

<hr>

<a id="backend"></a>

## Back End Error Handling

<a id="async-errors"></a>

#### express-async-errors

Codehammers makes use of the [express-async-errors](https://www.npmjs.com/package/express-async-errors) package to simplify error handling in asynchronous route handlers and middlewares. This package enables us to simply throw errors instead of manually passing error objects to Express's `next` function. An example would be:

```
/* with express-async-errors */

const middleware = async (req: Request, res: Response) => {
  throw new Error('This error will be automatically caught and passed to next')
}
```

whereas typically we would have to do this:

```
/* without express-async-errors */

const middleware = async (req: Request, res: Response, next: NextFunction) => {
  next({
    message: 'This error was manually passed to next'
  })
}
```

This implementation eliminates the need for try/catch blocks and allows us to simply throw errors where needed without manually invoking `next`

**How it works**
The Express framework automatically catches errors thrown in synchronous route handlers and middlewares. However, in the case of asynchronous route handlers and middlewares, Express requires us to manually call `next`, passing in an error object (or anything besides the string `'route'`), in order to invoke the global error handling middleware.

[This package wraps](https://github.com/davidbanham/express-async-errors/blob/master/index.js) Express's Router's [Layer object's](https://github.com/expressjs/express/blob/master/lib/router/layer.js) `handle` property 😵‍💫, enabling errors thrown in asynchronous route handlers and middlewares to automatically be caught and passed to `next`. We simply require/import this package once (in `server/app.ts`) and it's functionality is enabled.

Similar approaches require defining our own wrapper such as:

```
const catchAsync = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next)
  }
}
```

we would then have to wrap every route handler and middleware in this catchAsync function like:

```
const middleware = catchAsync(async (req, res) => {
  throw new Error('Oops, something went wrong')
})
```

Much nicer to not have to manually wrap every route handler and middleware!

<a id="custom-errors"></a>

#### Custom Error Classes

We have created reuseable error classes for the most common types of errors that occur on the server. These classes can be found in the `server/errors/` directory. These errors and their corresponding status codes are:

- BadRequestError - 400 - (requires a message argument when instantiated)
- DatabaseConnectionError - 500
- InternalError - 500
- NotAuthorizedError - 401
- NotFoundError - 404
- RequestValidationError - 400 - (requires an array of `ValidationError`s as an argument when instantiated - see [below](#request-validation-error))
- ValidationError - no status code - (requires `message` and `field` arguments when instantiated)

Each of these error classes extend our `CustomError` abstract class. This abstract class cannot be instantiated, but is used to enforce a structure for our custom error classes: requiring a `statusCode` property, a `message` property, as well as a `serializeErrors` method. The `serializeErrors` method ensures that errors are consistently formatted as an array of objects, each object containing a `message` property and an optional `field` property.

**Notes:**
<a href="request-validation-error"></a>

##### RequestValidationError

When validating multiple user inputs, we create an array for errors and push in a `ValidationError` for each failed validation. We then throw a `RequestValidationError` if this array contains any `ValidationError`s. An example of this could be:

```
const createUser = async (req: Request, res: Response) => {
  const { email, password } = req.body

  const validationErrors: ValidationError[] = []
  if (!email) {
    // create the ValidationError with a message argument and field argument
    validationErrors.push(new ValidationError('Invalid email', 'email'))
  }
  if (!password) {
    validationErrors.push(new ValidationError('Invalid password', 'password'))
  }
  if (validationErrors.length) {
    throw new RequestValidationError(validationErrors)
  }
  // continue if input validation checks pass...
}
```

<hr>

<a id="frontend"></a>

## Front End Error Handling

TBD
