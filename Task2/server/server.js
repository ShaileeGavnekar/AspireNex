// import express from 'express';
// import morgan from 'morgan';
// import cors from 'cors';
// import { config } from 'dotenv';
// import router from './router/route.js';


// /** import connection file */
// import connect from './database/conn.js';

// const app = express()


// /** app middlewares */
// app.use(morgan('tiny'));
// app.use(cors());
// app.use(express.json());
// config();


// /** appliation port */
// const port = process.env.PORT || 8080;


// /** routes */
// app.use('/api', router) /** apis */


// app.get('/', (req, res) => {
//     try {
//         res.json("Get Request")
//     } catch (error) {
//         res.json(error)
//     }
// })


// /** start server only when we have valid connection */
// connect().then(() => {
//     try {
//         app.listen(port, () => {
//             console.log(`Server connected to http://localhost:${port}`)
//         })
//     } catch (error) {
//         console.log("Cannot connect to the server");
//     }
// }).catch(error => {
//     console.log("Invalid Database Connection");
// })

import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { config } from 'dotenv';
import router from './router/route.js';
import connect from './database/conn.js';

// Initialize express app
const app = express();

// Load environment variables
config();

// Middleware
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());

// Application port
const port = process.env.PORT || 3000;

// Routes
app.use('/api', router); // APIs

// Root route
app.get('/', (req, res) => {
  try {
    res.json("Get Request");
  } catch (error) {
    res.json({ error: error.message }); // Improved error response
  }
});

// Start server only when we have a valid database connection
connect()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server connected to http://localhost:${port}`);
    });
  })
  .catch(error => {
    console.log("Invalid Database Connection", error);
  });
