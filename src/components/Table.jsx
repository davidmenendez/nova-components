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
      filter,
    } = this.state;

    const {
      data,
      cols,
      title,
      filtering,
      sorting,
    } = this.props;

    let tableData = data.slice();
    if (sorting) {
      tableData.sort((a, b) => (
        sortAsc ? a[sortCol] > b[sortCol] : a[sortCol] < b[sortCol]
      ));
    }

    if (filtering) {
      tableData = tableData.filter((row) => {
        const results = cols.map((col) => {
          if (typeof row[col] !== 'number') return row[col].toLowerCase().indexOf(filter) >= 0;
          return row[col].toString().indexOf(filter) >= 0;
        });
        return results.includes(true);
      });
    }

    return (
      <div>
        <div className="table-header">
          <p className="table-title">{title}</p>
          {filtering &&
            <input onChange={this.setFilter} placeholder="filter" type="text" />
          }
        </div>
        {tableData.length ? (
          <table className={sorting ? 'table--sortable' : ''}>
            <thead>
              <tr>
                {cols.map(col => (
                  <th
                    className={this.getClassName(col)}
                    onClick={sorting ? this.setSort : null}
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableData.map(row => (
                <tr>
                  {cols.map(col => <td>{row[col]}</td>)}
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

Table.defaultProps = {
  sorting: true,
  filtering: true,
};

Table.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  cols: PropTypes.arrayOf(PropTypes.string).isRequired,
  title: PropTypes.string.isRequired,
  sorting: PropTypes.bool,
  filtering: PropTypes.bool,
};
