#!/bin/bash

# Color variables
RED='\033[0;31m'
GREEN='\033[32;1m'
YELLOW='\033[1;33m'
NC='\033[0m' # No color

PRETTIER_STATUS=0
ESLINT_STATUS=0

if [[ $1 == "--fix" ]]; then
  # Warn user that their files may be modified
  echo -e "${RED}Running lint checks in --fix mode. This may modify your files!\n${NC}"

  # Run Prettier in fix mode and store status
  echo -e "${YELLOW}Running Prettier to fix code formatting issues...${NC}\n"
  prettier --write .
  PRETTIER_STATUS=$?

  # Run ESLint in fix mode and store status
  echo -e "\n${YELLOW}Running ESLint to fix code quality issues...${NC}"
  npx eslint . --fix
  ESLINT_STATUS=$?
else
  # Run Prettier in check mode and store status
  echo -e "${YELLOW}Running Prettier to identify code formatting issues...${NC}\n"
  prettier --check .
  PRETTIER_STATUS=$?

  # Run ESLint in check mode and store status
  echo -e "\n${YELLOW}Running ESLint to identify code quality issues...${NC}"
  npx eslint .
  ESLINT_STATUS=$?
fi

# ESLint is silent after successful checks, so...
if [[ $ESLINT_STATUS == 0 ]]; then
  echo -e "\n${GREEN}ESLint checks passed!\n${NC}"
fi

# Let user know that checks have passed
if [[ $PRETTIER_STATUS == 0 && $ESLINT_STATUS == 0 ]]; then
  echo -e "${GREEN}All linting checks passed!\n${NC}"
  exit 0
fi

# Let user know that Prettier identified issues
if [[ $PRETTIER_STATUS != 0 ]]; then
  echo -e "${RED}Prettier found code formatting issues. Please address any errors above and try again.\n${NC}"
  exit 1
fi

# Let user know that all files are ignored
if [[ $ESLINT_STATUS == 2 ]]; then
  echo -e "${YELLOW}ESLint could not find any files to lint. This probably means that .eslintignore is ignoring too many files. Remove some files from .eslintignore and try again.${NC}\n"
  exit 0
fi

# Let user know that ESLInt has identified issues
if [[ $ESLINT_STATUS != 0 ]]; then
  echo -e "${RED}ESLint found code quality issues. Please address any errors above and try again.\n${NC}"
  exit 1
fi


