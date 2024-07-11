# Use an official Node.js runtime as a parent image
FROM node:22-alpine3.19

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn

# Copy the rest of the application code to the working directory
COPY . .

EXPOSE 5173

# Define the command to run the application
CMD ["yarn", "dev"]
