import express from 'express'
import bodyParser from 'body-parser'
import path from 'path'
import cluster from 'cluster'
import cors from 'cors'
import os from 'os'
import mongodb from 'mongodb'

const __dirname = path.resolve();
const isDev = process.env.NODE_ENV !== 'production';
const PORT = process.env.PORT || 5000;
const numCPUs = os.cpus().length;

const uri = process.env.MONGO_URI;
const client = new mongodb.MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
await client.connect();
const database = client.db('FitTrac');
const workouts = database.collection('workouts');

const proc = ['transformed.js', 'main.css', 'favicon.ico']

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

  app.get('/workouts', async function (req, res) {
    res.set('Content-Type', 'application/json');
    res.send(await workouts.find({}).toArray());
  });

  app.post('/workouts', async function (req, res) {
    console.log(req.body)
    await workouts.insertOne(req.body)
    res.send(req.body)
  });

  app.put('/workouts', async function (req, res) {
    console.log(req.body)
    const {_id, ...update} = req.body;
    await workouts.updateOne({_id: mongodb.ObjectId(_id)}, {$set: update}, {upsert: true})
    res.send(req.body)
  });

  app.delete('/workouts', async function (req, res) {
    console.log(req.body)
    const {_id, ...update} = req.body;
    await workouts.deleteOne({_id: mongodb.ObjectId(_id)})
    res.send(req.body)
  });

  // All remaining requests return the React app, so it can handle routing.
  app.get('*', function(request, response) {
    const path = request.params['0'].substring(1)

    if (proc.includes(path)) {
      // Return the actual file
      response.sendFile(`${__dirname}/react-ui/build/${path}`);
    } else {
      // Otherwise, redirect to /build/index.html
      response.sendFile(`${__dirname}/react-ui/build/index.html`);
    }
  });

  app.listen(PORT, function () {
    console.error(`Node ${isDev ? 'dev server' : 'cluster worker '+process.pid}: listening on port ${PORT}`);
  });
}