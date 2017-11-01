import React from 'react';
import PropTypes from 'prop-types';

export default class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data,
      sortAsc: true,
      sortCol: null,
    };
    this.getClassName = this.getClassName.bind(this);
    this.sort = this.sort.bind(this);
  }

  getClassName(col) {
    return this.state.sortCol === col ? `sort sort--${this.state.sortAsc ? 'up' : 'down'}` : '';
  }

  sort(e) {
    const targetCol = e.target.innerText;
    const sortAsc = targetCol !== this.state.sortCol ? true : !this.state.sortAsc;
    const data = this.state.data.slice().sort((a, b) => (
      sortAsc ? a[targetCol] > b[targetCol] : a[targetCol] < b[targetCol]
    ));
    this.setState({
      data,
      sortAsc,
      sortCol: targetCol,
    });
  }

  render() {
    return (
      <table className="dataTable">
        <thead>
          <tr>
            {this.props.cols.map(col => (
              <th className={this.getClassName(col)} onClick={this.sort}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {this.state.data.map(d => (
            <tr>
              {this.props.cols.map(c => <td>{d[c]}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

Table.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  cols: PropTypes.arrayOf(PropTypes.string).isRequired,
};
