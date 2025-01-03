const fs = require('fs');

const express = require('express');
const app = express();

app.use(express.json());

// -------- To start server for postman testing use nodemon app.js -----------

// This is sync so will block but its okay as its at the top level and not within a callback function
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
};

app.get('/api/v1/tours', getAllTours);

app.get('/api/v1/tours/:id', (req, res) => {
  // Shows the params that are passed in the url with :name etc
  console.log(req.params);
  // attach the searched ID to a new variable, * 1 results in the string being converted to a number
  const id = req.params.id * 1;
  // Find method goes through the tours array and looks to see if the ID matches the searched number
  const tour = tours.find((el) => el.id === id);
  //   If there is no ID that matches
  if (!tour) {
    return res.status(404).json({
      status: 'Failed',
      message: 'Invalid ID',
    });
  }
  // If the ID matches the searched input
  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
});

app.post('/api/v1/tours', (req, res) => {
  //   console.log(req.body);
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
});

// Update a tour - Will come back to it
app.patch('/api/v1/tours/:id', (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'Failed',
      message: 'Invalid ID',
    });
  }
  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated tour here>',
    },
  });
});

// Deleting a tour
app.delete('/api/v1/tours/:id', (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'Failed',
      message: 'Invalid ID',
    });
  }
  res.status(204).json({
    status: 'success',
    data: null,
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port: ${port}......`);
});
