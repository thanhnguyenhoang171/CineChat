#!/bin/bash
echo "Checking for npm vulnerabilities..."
npm audit

echo "Updating dependencies..."
npx npm-check-updates -u

echo "Installing updated packages..."
npm install

echo "Fixing vulnerabilities..."
npm audit fix --force

echo "Cleaning up..."
rm -rf node_modules package-lock.json

echo "Reinstalling..."
npm install

echo "Done! Checking remaining vulnerabilities..."
npm audit

# 