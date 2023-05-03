import { render, screen, userEvent } from '@testing-library/react';
import FilterTag from '../components/FilterTag'


describe('FilterTag', () => {
  it('should render the filter tag with correct text and call onRemove when clicked', () => {
    const filter = {
      column: 'population',
      comparison: 'maior que',
      value: '100000',
    };

    const onRemove = jest.fn();
    render(<FilterTag filter={filter} onRemove={onRemove} />);

    const filterTag = screen.getByTestId('filter');
    expect(filterTag).toHaveTextContent('population maior que 100000');

    fireEvent.click(filterTag);
    expect(onRemove).toHaveBeenCalledTimes(1);
    expect(onRemove).toHaveBeenCalledWith(filter);
  });
});
