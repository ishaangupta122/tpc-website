const mongoose = require('mongoose');
const colorStyle = require('cli-color');

const connectDB = async () => {
	try {
		const connect = await mongoose.connect(`${process.env.MONGO_URL}/${process.env.DB_NAME}`);
		const connectionHost = connect.connection.host;
		console.log(colorStyle.magentaBright.bold(`Connected to DB: ${connectionHost}`));
	} catch (error) {
		const connectError = colorStyle.red.bold(`Cannot connect to DB: \n ${error}`);
		console.error(connectError);
	}
};

module.exports = connectDB;
