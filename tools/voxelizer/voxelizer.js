// voxelizer.js
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5174;
const ROOT = __dirname;

// MIME-Fix (wie zuvor)
app.use((req, res, next) => {
  const ext = path.extname(req.path).toLowerCase();
  if (ext === '.glb')  res.type('model/gltf-binary');
  if (ext === '.gltf') res.type('model/gltf+json');
  if (ext === '.ktx2') res.type('image/ktx2');
  if (ext === '.wasm') res.type('application/wasm');
  if (ext === '.hdr')  res.type('image/vnd.radiance');
  next();
});

// Statisch ab Projekt-Root
app.use(express.static(ROOT, {
  index: 'index.html',
  extensions: ['html'],
  maxAge: '1h'
}));

// Healthcheck
app.get('/healthz', (_req, res) => res.type('text').send('ok'));

// 🔧 Fallback für alle übrigen Routen (KEIN '*')
// Variante 1: pfadloses Middleware-Handler
app.use((req, res) => {
  res.sendFile(path.join(ROOT, 'index.html'));
});

// // Variante 2 (alternativ): explizites Pattern mit (.*)
// app.get('/(.*)', (req, res) => {
//   res.sendFile(path.join(ROOT, 'index.html'));
// });

app.listen(PORT, () => {
  console.log(`Voxelizer-Server läuft: http://localhost:${PORT}`);
});
