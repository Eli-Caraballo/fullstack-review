import React from 'react';

const RepoList = (props) => (
  <div>
    <h4> Repo List Component </h4>
    These are the top {props.repos.length} repos.
    {props.repos.map((repo) => {
      return  <div class='repos'>
                <a class='repotitle' href={repo.repoURL}>Repo: {repo.repoName}</a>
                <p class='info'>Username: {repo.username} - Stargazers: {repo.stargazer_Count}</p>
              </div>
    })}
  </div>
)

export default RepoList;