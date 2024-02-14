const dotenv = require('dotenv');
const app = require('./app.js');
const mongoose = require('mongoose');

dotenv.config({ path: './config.env' });

const db = process.env.DATABASE.replace('<password>', process.env.PASSWORD);
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then((con) => console.log('db connection successful'));

const port = process.env.PORT || 3000;
app.listen(3000, () => {
  console.log(`App running on port ${port}`);
});
