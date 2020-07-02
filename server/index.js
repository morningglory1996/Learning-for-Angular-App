const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const productRoutes = require('./routes/products');
const userRoutes = require('./routes/users');


const path = require('path');

const config = require('./config');

const SampleDb = require('./sample-db');
const { EOVERFLOW } = require('constants');


mongoose.connect(config.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}).then(() => {
  if(process.env.NODE_ENV !== 'production') {
  console.log('MongoDB connection successful');
  const sampleDb = new SampleDb();
  // sampleDb.initDb();
  }
}).catch((error) => {
  console.log(error);
});


const app = express();

app.use(bodyParser.json())

app.use('/api/v1/products', productRoutes);
app.use('/api/v1/users', userRoutes);


if(process.env.NODE_ENV === 'production') {
  const appPath = path.join(__dirname, '..', 'dist', 'resavation-app');
  app.use(express.static(appPath));
  app.get('*', (req,res) => {
    res.sendFile(path.resolve(appPath, 'index.html'));
  });
}

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log('server listening on ' + PORT);
});