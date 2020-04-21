const axios = require('axios');
const request = require('request');
const config = require('../config.js');


let getReposByUsername = (username) => {
  var result;
  axios({
    method: 'get',
    url: `https://api.github.com/users/${username}/repos`,
  })
    .then((result) => {return result.data.map((repo) => {
      return {
            'username': username,
            'repoName': repo.name,
            'repoURL': repo.html_url,
            'stargazer_Count': repo.stargazers_count
          }
        })})
    .then((data) => {return data});

  // TODO - Use the request module to request repos for a specific
  // user from the github API
  // The options object has been provided to help you out,
  // but you'll have to fill in the URL]



  // axios.get(`https://api.github.com/users/${username}/repos`)
  //   .then((result) => {return result.map((repo) => {
  //     return {
  //       'username': username,
  //       'repoName': repo.name,
  //       'repoURL': repo.html_url,
  //       'stargazer_Count': repo.stargazer_count
  //     }
  //   })})
  //   .catch(() => {console.log('You Suck (Helper: Github.js)')})


  // let options = {
  //   url: 'https://api.github.com',
  //   headers: {
  //     'User-Agent': 'request',
  //     'Authorization': `token ${config.TOKEN}`
  //   }
  // };

}

module.exports.getReposByUsername = getReposByUsername;