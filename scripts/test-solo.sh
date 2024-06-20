#!/bin/bash

RED='\033[0;31m'
YELLOW='\033[1;33m'
GREEN='\033[32;1m'
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

printf $"${YELLOW}\nAre you running a server or client test? (Enter S for server or C for client) [S/C]${NC}\n"
read -r SC

if [[ $SC == "S" || $SC == "s" || $SC == "" ]]; then
  echo -e "${GREEN}Gotcha. Looking for test files matching \"$1\" in the server${NC}\n"
  TEST_CMD="test" TEST_FILE=$1 docker-compose -f docker-compose-test-solo.yml up --abort-on-container-exit
fi

if [[ $SC == "C" || $SC == "c" ]]; then
  echo -e "${GREEN}Gotcha. Looking for test files matching \"$1\" in the client${NC}\n"
  TEST_CMD="test:client" TEST_FILE=$1 docker-compose -f docker-compose-test-solo.yml up --abort-on-container-exit
fi