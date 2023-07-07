@echo off
set mypath=%cd%
start node %mypath%\frontend\server.js
start node %mypath%\backend\server.js