const express = require('express');
const mongoose = require('mongoose');
const app = express();
const productRoutes = require('./routes/products');

const config = require('./config/dev');
const SampleDb = require('./sample-db');
const { EOVERFLOW } = require('constants');

const PORT = process.env.PORT || 3001;

mongoose.connect(config.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connection successful');
  const sampleDb = new SampleDb();
  sampleDb.initDb();
}).catch((error) => {
  console.log(error);
});

// const db = mongoose.connection
// db.on('error', console.error.bind(console, 'MongoDB connection error:'))
// db.once('open', () => console.log('MongoDB connection successful'))

app.use('/api/v1/products', productRoutes);

app.listen(PORT, () => {
  console.log('server listening on ' + PORT);
});


// mongoose.connect('mongodb+srv://test:test@cluster0-0viyl.mongodb.net/<dbname>?retryWrites=true&w=majority',
//   {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
//   }
// )
// const db = mongoose.connection
// db.on('error', console.error.bind(console, 'MongoDB connection error:'))
// db.once('open', () => console.log('MongoDB connection successful'))
