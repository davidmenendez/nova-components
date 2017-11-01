import React from 'react';
import Request from '../lib/request';

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
    const content = this.state.data.map(obj => (
      <div key={obj.id}>
        <p>{obj.name}</p>
      </div>
    ));

    return (
      <div>
        <div className="module">
          <h3>ajax</h3>
          {this.state.data.length ? content : (
            <div className="loader" />
          )}
        </div>
      </div>
    );
  }
}
