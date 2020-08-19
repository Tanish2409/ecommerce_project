const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
//routes
const authRoutes = require('./routes/auth.js');
const userRoutes = require('./routes/user.js');
const brandRoutes = require('./routes/brand.js');
const categoryRoutes = require('./routes/category.js');
const productRoutes = require('./routes/product.js');

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
if (process.env.NODE_ENV === 'development') {
	app.use(cors());
}

//routes middleware
app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', brandRoutes);
app.use('/api', productRoutes);
app.use('/api', categoryRoutes);

//PORT
const PORT = 9000 || process.env.PORT;
app.listen(PORT, () => {
	console.log(`Server started on port ${PORT}`);
});
