import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: []
    }

  }

  componentDidMount() {
    $.ajax({
      url: '/repos',
      type: 'GET',
      contentType: "application/json",
      success: (data) => {
        this.update(data);
        console.log('Sick! It Worked (CompenentDidMount Function Index.jsx client)');
      },
      error: () => {console.log('Sike! You Wish You Had No Errors (CompenentDidMount Function Index.jsx client)');}
    });
  }

  update(data) {
    this.setState({
      repos: data
    })
  }

  search(term) {
    console.log(`${term} was searched`);
    $.ajax({
      url: '/repos',
      type: 'POST',
      data: JSON.stringify({'username':term}),
      contentType: "application/json",
      success: () => {
        $.ajax({
          url: '/repos',
          type: 'GET',
          contentType: "application/json",
          success: (data) => {
            this.update(data);
            console.log('Sick! It Worked (CompenentDidMount Function Index.jsx client)');
          },
          error: () => {console.log('Sike! You Wish You Had No Errors (CompenentDidMount Function Index.jsx client)');}
        });
        console.log('Sick! It Worked (Search Function Index.jsx client)');},
      error: () => {console.log('Sike! You Wish You Had No Errors (Search Function Index.jsx client)');}
    });
  }


  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <Search onSearch={this.search.bind(this)}/>
      <RepoList repos={this.state.repos}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));