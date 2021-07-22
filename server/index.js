import express from 'express'
import bodyParser from 'body-parser'
import path from 'path'
import cluster from 'cluster'
import cors from 'cors'
import os from 'os'

import { Low, JSONFile } from 'lowdb'

const __dirname = path.resolve();
const isDev = process.env.NODE_ENV !== 'production';
const PORT = process.env.PORT || 5000;
const numCPUs = os.cpus().length;

// Use JSON file for storage
const file = path.join(__dirname, '/server/db/db.json')
const adapter = new JSONFile(file)
const db = new Low(adapter)
await db.read()

if (db.data) {
  db.data = db.data
} else {
  db.data = { workouts: [] }
}

// Multi-process to utilize all CPU cores.
if (!isDev && cluster.isMaster) {
  console.error(`Node cluster master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.error(`Node cluster worker ${worker.process.pid} exited: code ${code}, signal ${signal}`);
  });

} else {
  const app = express();

  app.use(cors());

  app.use(bodyParser.json({ extended: true }));

  // Priority serve any static files.
  app.use(express.static(path.join(__dirname, '/react-ui/build')));

  // Answer API requests.
  app.get('/api', function (req, res) {
    res.set('Content-Type', 'application/json');
    res.send('{"message":"Hello from the custom server! Testing"}');
  });

  app.get('/workouts', function (req, res) {
    res.set('Content-Type', 'application/json');
    res.send(db.data.workouts);
  });

  app.post('/workouts', async function (req, res) {
    console.log(req.body)
    db.data.workouts.push(req.body)
    await db.write()
    res.send(req.body)
  });

  app.put('/workouts', async function (req, res) {
    console.log(req.body)
    db.data.workouts[req.body.workoutIdx] = req.body.workoutData
    await db.write()
    res.send(req.body)
  });

  app.put('/workouts/toggleFavourite', async function (req, res) {
    console.log(req.body)
    db.data.workouts[req.body.workoutIdx].isFavourite = !db.data.workouts[req.body.workoutIdx].isFavourite
    await db.write()
    res.send(req.body)
  });

  app.delete('/workouts', async function (req, res) {
    console.log(req.body)
    db.data.workouts.splice(req.body.workoutIdx, 1)
    await db.write()
    res.send(req.body)
  });

  // All remaining requests return the React app, so it can handle routing.
  app.get('*', function(request, response) {
    response.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'));
  });

  app.listen(PORT, function () {
    console.error(`Node ${isDev ? 'dev server' : 'cluster worker '+process.pid}: listening on port ${PORT}`);
  });
}