# Set Node.js version
FROM node:18.17.1 as builder

# Set the working directory
WORKDIR /usr/src/app

# Copy the package.json files
COPY package*.json ./
COPY client/package*.json ./client/

# Install dependencies
RUN npm install
COPY . .


RUN cd client && npm install

# Build the client application
RUN cd client && npm run build

# Change working directory back to root
WORKDIR /usr/src/app

# Copy all files
COPY . .

# Build the server
RUN npm run build

# Set up the final image
FROM node:18.17.1

# Set the working directory
WORKDIR /usr/src/app

# Copy built files from the builder stage
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/client/build ./client/build
COPY --from=builder /usr/src/app/node_modules ./node_modules

# Expose port
EXPOSE 80

# Start the server
CMD ["node", "dist/server/index.js"]


