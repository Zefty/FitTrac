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
        res.send('FitTrac API');
    });

    app.get('/api/user/:uid/workouts', async function (req, res) {
        res.set('Content-Type', 'application/json');
        if(req.query._id) {
            console.info(`[HTTP.GET]/api/user/${req.params.uid}/workouts?_id=${req.query._id}`);
            console.info(req.body);
            res.send(await workouts.findOne({uid: req.params.uid, _id: mongodb.ObjectId(req.query._id)}));
        } else {
            console.info(`[HTTP.GET]/api/user/${req.params.uid}/workouts`);
            res.send(await workouts.find({uid: req.params.uid}).toArray());
        }
    });

    app.post('/api/user/:uid/workouts', async function (req, res) {
        console.info(`[HTTP.POST]/api/user/${req.params.uid}/workouts`);
        console.info(req.body);
        req.body.creationDate = new Date();
        req.body.uid = req.params.uid;
        await workouts.insertOne(req.body);
        res.location(`/api/user/${req.params.uid}/workouts?_id=${req.body._id}`);
        res.status(201).send(req.body);
    });

    app.put('/api/user/:uid/workouts', async function (req, res) {
        if(req.query._id) {
            console.info(`[HTTP.PUT]/api/user/${req.params.uid}/workouts?_id=${req.query._id}`);
            console.info(req.body);
            const ret = await workouts.updateOne({uid: req.params.uid, _id: mongodb.ObjectId(req.query._id)}, { $set: req.body });
            ret.matchedCount === 0 ? res.status(400).send(`_id of ${req.query._id} is not found`) : res.status(204).send();
        } else {
            res.status(400).send(`_id of ${req.query._id} is not found`);
        }
    });

    app.delete('/api/user/:uid/workouts', async function (req, res) {
        if(req.query._id) {
            console.info(`[HTTP.DELETE]/api/user/${req.params.uid}/workouts?_id=${req.query._id}`);
            console.info(req.body)
            await workouts.deleteOne({ uid: req.params.uid, _id: mongodb.ObjectId(req.query._id)});
            res.status(204).send();
        } else {
            res.status(400).send(`Cannot delete _id of ${req.query._id}`);
        }  
    });

    // All remaining requests return the React app, so it can handle routing.
    app.get('*', function (request, response) {
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
        console.error(`Node ${isDev ? 'dev server' : 'cluster worker ' + process.pid}: listening on port ${PORT}`);
    });
}