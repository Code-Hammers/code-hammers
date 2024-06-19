#!/bin/bash

RED='\033[0;31m'
YELLOW='\033[1;33m'
CORNBLUE="\033[1;3;38;5;69m"
NC='\033[0m' # No color

# Check to see if they passed in which file they want to test
if [ -z $1 ]; then
  echo -e "${RED}Test name not found. Please make sure to format the command properly:${NC}"
  echo -en '\n'
  echo -e "${YELLOW}Correct Syntax:${NC} 'npm run docker-test:solo <file name>' ";
  echo -en '\n'
  exit
fi

echo -e "${CORNBLUE}Running tests matching the file name \"$1\"...${NC}\n"
TEST_FILE=$1 docker-compose -f docker-compose-test-solo.yml up --abort-on-container-exit