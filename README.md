# ♠ PokerMath Interactive (Estilo Brilliant.org)

Aplicación interactiva y gamificada de aprendizaje de matemáticas de poker basada estrictamente en el libro de **Alton Hardin**: *"Essential Poker Math: Fundamental No Limit Hold'em Mathematics You Need to Know (Expanded Edition)"*.

---

## 🚀 Cómo Iniciar la Aplicación

### Opción 1: Lanzador Rápido (Recomendado)
Haz doble clic sobre el archivo:
```
D:\MARCE\poker\iniciar-poker-brilliant.bat
```
Esto abrirá automáticamente tu navegador en `http://localhost:5173`.

### Opción 2: Desde Terminal
```bash
cd D:\MARCE\poker\poker-brilliant
npm run dev
```

---

## 📚 Estructura de los 8 Módulos de Aprendizaje

| Módulo | Tema del Libro | Simulador / Widget Interactivo | Ejercicios |
|---|---|---|---|
| **M1** | Probabilidad, Ratios & Equity (Cap. 4 y 5) | Conversor interactivo de Odds ($A:B$) y % de Equity | Conversión mental rápida, coin flips, coolers |
| **M2** | Outs y Regla del 2 y 4 (Cap. 8 y 9) | Selector de Outs, cartas sucias y ajuste de Hardin (>8 outs) | Proyectos comunes, dirty outs, all-in flop |
| **M3** | Pot Odds y "¿Podemos Pagar?" (Cap. 6 y 11) | Batalla visual Pot Odds vs Equity con slider de apuestas | 1/2 bote, bote entero, overbet, river calls |
| **M4** | Implied Odds & Reverse Implied (Cap. 7) | Medidor de profundidad de stack y dinero extra necesario | Cálculo de dinero futuro, trampas de color dominado |
| **M5** | Expected Value (EV) y la Balanza (Cap. 10 y 17) | Balanza física animada basculante con inclinación según EV | Ponderación de probabilidades, EV(Fold) = $0 |
| **M6** | Matemática Pre-Flop: Set-Mining & Steals (Cap. 12 y 13) | Calculador de la Regla del 20x y Break-even de robo | Parejas 22-99, subidas a 2.5bb, 3-bet bluffs |
| **M7** | Post-Flop: Value Bets, Semi-Bluffs & MDF (Cap. 14, 15 y 16) | Simulador 2D de Semi-Farol (Fold Equity + Card Equity) | Faroles puros, Alpha, frecuencia mínima de defensa |
| **M8** | Combinatoria y Bloqueadores (Cap. 18) | Matriz 13x13 interactiva (1,326 combos) con Card Removal | Bloqueo de Ases (6 a 3 combos), Hero Calls con Nut Blocker |

---

## 🛠️ Stack Tecnológico

- **React 19 & TypeScript**: Tipado estricto con `verbatimModuleSyntax` para máxima estabilidad.
- **Vite 6**: Arranque ultraveloz en < 200 ms y recarga en caliente instantánea.
- **Tailwind CSS v4**: Diseño visual moderno tipo *Dark Poker Felt* con micro-animaciones fluidas.
- **Lucide Icons**: Iconografía matemática y gamificada.
- **Canvas Confetti**: Celebración y refuerzo positivo al resolver problemas.
- **Local Storage**: Progreso persistente automático (XP, racha y problemas dominados).

---

## 🧪 Tests Automatizados

Para verificar la precisión matemática de todas las fórmulas contra los apéndices del libro:
```bash
node test-math.mjs
```
*(Los 15 tests automatizados de validación pasan al 100%).*
