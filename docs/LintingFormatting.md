# Linting & Formatting

Codehammers uses [ESLint](https://eslint.org/) and [Prettier](https://prettier.io/) to identify and fix code quality and formatting issues.

## Quick Links

- [Getting Started](#getting-started)
- [Prettier and ESLint Configuration](#configuration)
- [Ignoring Files](#ignoring-files)
- [Project Specific VSCode Settings](#vscode-settings)
- [Complete List of Linting Rules](#linting-rules)

<hr>

<a id="getting-started"></a>

## Getting Started

```bash
# Check the codebase for linting or formatting issues.
npm run docker-lint

# Check the codebase for linting or formatting issues and fix them, if possible.
# NOTE: This command will modify files, so be wary!
npm run docker-lint:fix
```

<hr>

<a id="configuration"></a>

## Prettier and ESLint Configuration

The ESLint config file is `eslint.config.js`, and the Prettier config file is `.prettierrc`. You can use these config files to set custom rules for ESLint and Prettier, respectively. **We highly recommend against modifying these files!** A change in the these configs, followed by a `docker-lint:fix` call, will likely cause a large amount of changes to the codebase. Additionally, Prettier [recommends against using too many options](https://prettier.io/docs/en/option-philosophy.html).

<hr>

<a id="ignoring-files"></a>

## Ignoring Files

Prettier does not format any files identified in `.prettierignore`. Similarly, ESLint does not format any files matched by ignore patterns in each ESLint configuration object in `eslint.config.js`. Modify these files if you believe that a file does not require any code linting or formatting, though [Prettier is useful for formatting a wide variety of files](https://prettier.io/docs/en/index.html). If you're unsure about whether a file should be formatted, please reach out to the core team for guidance.

<hr>

<a id="vscode-settings"></a>

## Project Specific VSCode Settings

To ensure consistent IDE behavior we have put together some project specific VSCode setting located in `.vscode/settings.json`. These setting enable:

- Prettier as the project's default formatter
- Prettier to format on file save
- ESLint to make any possible fixes on file save

<hr>

<a id="linting-rules"></a>

## Complete List of Linting Rules

For a complete list of our linting rules feel free to check out this [document](https://docs.google.com/spreadsheets/d/1-P5snFz9lqjcq_eypSXz13j7TQYxYKiRfylezdua4L4/edit?usp=sharing)
