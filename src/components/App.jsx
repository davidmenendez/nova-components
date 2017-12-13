import React from 'react';
import Request from '../lib/request';
import Table from './Table';
import Input from './Input';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      textInput: '',
      numInput: 0,
    };
    this.setText = this.setText.bind(this);
    this.setNum = this.setNum.bind(this);
  }

  componentDidMount() {
    this.doRequest();
  }

  setNum(e) {
    this.setState({ numInput: e.target.value });
  }

  setText(e) {
    this.setState({ textInput: e.target.value });
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
          <h2>table</h2>
          {this.state.data.length ? (
            <Table
              data={this.state.data}
              cols={['id', 'name', 'username', 'email']}
              title="users"
            />
          ) : (
            <div className="loader" />
          )}
        </div>
        <div className="module">
          <h2>input</h2>
          <p>
            output = {this.state.textInput}
            <Input
              placeholder="username"
              type="text"
              onChange={this.setText}
            />
          </p>
          <p>
            output = {this.state.numInput}
            <Input
              placeholder="number"
              type="number"
              onChange={this.setNum}
              min={0}
              max={40}
            />
          </p>
        </div>
      </div>
    );
  }
}
