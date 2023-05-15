const express = require('express');
const app = express();
const axios = require('axios');

const cors = require('cors');
const whitelist = ['http://localhost:3000'];
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};
app.use(cors(corsOptions));
app.listen(5000, () => {
  console.log('App listening on port 5000');
});

app.get('/movies', async (req, res) => {
  try {
    const apiKey = 'ec5dbc72';
    const searchQuery = 'The Shawshank Redemption';
    //const apiUrl = `http://www.omdbapi.com/?apikey=${apiKey}&t=${searchQuery}`;
    const apiUrl = "http://www.omdbapi.com/?s=" + encodeURI("lord") + "&apikey=ec5dbc72"
    //const apiUrl = `http://www.omdbapi.com/?i=tt3896198&apikey=ec5dbc72`;

    const response = await axios.get(apiUrl);
    const data = response.data;

    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
