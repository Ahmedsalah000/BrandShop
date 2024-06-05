const path = require('path');
const express = require('express');
const dotenv = require('dotenv');

dotenv.config({ path: 'config.env' });
const morgan = require('morgan');
require('colors');
const compression = require('compression');
const cors = require('cors');
const bodyParser = require('body-parser');
//! security packages
const helmet = require("helmet");//to secure express app
const xss = require("xss-clean");//to prevent cross site scripting
const mongoSanitize = require("express-mongo-sanitize");//to prevent mongo injection

const ApiError = require('./utils/apiError');
const globalError = require('./middlewares/errorMiddleware');
const mountRoutes = require('./routes');
const { webhookCheckout } = require('./controllers/orderService');

const dbConnection = require('./config/database');


// DB Connection
dbConnection();

// Builtin Middleware
const app = express();
app.disable("x-powered-by");



// Security
app.use(helmet());//
app.use(xss());
app.use(mongoSanitize());

app.use(cors());
app.options('*', cors());
app.enable('trust proxy');//

// Add hook here before we call body parser, because stripe will send data in the body in form raw
app.post(
  '/webhook-checkout',
  express.raw({ type: 'application/json' }),
  webhookCheckout
);

// Used to parse JSON bodies
app.use(express.json());
// app.use(cors());
// app.options('*', cors());

// Parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,'uploads')));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
  console.log(`Mode : ${process.env.NODE_ENV}`.yellow);
}

app.use(compression());

app.use(cors());

// Mount routers
mountRoutes(app);


app.all('*', (req, res, next) => {
  // 3) Use a generic api error
  next(new ApiError(`Can't find this route: ${req.originalUrl}`, 400));
});

// Global error handler to catch error from express error
// 2) with refactoring
app.use(globalError);

const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`.green);
});

// we are listening to this unhandled rejection event, which then allow us to handle all
// errors that occur in asynchronous code which were not previously handled
process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  server.close(() => {
    console.log('unhandledRejection!! shutting down...');
    process.exit(1);
  });
});
