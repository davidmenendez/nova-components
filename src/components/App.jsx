import React from 'react';
import Request from '../lib/request';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
    };
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
          <p>welcome</p>
        </div>
      </div>
    );
  }
}
