FROM node:22-alpine

WORKDIR /app

# Copy package management files first to leverage Docker cache layers
COPY package*.json ./

# Install only production dependencies cleanly
RUN npm install


# Copy the rest of your application source code
COPY . .

# Expose the port your Node.js application listens on
EXPOSE 3000

CMD ["npm","run","dev"]