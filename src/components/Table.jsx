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

    const filterFunction = (planet) => {
      const planetValue = parseFloat(planet[column]);
      const filterValue = parseFloat(value);

      if (comparison === 'maior que') {
        return planetValue > filterValue;
      } if (comparison === 'menor que') {
        return planetValue < filterValue;
      } if (comparison === 'igual a') {
        return planetValue === filterValue;
      }
      return true;
    };

    const filtered = planets.filter(filterFunction);
    setFilteredPlanets(filtered);

    const newFilter = { column, comparison, value };
    setAppliedFilters([...appliedFilters, newFilter]);
  };

  const handleApplyFilter = () => {
    addFilter({ column: columnFilter, comparison: comparisonFilter, value: valueFilter });
    setColumnFilter('');
    setComparisonFilter('');
    setValueFilter('');
  };

  const removeFilter = (filterToRemove) => {
    const updatedFilters = appliedFilters.filter((filter) => filter !== filterToRemove);
    setAppliedFilters(updatedFilters);
    const filtered = planets.filter((planet) => updatedFilters.every((filter) => {
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
    }));

    setFilteredPlanets(filtered);
  };

  useEffect(() => {
    if (searchTerm) {
      const filtered = planets.filter((planet) => planet.name
        .toLowerCase().includes(searchTerm.toLowerCase()));
      setFilteredPlanets(filtered);
    } else {
      setFilteredPlanets(planets);
    }
  }, [planets, searchTerm]);

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
        <option value="population">population</option>
        <option value="orbital_period">orbital_period</option>
        <option value="diameter">diameter</option>
        <option value="rotation_period">rotation_period</option>
        <option value="surface_water">surface_water</option>
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
