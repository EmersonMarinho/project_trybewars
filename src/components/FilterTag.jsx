// FilterTag.js
import React from 'react';
import PropTypes from 'prop-types';

function FilterTag({ filter, onRemove }) {
  return (
    <button
      style={ {
        display: 'inline-block',
        padding: '5px',
        backgroundColor: '#ccc',
        borderRadius: '5px',
        marginRight: '5px',
        cursor: 'pointer',
        border: 'none',
      } }
      onClick={ () => onRemove(filter) }
    >
      {`${filter.column} ${filter.comparison} ${filter.value}`}
      <span>&times;</span>

    </button>
  );
}

FilterTag.propTypes = {
  filter: PropTypes.shape({
    column: PropTypes.string.isRequired,
    comparison: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  }).isRequired,
  onRemove: PropTypes.func.isRequired,
};

export default FilterTag;
