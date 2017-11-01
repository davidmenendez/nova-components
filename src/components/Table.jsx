import React from 'react';
import PropTypes from 'prop-types';

const Table = ({ data, cols }) => (
  <table>
    <thead>
      <tr>
        {cols.map(col => <th>{col}</th>)}
      </tr>
    </thead>
    <tbody>
      {data.map(d => (
        <tr>
          {cols.map(c => <td>{d[c]}</td>)}
        </tr>
      ))}
    </tbody>
  </table>
);

Table.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  cols: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Table;
