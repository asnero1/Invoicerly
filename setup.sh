#!/bin/bash

echo "Initializing Invoicerly project..."

# Initialize Git repository
git init

# Create core folders
mkdir client server db docs

# Setup Next.js frontend
echo "Setting up Next.js frontend..."
cd client
npx create-next-app@latest . --ts --eslint --tailwind --app
cd ..

# Setup Express.js backend
echo "Setting up Express.js backend..."
cd server
npm init -y
npm install express cors dotenv pg
mkdir src
echo "console.log('Backend running');" > src/index.js
cd ..

# Set up database configuration
echo "Setting up database configuration..."
cd db
echo "Database setup files go here" > README.md
cd ..

echo "Setup completed successfully!"
