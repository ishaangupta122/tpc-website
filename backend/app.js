const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const colorStyle = require('cli-color');
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
connectDB();

const PORT = process.env.PORT || 8002;

// Middlewares
app.use(
	cors({
		origin: 'http://localhost:5173',
	}),
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Server Running
app.listen(PORT, () => {
	console.log(colorStyle.magentaBright.bold(`Server Running on PORT: ${PORT}`));
});
