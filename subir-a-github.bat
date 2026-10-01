@echo off
chcp 65001 > nul
cls
echo ========================================================
echo   SUBIR PROYECTO ANDROID A GITHUB (POKER BRILLIANT)
echo ========================================================
echo.
echo 1. Si an no has creado el repositorio en GitHub:
echo    - Entra a: https://github.com/new
echo    - Ponle un nombre (ejemplo: poker-brilliant-android)
echo    - DEJA DESMARCADAS las casillas "Add a README" o ".gitignore"
echo    - Haz clic en "Create repository".
echo.
echo ========================================================
echo.

set /p GIT_USER="Ingresa tu nombre o usuario de GitHub: "
set /p GIT_EMAIL="Ingresa tu correo de GitHub: "
set /p REPO_URL="Pega la URL de tu repositorio (https://github.com/...): "

if "%REPO_URL%"=="" (
    echo [ERROR] No ingresaste ninguna URL de repositorio.
    pause
    exit /b 1
)

echo.
echo [1/5] Configurando identidad local de Git...
git config user.name "%GIT_USER%"
git config user.email "%GIT_EMAIL%"

echo [2/5] Agregando archivos al control de versiones...
git add .

echo [3/5] Creando primer commit...
git commit -m "Primer commit: Poker Brilliant Android con simulador de orbita"

echo [4/5] Configurando rama principal 'main'...
git branch -M main
git remote remove origin 2>nul
git remote add origin %REPO_URL%

echo [5/5] Subiendo archivos a GitHub...
echo (Si es la primera vez, el navegador o la consola te pedira iniciar sesion)
git push -u origin main

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ========================================================
    echo   PROYECTO SUBIDO CON XITO A GITHUB!
    echo ========================================================
    echo   GitHub Actions empezara a compilar tu APK gratis.
    echo   Ve a la pestana "Actions" en tu repositorio para descargarlo.
    echo ========================================================
) else (
    echo.
    echo [AVISO] Ocurrio un inconveniente al subir. Revisa tus credenciales o permisos.
)

echo.
pause
