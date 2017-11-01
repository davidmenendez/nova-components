import React from 'react';
import Request from '../lib/request';
import Table from './Table';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    this.doRequest();
  }

  doRequest() {
    const req = Request('GET', '/api/data');
    req.then((data) => {
      this.setState({ data });
    }).catch(err => console.error(err));
  }

  render() {
    return (
      <div>
        <div className="module">
          <h3>table</h3>
          {this.state.data.length ? (
            <Table data={this.state.data} cols={['name', 'username', 'email']} />
          ) : (
            <div className="loader" />
          )}
        </div>
      </div>
    );
  }
}
