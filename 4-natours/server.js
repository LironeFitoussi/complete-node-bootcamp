const mongoose = require('mongoose')
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });
const db = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD)
mongoose.connect(db, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
}).then(con => console.log('db connection successful'))

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a tour name'],
    unique: true
  },
  rating: {
    type: Number,
    default: 4.5
  },
  price: {
    type: Number,
    required: [true, 'Please add a tour price']
  }
})

const Tour = mongoose.model('Tour', tourSchema);

const testTour = new Tour({
  name: 'The Park Camper',
  // rating: 4.7,
  price: 997
})

testTour.save().then((doc) => {
  console.log(doc);
}).catch((err) => {
  console.log("Error! : " + err);
})

const port = process.env.PORT || 3000;
app.listen(3000, () => {
  console.log(`App running on port ${port}`);
});
