const express = require('express');
const axios = require('axios');
const github = require('../helpers/github.js')
const database = require('../database/index.js')
let app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(express.json());

app.post('/repos', function (req, res, next) {
  axios({
    method: 'get',
    url: `https://api.github.com/users/${req.body.username}/repos`,
  })
    .then((result) => {return result.data.map((repo) => {
      return {
            'username': req.body.username,
            'repoName': repo.name,
            'repoURL': repo.html_url,
            'stargazer_Count': repo.stargazers_count
          }
        })})
    .then((data) => {database.save(data)})
    .catch(() => {console.log('Error post in Server: index.js')})
    .then(() => {res.end()});

  console.log('This Worked You are a beast');
});


app.get('/repos', function (req, res) {
  database.retrieve((err, repos) => {
    if(err){
      console.log("Error at GET (Server: Index.js)")
      res.status(404).end();
    } else {
      res.send(repos.map((repo) => {
        return repo._doc;
      }));
    }
  });
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

