@echo off
chcp 65001 > nul
title Abrir PokerMath en Android Studio
cls

echo =======================================================================
echo          ♠ POKERMATH INTERACTIVE - ABRIR EN ANDROID STUDIO ♠
echo =======================================================================
echo.
echo  1. Compilando ultimos cambios de la app...
call npm run build

echo.
echo  2. Sincronizando con el proyecto nativo Android...
call npx cap sync android

echo.
echo  3. Abriendo proyecto en Android Studio...
call npx cap open android

echo.
echo  =======================================================================
echo  Para compilar el APK en Android Studio:
echo  1. Ve al menu superior: Build ^> Build Bundle(s) / APK(s) ^> Build APK(s)
echo  2. Cuando termine, haz clic en "locate" para obtener app-debug.apk
echo  3. Pasalo a tu celular e instalalo directamente.
echo  =======================================================================
echo.
pause
