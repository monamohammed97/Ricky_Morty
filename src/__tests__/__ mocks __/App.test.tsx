import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../../route';

describe('App component', () => {
  it('renders Listing component when accessing the root path', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText('Technical Challenge')).toBeInTheDocument();
  });

  it('renders Detail component when accessing the /detail/:id path', () => {
    render(
      <MemoryRouter initialEntries={['/detail/1']}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText('Detail Page')).toBeInTheDocument();
  });
});
