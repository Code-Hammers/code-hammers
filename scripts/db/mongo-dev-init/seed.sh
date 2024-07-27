#!/usr/bin/bash

# Color variables
RED="\033[1;3;31m"
ORANGE="\033[1;3;38;5;208m"
GREEN="\033[1;3;32m"
CORNBLUE="\033[1;3;38;5;69m"
NC='\033[0m' # No color

echo -e "\n${GREEN}Seeding MongoDB with Dev Data${NC}"

MONGO_DB=${MONGO_INITDB_DATABASE}
IMPORT_STATUS=0

echo -e "\n${CORNBLUE}Seeding Alumni Collection...${NC}\n"
mongoimport --db="${MONGO_DB}" --drop --collection="alumnis" --type="json" --file="docker-entrypoint-initdb.d/MOCK_ALUMNI.json" --jsonArray
IMPORT_STATUS=$?
if [[ $IMPORT_STATUS != 0 ]]; then
  echo -e "\n${RED}Alumni seeding failed!${NC}\n"
  exit 1
else
  echo -e "\n${GREEN}Alumni seeded successfully!${NC}\n"
fi

echo -e "\n${CORNBLUE}Seeding GraduateInvitations Collection...${NC}\n"
mongoimport --db="${MONGO_DB}" --drop --collection="graduateinvitations" --type="json" --file="docker-entrypoint-initdb.d/MOCK_GRADUATE_INVITATIONS.json" --jsonArray
IMPORT_STATUS=$?
if [[ $IMPORT_STATUS != 0 ]]; then
  echo -e "\n${RED}GraduateInvitations seeding failed!${NC}\n"
  exit 1
else
  echo -e "\n${GREEN}GraduateInvitations seeded successfully!${NC}\n"
fi

echo -e "\n${CORNBLUE}Seeding Users Collection...${NC}\n"
mongoimport --db="${MONGO_DB}" --drop --collection="users" --type="json" --file="docker-entrypoint-initdb.d/MOCK_USERS.json" --jsonArray
IMPORT_STATUS=$?
if [[ $IMPORT_STATUS != 0 ]]; then
  echo -e "\n${RED}Users seeding failed!${NC}\n"
  exit 1
else
  echo -e "\n${GREEN}Users seeded successfully!${NC}\n"
fi

echo -e "\n${CORNBLUE}Seeding Profiles Collection...${NC}\n"
mongoimport --db="${MONGO_DB}" --drop --collection="profiles" --type="json" --file="docker-entrypoint-initdb.d/MOCK_PROFILES.json" --jsonArray
IMPORT_STATUS=$?
if [[ $IMPORT_STATUS != 0 ]]; then
  echo -e "\n${RED}Profiles seeding failed!${NC}\n"
  exit 1
else
  echo -e "\n${GREEN}Profiles seeded successfully!${NC}\n"
fi

echo -e "\n${CORNBLUE}Seeding Forums Collection...${NC}\n"
mongoimport --db="${MONGO_DB}" --drop --collection="forums" --type="json" --file="docker-entrypoint-initdb.d/MOCK_FORUMS.json" --jsonArray
IMPORT_STATUS=$?
if [[ $IMPORT_STATUS != 0 ]]; then
  echo -e "\n${RED}Forums seeding failed!${NC}\n"
  exit 1
else
  echo -e "\n${GREEN}Forums seeded successfully!${NC}\n"
fi

echo -e "\n${CORNBLUE}Seeding Threads Collection...${NC}\n"
mongoimport --db="${MONGO_DB}" --drop --collection="threads" --type="json" --file="docker-entrypoint-initdb.d/MOCK_THREADS.json" --jsonArray
IMPORT_STATUS=$?
if [[ $IMPORT_STATUS != 0 ]]; then
  echo -e "\n${RED}Threads seeding failed!${NC}\n"
  exit 1
else
  echo -e "\n${GREEN}Threads seeded successfully!${NC}\n"
fi

echo -e "\n${CORNBLUE}Seeding Posts Collection...${NC}\n"
mongoimport --db="${MONGO_DB}" --drop --collection="posts" --type="json" --file="docker-entrypoint-initdb.d/MOCK_POSTS.json" --jsonArray
IMPORT_STATUS=$?
if [[ $IMPORT_STATUS != 0 ]]; then
  echo -e "\n${RED}Posts seeding failed!${NC}\n"
  exit 1
else
  echo -e "\n${GREEN}Posts seeded successfully!${NC}\n"
fi

echo -e "\n${GREEN}Seeding Complete! Have fun!${NC}\n"