@echo off
title Ollama D-Drive Server
set OLLAMA_MODELS=D:\ollama_models
echo =======================================
echo   Starting Ollama Server on D-Drive...
echo =======================================
echo Models path: D:\ollama_models
echo.
ollama serve
pause
