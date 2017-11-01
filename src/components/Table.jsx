import React from 'react';
import PropTypes from 'prop-types';

export default class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sortAsc: true,
      sortCol: null,
    };
    this.getClassName = this.getClassName.bind(this);
    this.setSort = this.setSort.bind(this);
  }

  getClassName(col) {
    return this.state.sortCol === col ? `sort sort--${this.state.sortAsc ? 'up' : 'down'}` : '';
  }

  setSort(e) {
    const targetCol = e.target.innerText;
    const sortAsc = targetCol !== this.state.sortCol ? true : !this.state.sortAsc;
    this.setState({
      sortAsc,
      sortCol: targetCol,
    });
  }

  render() {
    const {
      sortAsc,
      sortCol,
    } = this.state;

    const tableData = this.props.data.slice().sort((a, b) => (
      sortAsc ? a[sortCol] > b[sortCol] : a[sortCol] < b[sortCol]
    ));

    return (
      <table className="dataTable">
        <thead>
          <tr>
            {this.props.cols.map(col => (
              <th className={this.getClassName(col)} onClick={this.setSort}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData.map(d => (
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
