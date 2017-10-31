import React from 'react';
import Request from '../lib/request';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.doRequest();
  }

  doRequest() {
    const req = Request('GET', '/api/data');
    req.then(data => this.setState({ data })).catch(res => console.error(res));
  }

  render() {
    return (
      <div>
        <div className="module">
          <p>ajax</p>
          {this.state.data ? (
            <div>
              <p>{this.state.data.username}</p>
              <p>{this.state.data.type}</p>
              <p>{this.state.data.id}</p>
            </div>
          ) : (
            <div className="loader" />
          )}
        </div>
      </div>
    );
  }
}
