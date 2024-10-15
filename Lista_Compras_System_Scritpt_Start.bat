@echo off

:: Defina o caminho para o diretório ngrok
set NGROK_DIR=C:\Lista_Compras_System

:: Abra o PowerShell como administrador
powershell -Command "Start-Process powershell -Verb RunAs -ArgumentList '-Command', 'cd %NGROK_DIR%; ngrok http 3000' 
powershell -Command "Start-Process powershell -Verb RunAs -ArgumentList '-Command', 'cd %NGROK_DIR%; node server.js'
powershell -Command "Start-Process powershell -Verb RunAs -ArgumentList '-Command', 'cd %NGROK_DIR%; cd lista-compras-app; npx expo start --tunnel'"