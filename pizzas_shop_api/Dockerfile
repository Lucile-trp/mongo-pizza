# Use an official Node.js runtime as the base image
FROM node:lts

# Set the working directory in the container
WORKDIR /app

# Copy the rest of the application code to the container
COPY . .

# Install the dependencies
RUN npm install

# Expose the port that the application will listen on
EXPOSE 3001

# Define the command to run the application
CMD [ "npm", "start" ]
