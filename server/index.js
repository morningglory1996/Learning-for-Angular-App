'use strict'

const express = require('express');
const mongoose = require('mongoose');
<<<<<<< HEAD

=======

const productRoutes = require('./routes/products');
const path = require('path');

const config = require('./config');

>>>>>>> deploy
const SampleDb = require('./sample-db');

<<<<<<< HEAD

=======
>>>>>>> deploy

mongoose.connect(config.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
<<<<<<< HEAD

=======
}).then(() => {
  if(process.env.NODE_ENV !== 'production') {
  console.log('MongoDB connection successful');
  const sampleDb = new SampleDb();
  // sampleDb.initDb();
  }
}).catch((error) => {
  console.log(error);
});

>>>>>>> deploy

const app = express();
app.use('/api/v1/products', productRoutes);

if(process.env.NODE_ENV === 'production') {
<<<<<<< HEAD

=======
  const appPath = path.join(__dirname, '..', 'dist', 'resavation-app');
  app.use(express.static(appPath));
  app.get('*', (req,res) => {
    res.sendFile(path.resolve(appPath, 'index.html'));
  });
}

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log('server listening on ' + PORT);
>>>>>>> deploy
});
