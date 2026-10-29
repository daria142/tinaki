@echo off
chcp 65001 >nul
echo Установка пакетов ...
call npm install
if errorlevel 1 (echo Ошибка установки & pause & exit /b 1)
echo Запуск сайта: http://localhost:3000
call npm run dev
pause
