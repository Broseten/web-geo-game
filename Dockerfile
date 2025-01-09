# Use an official Node.js runtime as a parent image
FROM node:20.13.1

# Set the working directory
WORKDIR /usr/src/app

# Copy the rest of the application code from the host machine to docker
COPY . .

# Install dependencies
RUN npm install

# Build the application
RUN npm run build

# Expose the port the app runs on
EXPOSE 1336

# Define the command to run the app
CMD ["npm", "start"]