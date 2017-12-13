import React from 'react';
import PropTypes from 'prop-types';

export default class Input extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const {
      className,
      placeholder,
      type,
      onChange,
      min,
      max,
    } = this.props;

    return (
      <input
        className={className}
        placeholder={placeholder}
        type={type}
        onChange={onChange}
        min={min}
        max={max}
      />
    );
  }
}

Input.defaultProps = {
  className: null,
  placeholder: null,
  min: null,
  max: null,
};

Input.propTypes = {
  className: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  min: PropTypes.number,
  max: PropTypes.number,
};
