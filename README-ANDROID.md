# Guía de Instalación en Celular Android: PokerMath

Este subdirectorio (`poker-brilliant-android`) contiene la versión optimizada para dispositivos móviles y el proyecto nativo de Android basado en **Capacitor**.

> **Nota de Seguridad**: El proyecto web original en `D:\MARCE\poker\poker-brilliant` se mantiene **100% intacto**.

---

## 🚀 Método 1: Instalación Inmediata en tu Celular (Recomendado)

No necesitas instalar Android Studio ni cables. Puedes tener la app instalada en tu teléfono en **30 segundos**:

1. Asegúrate de que tu celular esté conectado a la **misma red Wi-Fi** que tu computadora.
2. Haz doble clic en el archivo:
   ```
   D:\MARCE\poker\iniciar-poker-movil.bat
   ```
3. La pantalla negra te mostrará la dirección de tu red, por ejemplo:
   ```
   👉 http://192.168.130.132:5173
   ```
4. Abre **Google Chrome** en tu celular Android e ingresa esa dirección.
5. Verás un cartel verde superior que dice **"📲 Instalar PokerMath en tu Celular"** con un botón **"Instalar"** (o toca los 3 puntos verticales `⋮` de Chrome y pulsa *"Instalar aplicación"* / *"Añadir a pantalla de inicio"*).
6. ¡Listo! PokerMath aparecerá en tu lista de aplicaciones con su ícono de picas `♠`, abriéndose a pantalla completa como una **app nativa**, sin barras de navegador y con aceleración táctil fluida.

---

## 🛠️ Método 2: Generar APK Nativo con Android Studio

Si deseas compilar el archivo `.apk` binario instalable:

1. El proyecto nativo de Android ya está generado en la carpeta:
   ```
   D:\MARCE\poker\poker-brilliant-android\android
   ```
2. Haz doble clic en:
   ```
   D:\MARCE\poker\poker-brilliant-android\abrir-en-android-studio.bat
   ```
   *(O abre Android Studio manualmente y selecciona la carpeta `android`).*
3. En Android Studio, ve al menú superior:
   `Build` > `Build Bundle(s) / APK(s)` > `Build APK(s)`.
4. Una vez finalice la compilación, pulsa en el enlace **"locate"** que aparecerá abajo a la derecha para ver tu archivo **`app-debug.apk`**.
5. Pasa el archivo `app-debug.apk` a tu celular (por cable USB, WhatsApp, Telegram o Google Drive) y tócalo para instalarlo (habilita *"Permitir orígenes desconocidos"* si tu teléfono te lo solicita).
