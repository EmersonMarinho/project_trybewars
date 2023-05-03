import React, { useContext, useEffect, useState } from 'react';
import Mycontext from '../contexts/Mycontext';
import FilterTag from './FilterTag';

function Table() {
  const { planets, loading } = useContext(Mycontext);
  const [filteredPlanets, setFilteredPlanets] = useState(planets);
  const [searchTerm, setSearchTerm] = useState('');
  const [columnFilter, setColumnFilter] = useState('population');
  const [comparisonFilter, setComparisonFilter] = useState('maior que');
  const [valueFilter, setValueFilter] = useState('0');
  const [appliedFilters, setAppliedFilters] = useState([]);

  useEffect(() => {
    const applyFilters = (updatedFilters) => planets
      .filter((planet) => updatedFilters.every((filter) => {
        const planetValue = parseFloat(planet[filter.column]);
        const filterValue = parseFloat(filter.value);

        if (filter.comparison === 'maior que') {
          return planetValue > filterValue;
        } if (filter.comparison === 'menor que') {
          return planetValue < filterValue;
        } if (filter.comparison === 'igual a') {
          return planetValue === filterValue;
        }
        return true;
      }))
      .filter((planet) => {
        if (!searchTerm) {
          return true;
        }
        return planet.name.toLowerCase().includes(searchTerm.toLowerCase());
      });
    setFilteredPlanets(applyFilters(appliedFilters));
  }, [appliedFilters, planets, searchTerm]);

  const handleSearchChange = ({ target }) => {
    setSearchTerm(target.value);
  };

  const handleColumnFilterChange = ({ target }) => {
    setColumnFilter(target.value);
  };

  const handleComparisonFilterChange = ({ target }) => {
    setComparisonFilter(target.value);
  };

  const handleValueFilterChange = ({ target }) => {
    setValueFilter(target.value);
  };

  const addFilter = ({ column, comparison, value }) => {
    if (!column || !comparison || !value) return;

    const newFilter = { column, comparison, value };
    setAppliedFilters([...appliedFilters, newFilter]);
  };

  const handleApplyFilter = () => {
    addFilter({ column: columnFilter, comparison: comparisonFilter, value: valueFilter });
    setColumnFilter('population');
    setComparisonFilter('maior que');
    setValueFilter('0');
  };

  const removeFilter = (filterToRemove) => {
    const updatedFilters = appliedFilters
      .filter((filter) => filter !== filterToRemove);
    setAppliedFilters(updatedFilters);
    setFilteredPlanets(applyFilters(updatedFilters));
  };

  return (
    <div>
      <div>
        {appliedFilters.map((filter, index) => (
          <FilterTag key={ index } filter={ filter } onRemove={ removeFilter } />
        ))}
      </div>
      <select
        data-testid="column-filter"
        value={ columnFilter }
        onChange={ handleColumnFilterChange }
      >
        {!appliedFilters.some((filter) => filter.column === 'population') && (
          <option value="population">population</option>
        )}
        {!appliedFilters.some((filter) => filter.column === 'orbital_period') && (
          <option value="orbital_period">orbital_period</option>
        )}
        {!appliedFilters.some((filter) => filter.column === 'diameter') && (
          <option value="diameter">diameter</option>
        )}
        {!appliedFilters.some((filter) => filter.column === 'rotation_period') && (
          <option value="rotation_period">rotation_period</option>
        )}
        {!appliedFilters.some((filter) => filter.column === 'surface_water') && (
          <option value="surface_water">surface_water</option>
        )}
      </select>

      <select
        data-testid="comparison-filter"
        value={ comparisonFilter }
        onChange={ handleComparisonFilterChange }
      >
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>

      <input
        type="number"
        data-testid="value-filter"
        value={ valueFilter }
        onChange={ handleValueFilterChange }
      />

      <button
        data-testid="button-filter"
        onClick={ handleApplyFilter }
      >
        Apply Filter

      </button>

      <input
        data-testid="name-filter"
        type="text"
        placeholder="Search by planet Name"
        value={ searchTerm }
        onChange={ handleSearchChange }
      />
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          {!loading && filteredPlanets.map((item) => (
            <tr key={ item.name }>
              <td>{item.name}</td>
              <td>{item.rotation_period}</td>
              <td>{item.orbital_period}</td>
              <td>{item.diameter}</td>
              <td>{item.climate}</td>
              <td>{item.gravity}</td>
              <td>{item.terrain}</td>
              <td>{item.surface_water}</td>
              <td>{item.population}</td>
              <td>{item.films.length}</td>
              <td>{item.created}</td>
              <td>{item.edited}</td>
              <td>{item.url}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

  );
}

export default Table;
