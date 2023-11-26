#SET NODE VERSION
FROM node:18.17.1 as builder

#CONTAINER WORKING DIRECTORY
WORKDIR /usr/src/app

#COPY FILES INTO CONTAINER AT /usr/src/app
COPY . .

#INSTALL ROOT PACKAGES
RUN npm install

#INSTALL CLIENT PACKAGES
RUN cd client && npm install && npm run build

#SERVE BUILT FILES
FROM node:18.17.1

#SET WORKING DIRECTORY
WORKDIR /usr/src/app

#COPY FROM BUILDER STAGE
COPY --from=builder /usr/src/app/client/build ./client/build
COPY --from=builder /usr/src/app/node_modules ./node_modules

#EXPOSE PORT
EXPOSE 80

#DEFAULT CMD TO SERVE BUILT FILES
CMD ["npx", "serve", "-s", "client/build", "-l", "80"]
