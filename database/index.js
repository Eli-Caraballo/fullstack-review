const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  username: String,
  repoName: {type: String, unique: true},
  repoURL: String,
  stargazer_Count: Number
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (repos) => {
  new Promise((resolution, rejection) => {
      repos.forEach((repo) => {
      let instance = new Repo(repo);
      instance.save((err, data) => {
        if(err){
          console.log('Error in the save function (Database: Index.js)')
          rejection(err);
        }else{
          resolution();
          console.log(data.repoName + " saved to repo database.");
        }
      })
    });
  });
}

let retrieve = (callback) => {
  Repo.find({}).sort({stargazer_Count: -1}).limit(25).exec(callback);
}

module.exports.save = save;
module.exports.retrieve = retrieve;