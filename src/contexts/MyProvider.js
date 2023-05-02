import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import MyContext from './Mycontext';

function Provider({ children }) {
  const [loading, setLoading] = useState(true);
  const [planets, setPlantes] = useState([]);

  useEffect(() => {
    fetch('https://swapi.dev/api/planets')
      .then((response) => response.json())
      .then((data) => {
        const planetsWithoutResidents = data.results.map((planet) => {
          const { residents, ...rest } = planet;
          return rest;
        });
        setPlantes(planetsWithoutResidents);
      });
    setLoading(false);
  }, []);

  const VALUE = { loading, planets };

  return (
    <MyContext.Provider value={ VALUE }>
      { children }
    </MyContext.Provider>
  );
}

export default Provider;

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};
