# Use Docker's Node.js 16 version image
FROM node:16

# Create the working directory
WORKDIR /app

# Copy application dependency manifest to the containter image 
# (* indicates both package and lock files are included)
COPY package*.json ./

# Install dependencies 
RUN npm install

# Copy all code into the container image
COPY . .

# Set the env port
ENV PORT=3000

EXPOSE 3000

# Run the webapp on container startup
CMD ["npm" , "start"]