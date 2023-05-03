import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MyContext from '../contexts/Mycontext';
import Table from '../components/Table';


const mockPlanets = [
  {
    name: 'Tatooine',
    rotation_period: '23',
    orbital_period: '304',
    diameter: '10465',
    climate: 'arid',
    gravity: '1 standard',
    terrain: 'desert',
    surface_water: '1',
    population: '200000',
    films: [],
    created: '2014-12-09T13:50:49.641000Z',
    edited: '2014-12-20T20:58:18.411000Z',
    url: 'https://swapi.dev/api/planets/1/',
  },
  {
    name: 'Alderaan',
    rotation_period: '24',
    orbital_period: '364',
    diameter: '12500',
    climate: 'temperate',
    gravity: '1 standard',
    terrain: 'grasslands, mountains',
    surface_water: '40',
    population: '2000000000',
    films: [],
    created: '2014-12-10T11:35:48.479000Z',
    edited: '2014-12-20T20:58:18.420000Z',
    url: 'https://swapi.dev/api/planets/2/',
  },
];

const renderWithContext = (component) => {
  return render(
    <MyContext.Provider value={{ planets: mockPlanets, loading: false }}>
      {component}
    </MyContext.Provider>
  );
};

describe('Table', () => {
  it('should render table with planet data', () => {
    renderWithContext(<Table />);

    const firstPlanetName = screen.getByText('Tatooine');
    expect(firstPlanetName).toBeInTheDocument();

    const secondPlanetName = screen.getByText('Alderaan');
    expect(secondPlanetName).toBeInTheDocument();
  });

  it('should filter planets by name', () => {
    renderWithContext(<Table />);

    const searchInput = screen.getByTestId('name-filter');
    userEvent.type(searchInput, 'Tatooine');

    const firstPlanetName = screen.getByText('Tatooine');
    expect(firstPlanetName).toBeInTheDocument();

    const secondPlanetName = screen.queryByText('Alderaan');
    expect(secondPlanetName).not.toBeInTheDocument();
  });

  it('should apply and remove filters', () => {
    renderWithContext(<Table />);

    const columnFilter = screen.getByTestId('column-filter');
    const comparisonFilter = screen.getByTestId('comparison-filter');
    const valueFilter = screen.getByTestId('value-filter');
    const applyFilterButton = screen.getByTestId('button-filter');

    userEvent.selectOptions(columnFilter, 'population');
    userEvent.selectOptions(comparisonFilter, 'maior que');
    userEvent.type(valueFilter, '1000000');
    userEvent.click(applyFilterButton);

    const firstPlanetName = screen.queryByText('Tatooine');
    expect(firstPlanetName).not.toBeInTheDocument();

    const secondPlanetName = screen.getByText('Alderaan');
    expect(secondPlanetName).toBeInTheDocument();

    const filterTag = screen.getByTestId('filter');
    userEvent.click(filterTag);

    const firstPlanetNameAfterRemove = screen.getByText('Tatooine');
    expect(firstPlanetNameAfterRemove).toBeInTheDocument();

    const secondPlanetNameAfterRemove = screen.getByText('Alderaan');
    expect(secondPlanetNameAfterRemove).toBeInTheDocument();
  });
});
   