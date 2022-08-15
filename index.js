require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const connectDB = require('./config/dbCon');
const PORT = process.env.PORT || 3500;

// CONNECT TO MONGODB ---
connectDB();

// CORS ---
const allowedOrigins = [
	'https://macro.cstudio.ca',
	'http://10.0.0.84:3000',
	'http://localhost:3000',
];
const corsOptions = {
	origin: (origin, callback) => {
		if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
			callback(null, true);
		} else {
			callback(new Error('Not allowed by CORS'));
		}
	},
	optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// FOR URLENCODED FORM DATA
app.use(express.urlencoded({ extended: false }));

// FOR JSON ---
app.use(express.json());

// ROUTES ---
app.use('/', require('./routes/create'));

// LISTEN ---
mongoose.connection.once('open', () => {
	console.log('Connected to MongoDB');
	app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
});