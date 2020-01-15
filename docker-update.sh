#!/bin/bash
echo ========================
echo Updating code...
echo ========================
git pull origin master

echo ========================
echo Building new image...
echo ========================
docker-compose build --no-cache

echo ========================
echo Starting services...
echo ========================
docker-compose up -d
