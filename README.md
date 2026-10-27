# CGM PERFORMANCE · App de Entrenamiento Frecuencia 1,5
### Plan Personalizado de Carlos Graña

Aplicación web móvil progresiva (**PWA**) diseñada específicamente para registrar y progresar en tu rutina de entrenamiento de **Frecuencia 1,5**, inspirada en los mejores proyectos de tracking open-source de GitHub (*Hevy, Strong, Forge, openGym*), adaptada al 100% a la metodología, ejercicios, directrices y estética del PDF de **Carlos Graña / CGM Performance**.

---

## 📸 Características Principales

1. **Diseño y Temática Oficial CGM Performance**:
   - Paleta de colores idéntica al documento: **Negro Obsidiana (`#0a0c10`)** y **Oro Metálico (`#d4af37`)**.
   - Logo oficial vectorizado en alta definición (emblema dorado con silueta culturista).
   - Tipografía grande de alto contraste optimizada para las luces del gimnasio y uso con manos sudorosas.

2. **Sistema Completo de Frecuencia 1,5 (4 Semanas Rotativas)**:
   - **Semana 1 a 4**: Calendario interactivo con detección automática del día de hoy.
   - Regla de repetición del sábado (en negro en la tabla del PDF) y rotación del lunes siguiente.
   - Selector directo para días sueltos (**D1 Espalda**, **D2 Pecho-hombro**, **D3 Pierna**, **D4 Brazo**).

3. **Modo Gym Activo (Live Workout Tracker)**:
   - Prescripción técnica exacta de Carlos Graña para cada ejercicio.
   - **Calculador automático de Back-off (-20%)**: Al introducir el peso de tu Top Set (ej. 100 kg), la app calcula al vuelo el 80% (80 kg) y te ofrece un botón de un toque para rellenar la serie de back-off.
   - Etiquetas de serie: `TOP SET`, `BACK OFF`, `DESCENDENTE`, `LASTRE`, `AL FALLO`.
   - Comparador de marcas: Muestra en gris tenue el peso y repeticiones que hiciste en la sesión anterior para aplicar **sobrecarga progresiva**.
   - Botón de check con vibración táctil (**Haptic**) y sonido sintetizado mediante Web Audio API (100% offline).

4. **Cronómetro de Descanso Inteligente**:
   - Barra flotante con indicador circular de progreso.
   - Botones rápidos de `+15s`, `-15s` y `Saltar`.
   - Alarma sonora y doble vibración en tu móvil al terminar el descanso.

5. **Calculadora de Discos (Plate Calculator)**:
   - Introduce el peso total objetivo y el tipo de barra (20 kg, 15 kg, 10 kg).
   - Visualiza gráficamente los discos exactos que debes cargar a cada lado de la barra (25, 20, 15, 10, 5, 2.5, 1.25 kg).

6. **Resumen y Envío a WhatsApp**:
   - Confeti al terminar la sesión.
   - Cálculo de volumen total levantado en kg, tiempo total y nuevos récords (PRs).
   - Botón *"Compartir Resumen por WhatsApp"* que genera el mensaje listo para mandárselo a Carlos Graña o a tus compañeros.

7. **100% Privado y Offline (PWA)**:
   - Tus datos se guardan en tu propio móvil (`localStorage`).
   - Sin registros ni suscripciones.
   - Exportación e importación en formato JSON para que nunca pierdas tu historial.

---

## 📱 Cómo Usar la App en tu Móvil

Tienes dos formas muy sencillas de tenerla en tu móvil:

### Opción 1: En tu red Wi-Fi local (En 1 minuto)
1. En tu ordenador, haz doble clic en el archivo `start_mobile_server.bat` (o ejecuta `server.ps1`).
2. La consola te mostrará una dirección similar a:
   ```
   http://192.168.1.XX:8080
   ```
3. Conecta tu teléfono a la **misma red Wi-Fi** y abre esa dirección en el navegador (**Safari** en iPhone, **Chrome** en Android).
4. **Instálala como App Nativa**:
   - **En iPhone (Safari)**: Pulsa el botón **Compartir** (icono de cuadrado con flecha hacia arriba) y selecciona **"Añadir a pantalla de inicio"** (*Add to Home Screen*).
   - **En Android (Chrome)**: Pulsa los **tres puntos** arriba a la derecha y selecciona **"Instalar aplicación"** o **"Añadir a pantalla de inicio"**.
5. ¡Listo! Ya tendrás el icono de **CGM Entreno** en la pantalla de tu móvil, funcionando a pantalla completa sin barras de navegador.

---

### Opción 2: Subirla a GitHub Pages (Recomendado para ir al gym 24/7)
Al ser una aplicación 100% estática (HTML, CSS y JavaScript puro):
1. Sube esta carpeta a un repositorio público o privado en tu cuenta de GitHub (ejemplo: `rutina-cgm`).
2. En GitHub entra en **Settings** > **Pages**.
3. En *Branch*, elige `main` y guarda.
4. En 30 segundos tendrás un enlace HTTPS gratuito tipo `https://tu-usuario.github.io/rutina-cgm/`.
5. Ábrelo desde el móvil y dale a *"Añadir a pantalla de inicio"*. Funcionará siempre, con o sin cobertura en el sótano del gimnasio.

---

## 📋 Estructura de la Rutina Carlos Graña (Frecuencia 1,5)

### 🗓️ Cuadrícula de 4 Semanas
| Semana | Lunes | Martes | Miércoles | Jueves | Viernes | Sábado (Repetición) | Domingo |
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| **Semana 1** | D1 Espalda | D2 Pecho-hombro | D3 Pierna | Descanso | D4 Brazo | **D1 Espalda** | Descanso |
| **Semana 2** | D2 Pecho-hombro | D3 Pierna | D4 Brazo | Descanso | D1 Espalda | **D2 Pecho-hombro** | Descanso |
| **Semana 3** | D3 Pierna | D4 Brazo | D1 Espalda | Descanso | D2 Pecho-hombro | **D3 Pierna** | Descanso |
| **Semana 4** | D4 Brazo | D1 Espalda | D2 Pecho-hombro | Descanso | D3 Pierna | **D4 Brazo** | Descanso |

---

### 🏋️ Detalle de los Días

#### **DÍA 1: Espalda y posterior**
1. **Pull over en polea** — 3 × 12 reps
2. **Dominadas** — 2 series:
   - 1 serie con lastre a 8 reps
   - 1 serie sin peso al fallo
3. **Remo con barra** — 3 series:
   - Top set (pesada al límite)
   - Back off (−20 %)
   - 3.ª serie con el peso del back off y descendente
4. **Jalón agarre cerrado** — 3 × 12 reps (la última serie descendente)
5. **Remo Dorian** — 3 × 12 reps
6. **Posterior en máquina** — 3 × 15 reps
7. **Remo al mentón en polea** — 3 × 15 reps

#### **DÍA 2: Pecho y hombro**
1. **Press inclinado** — 2 series (Top set + back off −20 %)
2. **Aperturas** — 3 × 12 reps
3. **Press declinado** — 2 series (Top set + back off −20 %)
4. **Cruce de poleas** — 2 × 12 reps
5. **Elevaciones laterales** — 4 × 12 reps (la última serie descendente)
6. **Press militar** — 2 × 8 reps
7. **Elevaciones frontales** — 2 × 12 reps

#### **DÍA 3: Pierna**
1. **Femoral tumbado** — 3 × 12 reps
2. **Extensiones de cuádriceps** — 3 × 15 reps
3. **Sentadilla pendular** — 3 × 12 reps
4. **Prensa** — 2 series (Top set + back off −20 %)
5. **Aductor** — 3 × 15 reps
6. **Femoral sentado** — 3 × 12 reps

#### **DÍA 4: Brazo**
1. **Curl de bíceps con mancuernas** — 3 × 12 reps
2. **Tríceps en polea con cuerda** — 3 × 12 reps
3. **Curl de bíceps en banco Scott** — 3 × 10 reps
4. **Tríceps tras nuca unilateral** — 3 × 10 reps
5. **Curl martillo** — 2 × 10 reps
6. **Fondos** — 2 × 10 reps

---

## 💾 Archivos del Proyecto

- `index.html`: Estructura principal y componentes de la PWA.
- `styles.css`: Estilos visuales con estética CGM Performance (negro y dorado, safe areas móviles).
- `routine-data.js`: Base de datos de ejercicios, series, notas y esquema de 4 semanas.
- `app.js`: Lógica de la app, temporizadores, haptics, sonidos, cálculo de discos y almacenamiento.
- `sw.js`: Service worker para funcionamiento 100% offline.
- `manifest.webmanifest`: Manifiesto para instalación como aplicación móvil nativa.
- `icon.svg`: Emblema vectorial dorado de CGM Performance.
- `server.ps1` & `start_mobile_server.bat`: Servidor local para acceso móvil en red Wi-Fi doméstica.
