const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const app = require('./app.js');

const mongoose = require('mongoose');

const db = process.env.DATABASE
mongoose.connect(db, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
}).then(con => console.log('db connection successful'))

const port = process.env.PORT || 3000;
app.listen(3000, () => {
  console.log(`App running on port ${port}`);
});
