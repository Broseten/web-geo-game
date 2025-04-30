# Use an official Node.js runtime as a parent image
FROM node:20.13.1

# Set the working directory
WORKDIR /usr/src/app

# Copy the rest of the application code from the host machine to docker
COPY . .

# Accept a build argument for the port (default to 1336)
ARG PORT=1336

# Set the port as an environment variable
ENV PORT=${PORT}

# Expose the port dynamically
EXPOSE ${PORT}

# Define the command to run the app
CMD ["npm", "start"]