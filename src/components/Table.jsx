import React, { useContext, useEffect, useState } from 'react';
import Mycontext from '../contexts/Mycontext';

function Table() {
  const { planets, loading } = useContext(Mycontext);
  const [filteredPlanets, setFilteredPlanets] = useState(planets);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = ({ target }) => {
    setSearchTerm(target.value);
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
