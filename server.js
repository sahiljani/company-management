const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo'); // Updated import
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const path = require('path');
const connectDB = require('./config/db');
const cookieParser = require('cookie-parser');
// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cookieParser()); 

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Set up session middleware
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ // Create a new instance of MongoStore
        mongoUrl: process.env.MONGO_URI,
        collectionName: 'sessions' // Optional: specify the collection name
    }),
}));

// Set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Import Routes
const authRoutes = require('./routes/authRoutes');
const companyRoutes = require('./routes/companyRoutes');
const memberRoutes = require('./routes/memberRoutes');
const expenseRoutes = require('./routes/expenseRoutes');
const incomeRoutes = require('./routes/incomeRoutes');
const withdrawalRoutes = require('./routes/withdrawalRoutes');

// Use Routes
app.use('/auth', authRoutes);
app.use('/companies', companyRoutes);
app.use('/members', memberRoutes);
app.use('/expenses', expenseRoutes);
app.use('/incomes', incomeRoutes);
app.use('/withdrawals', withdrawalRoutes);

// Home route
app.get('/', (req, res) => {
    res.render('index');
});

// Start the server

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
