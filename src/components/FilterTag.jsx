import React from 'react';
import PropTypes from 'prop-types';

function FilterTag({ filter, onRemove }) {
  return (
    <div
      style={ {
        display: 'inline-block',
        padding: '5px',
        backgroundColor: '#ccc',
        borderRadius: '5px',
        marginRight: '5px',
        cursor: 'pointer',
        border: 'none',
      } }
      data-testid="filter"
    >
      {`${filter.column} ${filter.comparison} ${filter.value}`}
      <button onClick={ () => onRemove(filter) }>
        <span>&times;</span>
      </button>
    </div>
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
