// Service Worker para CGM Rendimiento (v9)
// Estrategia: Red primero con respaldo sin conexión y limpieza de versiones viejas
const NOMBRE_CACHE = 'cgm-rendimiento-v9';
const ARCHIVOS_A_GUARDAR = [
  './',
  './index.html',
  './styles.css',
  './app.js',
  './ejercicios-db.js',
  './routine-data.js',
  './manifest.webmanifest',
  './icon.png',
  './icon.jpg'
];

self.addEventListener('install', (evento) => {
  self.skipWaiting();
  evento.waitUntil(
    caches.open(NOMBRE_CACHE).then((cache) => {
      return cache.addAll(ARCHIVOS_A_GUARDAR);
    }).catch((err) => {
      console.warn('Aviso de caché:', err);
    })
  );
});

self.addEventListener('activate', (evento) => {
  evento.waitUntil(
    caches.keys().then((nombresCache) => {
      return Promise.all(
        nombresCache.map((cache) => {
          if (cache !== NOMBRE_CACHE) {
            console.log('Borrando caché antigua:', cache);
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (evento) => {
  if (evento.request.method !== 'GET') return;

  evento.respondWith(
    fetch(evento.request)
      .then((respuestaRed) => {
        if (respuestaRed && respuestaRed.status === 200) {
          const copia = respuestaRed.clone();
          caches.open(NOMBRE_CACHE).then((cache) => {
            cache.put(evento.request, copia);
          });
        }
        return respuestaRed;
      })
      .catch(() => {
        return caches.match(evento.request).then((respuestaCache) => {
          if (respuestaCache) return respuestaCache;
          if (evento.request.headers.get('accept')?.includes('text/html')) {
            return caches.match('./index.html');
          }
        });
      })
  );
});

self.addEventListener('message', (evento) => {
  if (evento.data && evento.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
