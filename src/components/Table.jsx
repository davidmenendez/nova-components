import React from 'react';
import PropTypes from 'prop-types';

export default class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: '',
      sortAsc: true,
      sortCol: null,
    };
    this.getClassName = this.getClassName.bind(this);
    this.setFilter = this.setFilter.bind(this);
    this.setSort = this.setSort.bind(this);
  }

  getClassName(col) {
    return this.state.sortCol === col ? `sort sort--${this.state.sortAsc ? 'up' : 'down'}` : '';
  }

  setFilter(e) {
    this.setState({ filter: e.target.value });
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

    const {
      data,
      cols,
      title,
    } = this.props;

    const tableData = data.slice().sort((a, b) => (
      sortAsc ? a[sortCol] > b[sortCol] : a[sortCol] < b[sortCol]
    )).filter((o) => {
      const results = cols.map((col) => {
        if (typeof o[col] !== 'number') return o[col].toLowerCase().indexOf(this.state.filter) >= 0;
        return o[col].toString().indexOf(this.state.filter) >= 0;
      });
      return results.includes(true);
    });

    return (
      <div>
        <div className="table-header">
          <p className="table-title">{title}</p>
          <input onChange={this.setFilter} placeholder="filter" type="text" />
        </div>
        {tableData.length ? (
          <table className="dataTable">
            <thead>
              <tr>
                {cols.map(col => (
                  <th className={this.getClassName(col)} onClick={this.setSort}>{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableData.map(d => (
                <tr>
                  {cols.map(c => <td>{d[c]}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>no results</p>
        )}
      </div>
    );
  }
}

Table.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  cols: PropTypes.arrayOf(PropTypes.string).isRequired,
  title: PropTypes.string.isRequired,
};
