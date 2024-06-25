#!/bin/bash

# 1. Removes all containers from local environment for project
# 2. Removes all images from local environment for project
# 3. Removes all volumes from local environment for project

GREEN='\033[1;32m'
CYAN='\033[1;36m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${CYAN}STARTING REMOVE ALL (wait for complete)${NC}"
echo -e "${YELLOW}NOTE: 'CTRL + z' to kill this script${NC}"
echo ''

CONTAINER_SEARCH_NAME=$1
IMAGE_SEARCH_NAME_DEV=$2
VOLUME_SEARCH_NAME=$3

# Remove containers
echo -e "${CYAN}Removing existing containers from local environment:${NC}"
CONTAINERS=$(docker ps -a -q -f name=$CONTAINER_SEARCH_NAME*)
if [ -z "$CONTAINERS" ]; then
  echo 'No containers to remove.'
else
  docker rm $CONTAINERS --force
  echo 'Removed containers.'
fi

# Remove images
echo -e "${CYAN}Removing existing dev images from local environment:${NC}"
IMAGES=$(docker images $IMAGE_SEARCH_NAME_DEV/* -q)
REMOVEDIMAGES=0
if [ ! -z "$IMAGES" ]; then
  docker rmi $IMAGES --force
  REMOVEDIMAGES=1
fi
if [ "$REMOVEDIMAGES" = 1 ]; then
  echo 'Removed images.'
else
  echo 'No images to remove.'
fi

# Remove volumes
echo -e "${CYAN}Removing existing volumes from local environment:${NC}"
VOLUMES=$(docker volume ls -q -f name=$VOLUME_SEARCH_NAME*)
if [ ! -z "$VOLUMES" ]; then
  docker volume rm $VOLUMES --force
  echo 'Removed volumes.'
else
  echo 'No volumes to remove.'
fi

echo ''
echo -e "${GREEN}REMOVE ALL COMPLETE!${NC}"