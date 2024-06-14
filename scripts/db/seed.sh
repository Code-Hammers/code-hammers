#!/usr/bin/bash

# Color variables
RED="\033[1;3;31m"
ORANGE="\033[1;3;38;5;208m"
GREEN="\033[1;3;32m"
CORNBLUE="\033[1;3;38;5;69m"
NC='\033[0m' # No color

echo -e "\n${GREEN}Seeding MongoDB with Dev Data${NC}"

MONGO_USER=root
MONGO_PWD=testpass
MONGO_HOST=ch-mongo-dev
MONGO_DB="ch-testdb"
MONGO_URI="mongodb://${MONGO_HOST}:27017"
IMPORT_STATUS=0

# echo -e "\n${CORNBLUE}Seeding Alumni Collection...${NC}\n"
# # mongoimport --username root --password testpass --uri ${MONGO_URI} --collection Alumni --type json --file ./usr/src/data/MOCK_ALUMNI.json
# mongoimport --drop --collection=Alumni ${MONGO_URI} /tmp/data/MOCK_ALUMNI.json
# IMPORT_STATUS=$?

# if [[ $IMPORT_STATUS != 0 ]]; then
#   echo -e "\n${RED}Alumni seeding failed!${NC}\n"
#   exit 1
# fi

# echo -e "\n${CORNBLUE}Seeding GraduationInvitations Collection...${NC}\n"
# mongoimport --username $MONGO_USER --password $MONGO_PWD --uri $MONGO_URI --collection GraduationInvitations --type json --file ./usr/src/data/MOCK_GRADUATION_INVITATIONS.json
# IMPORT_STATUS=$?
# if [[ $IMPORT_STATUS != 0 ]]; then
#   echo -e "\n${RED}GraduationInvitations seeding failed!${NC}\n"
#   exit 1
# fi
echo -e "\n${CORNBLUE}JSON Directory: ${PWD}tmp/data/MOCK_USERS.json${NC}\n"

echo -e "\n${CORNBLUE}Seeding Users Collection...${NC}\n"
# mongoimport --username $MONGO_USER --password $MONGO_PWD --uri $MONGO_URI --collection Users --type json --file ./usr/src/data/MOCK_USERS.json
mongoimport --username "${MONGO_USER}" --password "${MONGO_PWD}" --uri "${MONGO_URI}" --authenticationDatabase "${MONGO_DB}" --db "${MONGO_DB}" --drop --collection Users --type json --file /tmp/data/MOCK_USERS.json
IMPORT_STATUS=$?

echo -e "\n${RED} Users: IMPORT_STATUS = ${IMPORT_STATUS}${NC}\n"

if [[ $IMPORT_STATUS != 0 ]]; then
  echo -e "\n${RED}Users seeding failed!${NC}\n"
  exit 1
fi

# echo -e "\n${CORNBLUE}Seeding Profiles Collection...${NC}\n"
# mongoimport --username $MONGO_USER --password $MONGO_PWD --uri $MONGO_URI --collection Profiles --type json --file ./usr/src/data/MOCK_PROFILES.json
# IMPORT_STATUS=$?
# if [[ $IMPORT_STATUS != 0 ]]; then
#   echo -e "\n${RED}Profiles seeding failed!${NC}\n"
#   exit 1
# fi

# echo -e "\n${CORNBLUE}Seeding Forums Collection...${NC}\n"
# mongoimport --username $MONGO_USER --password $MONGO_PWD --uri $MONGO_URI --collection Forums --type json --file ./usr/src/data/MOCK_FORUMS.json
# IMPORT_STATUS=$?
# if [[ $IMPORT_STATUS != 0 ]]; then
#   echo -e "\n${RED}Forums seeding failed!${NC}\n"
#   exit 1
# fi

# echo -e "\n${CORNBLUE}Seeding Threads Collection...${NC}\n"
# mongoimport --username $MONGO_USER --password $MONGO_PWD --uri $MONGO_URI --collection Threads --type json --file ./usr/src/data/MOCK_THREADS.json
# IMPORT_STATUS=$?
# if [[ $IMPORT_STATUS != 0 ]]; then
#   echo -e "\n${RED}Threads seeding failed!${NC}\n"
#   exit 1
# fi

# echo -e "\n${CORNBLUE}Seeding Posts Collection...${NC}\n"
# mongoimport --username $MONGO_USER --password $MONGO_PWD --uri $MONGO_URI --collection Posts --type json --file ./usr/src/data/MOCK_POSTS.json
# IMPORT_STATUS=$?
# if [[ $IMPORT_STATUS != 0 ]]; then
#   echo -e "\n${RED}Posts seeding failed!${NC}\n"
#   exit 1
# fi

echo -e "\n${ORANGE}Muting logs for ch-mongo-dev...${NC}\n"
mongod --quiet --logpath /dev/null

echo -e "\n${GREEN}Seeding Complete! Have fun!${NC}\n"
exit 0