import '@testing-library/jest-dom/extend-expect';
import { render, waitFor, screen } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import Detail from '../page/detail';
declare const global: any;

describe('Detail component', () => {
  // Clean up after each test
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders character details correctly', async () => {
    // Mock fetch with a successful response
    global.fetch = jest.fn(
        () =>
          new Promise<Response>((resolve) => {
            resolve({
              json: () =>
                Promise.resolve({
                  id: 1,
                  name: 'Test Character',
                  status: 'Alive',
                  species: 'Human',
                  type: '',
                  gender: 'Male',
                  origin: {
                    name: 'Test Origin',
                    url: 'https://example.com/origin',
                  },
                  location: {
                    name: 'Test Location',
                    url: 'https://example.com/location',
                  },
                  image: 'https://example.com/image.jpg',
                  episode: ['https://example.com/episode/1'],
                  url: 'https://example.com/character/1',
                  created: '2023-09-05T00:00:00.000Z',
                }),
            } as Response);
          })
      );

    // Render the component with the character ID in the URL
    render(
      <MemoryRouter initialEntries={['/detail/1']}>
        <Route path="/detail/:id">
          <Detail />
        </Route>
      </MemoryRouter>
    );

    // Wait for the component to load data
    await waitFor(() => {
      expect(screen.getByText('Test Character')).toBeInTheDocument();
      expect(screen.getByText('Status: Alive')).toBeInTheDocument();
      expect(screen.getByText('Species: Human')).toBeInTheDocument();
      expect(screen.getByText('Gender: Male')).toBeInTheDocument();
      expect(screen.getByText('Origin: Test Origin')).toBeInTheDocument();
      expect(screen.getByText('Location: Test Location')).toBeInTheDocument();
      expect(screen.getByText('Created: 9/5/2023')).toBeInTheDocument();

      // Check if the episode link is present
      const episodeLink = screen.getByText('Episode 1');
      expect(episodeLink).toBeInTheDocument();
      expect(episodeLink).toHaveAttribute(
        'href',
        'https://example.com/episode/1'
      );
    });
  });

  it('handles loading state', async () => {
    // Mock fetch to simulate a loading state
    global.fetch = jest.fn(() => new Promise(() => {}));

    // Render the component
    render(
      <MemoryRouter initialEntries={['/detail/1']}>
        <Route path="/detail/:id">
          <Detail />
        </Route>
      </MemoryRouter>
    );

    // Wait for the loading state
    await waitFor(() => {
      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });
  });

  it('handles error state', async () => {
    // Mock fetch to simulate an error
    global.fetch = jest.fn().mockRejectedValue('Fetch error');

    // Render the component
    render(
      <MemoryRouter initialEntries={['/detail/1']}>
        <Route path="/detail/:id">
          <Detail />
        </Route>
      </MemoryRouter>
    );

    // Wait for the error state
    await waitFor(() => {
      expect(screen.getByText('Fetch error')).toBeInTheDocument();
    });
  });
});
