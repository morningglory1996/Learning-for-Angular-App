const express = require('express');
const mongoose = require('mongoose');
const app = express();
const productRoutes = require('./routes/products');

const config = require('./config/index');
const SampleDb = require('./sample-db');
const { EOVERFLOW } = require('constants');



mongoose.connect(config.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  if(process.env.NODE_ENV !== 'production') {
    console.log('MongoDB connection successful');
    const sampleDb = new SampleDb();
    // sampleDb.initDb();
  }
}).catch((error) => {
  console.log(error);
});


const PORT = process.env.PORT || 3001;
const path = require('path');


if(process.env.NODE_ENV === 'production') {
  const appPath = path.join(__dirname, '..', 'dist', 'resavation-app');
  app.use(express.static(appPath));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(appPath, 'index.html'));
  });
}


app.use('/api/v1/products', productRoutes);
app.listen(PORT, () => {
  console.log('server listening on ' + PORT);
});
