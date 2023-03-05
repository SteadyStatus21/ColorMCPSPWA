const express = require('express');
const request = require('request');
const cheerio = require('cheerio');

const app = express();

const url = 'https://www.montgomeryschoolsmd.org/emergency/';

const colorMap = {
  'GREEN': 'green',
  'YELLOW': 'yellow',
  'BLUE': 'blue',
  'ORANGE': 'orange',
  'RED': 'red',
  'PURPLE': 'purple'
};

app.get('/code-status', (req, res) => {
  request(url, (error, response, html) => {
    if (!error && response.statusCode == 200) {
      const $ = cheerio.load(html);
      const codeStatus = $('#msgBtn').text().trim();
      const colorCode = codeStatus.split(' ')[1].toUpperCase();
      const color = colorMap[colorCode];

      res.send({ color });
    } else {
      res.status(500).send({ error: 'Error fetching website' });
    }
  });
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
