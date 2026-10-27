@echo off
title CGM Performance - Workout App
cd /d "%~dp0"
echo Iniciando servidor local para CGM Performance Workout App...
powershell -ExecutionPolicy Bypass -File "%~dp0server.ps1"
pause
