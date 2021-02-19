// Express setup.
const express = require('express'); // Framework
const cors = require('cors');       // CORS
const morgan = require('morgan');   // Logging.
const app = express();              // Server object.

// Express middleware setup.
app.use(express.json());            // Parse body as JSON.
app.use(cors());                    // CORS-enabled for all domains.
app.use(morgan('tiny'));            // Logging all requests.
const port = 8081;                  // Serve on port 8081.

// Database setup.
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const db = low(adapter);
db.defaults({ posts: [] }).write();

/**
 * GET a specified amount of the `count` most recent messages
 * from our 'db'.
 */
app.get('/msg', (_, res) => {
    const posts = db.get('posts').value();
    res.status(200).json({posts}).end();
});

/**
 * POST to create a message in our 'db'.
 */
app.post('/msg', (req, res) => {
    db.get('posts').push(req.body.post).write();
    const posts = db.get('posts').value();
    res.status(200).json({posts}).end();
});

app.get('/', (_, res) => {
    res.send('hi!');
});

app.listen(port, () => {
    console.log(`Started listening at http://localhost:${port}`);
});
