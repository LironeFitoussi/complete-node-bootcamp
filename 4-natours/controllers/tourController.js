// TODO: Migrate to ES6 EXP/IMP
const Tour = require('../models/tourModel');

// Tours Controllers
//? DONE
exports.getAllTours = async (req, res) => {
  try {
    const tours =  await Tour.find();
    res.status(200).json({
      status: 'success',
      results: tours.length,
      data: {
        tours,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
    })
  }
};

// TODO
exports.getTour = (req, res) => {
  const id = req.params.id * 1;
  // const tour = tours.find(
  //   (tour) => tour.id === id
  // );
  // res.status(200).json({
  //   status: 'success',
  //   data: {
  //     tour,
  //   },
  // });
};

//? DONE
exports.createTour = async  (req, res) => {
  try {
    // const newTour = new Tour({});
  // newTour.save();

  const newTour = await Tour.create(req.body)
  res.status(201).json({
    status: 'success',
    data: {
      tour: newTour,
    },
  });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    })
  }
}

// TODO
exports.updtaeTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated tour here...>',
    },
  });
};

// TODO
exports.deleteTour = (req, res) => {
  res.status(204).json({
    status: 'success',
    data: null,
  });
};
