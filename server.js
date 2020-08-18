const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

//Initialize express server
const app = express();

//DB
mongoose
	.connect(process.env.DB_URI, {
		useCreateIndex: true,
		useNewUrlParser: true,
		useFindAndModify: false,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log('DB successfully connected');
	});

//middleware
app.use(express.json());

//cors
if (process.enn.NODE_ENV === 'development') {
	app.use(cors());
}

//PORT
const PORT = 9000 || process.env.PORT;
app.listen(PORT, () => {
	console.log(`Server started on port ${PORT}`);
});
