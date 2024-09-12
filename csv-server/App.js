const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Connection } = require('./postgres');

const app = express();
const port = process.env.PORT || 8081;

// Open database connection
Connection.open();

// Middleware
app.use(cors());
app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));
app.use(express.static(__dirname));
app.use(express.json());

// CORS configuration
const allowOrigin = process.env.NODE_ENV === "production" 
  ? process.env.URL_PRODUCTION 
  : "*";

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', allowOrigin);
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  // Uncomment the next line if you need credentials
  // res.header('Access-Control-Allow-Credentials', 'true');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// Routes
require('./routes')(app);

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});