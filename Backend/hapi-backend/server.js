// Minimal Hapi.js backend with SQLite for stress prediction logs
const Hapi = require('@hapi/hapi');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./stresslog.db');

// Create table if not exists
const initDb = () => {
  db.run(`CREATE TABLE IF NOT EXISTS predictions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    text TEXT NOT NULL,
    prediction TEXT NOT NULL,
    stress_percent REAL NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )`);
};

initDb();

const init = async () => {
  const server = Hapi.server({
    port: process.env.PORT || 3000,
    host: '0.0.0.0',
    routes: {
      cors: {
        origin: ['*'],
        additionalHeaders: ['Content-Type']
      }
    }
  });

  // Dummy predict endpoint (replace with real ML logic if needed)
  server.route({
    method: 'POST',
    path: '/predict',
    handler: (request, h) => {
      const { text } = request.payload;
      if (!text) {
        return h.response({ error: 'Text input is required' }).code(400);
      }
      // Dummy logic
      const prediction = text.includes('stres') ? 'Negative' : 'Positive';
      const stress_percent = prediction === 'Negative' ? 90 : 10;
      // Save to DB
      db.run('INSERT INTO predictions (text, prediction, stress_percent) VALUES (?, ?, ?)', [text, prediction, stress_percent]);
      return { prediction, stress_percent };
    }
  });

  // Get all logs
  server.route({
    method: 'GET',
    path: '/logs',
    handler: (request, h) => {
      return new Promise((resolve, reject) => {
        db.all('SELECT * FROM predictions ORDER BY created_at DESC', [], (err, rows) => {
          if (err) return reject(err);
          resolve(rows);
        });
      });
    }
  });

  // Delete log by id
  server.route({
    method: 'DELETE',
    path: '/logs/{id}',
    handler: (request, h) => {
      const { id } = request.params;
      db.run('DELETE FROM predictions WHERE id = ?', [id]);
      return { status: 'deleted', id };
    }
  });

  await server.start();
  console.log('Hapi server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init();
