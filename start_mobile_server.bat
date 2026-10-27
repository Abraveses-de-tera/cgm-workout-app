@echo off
title CGM Rendimiento - Aplicación de Entrenamiento
cd /d "%~dp0"
echo Iniciando servidor local para CGM Rendimiento...
powershell -ExecutionPolicy Bypass -File "%~dp0server.ps1"
pause
