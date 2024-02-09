const express = require('express');
const cors = require('cors');
const mainController = require('./controllers/Api/mainController');

const corsConfig = {
  origin: 'http://localhost:3000',
  methods: 'GET,HEAD',
  credentials: true,
};

const app = express();

app.use(express.json());
app.use(cors(corsConfig));
app.use('/', mainController);

const port = 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
