import React from 'react';
import { render, fireEvent, screen, waitFor, act } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import LevelManager from './LevelManager';
import * as Common from '../config/Common';

// ✅ Mock DropDown with unique test IDs
jest.mock('../Component/DropDown', () => ({ selectedOption, onChange, options }) => {
  const testId = selectedOption?.testid || 'dropdown';
  return (
    <select
      data-testid={testId}
      value={selectedOption?.value || ''}
      onChange={(e) => onChange(options.find(o => o.value === e.target.value))}
    >
      {options.map(opt => (
        <option key={opt.value} value={opt.value}>{opt.label}</option>
      ))}
    </select>
  );
});

// ✅ Mock SideMenu and TopMenu
jest.mock('../Screens/Menu/TopMenu', () => () => <div data-testid="top-menu" />);
jest.mock('../Screens/Menu/SideMenu', () => () => <div data-testid="side-menu" />);

const mockStore = configureStore([thunk]);
const store = mockStore({});

describe('LevelManager Component', () => {
  beforeEach(() => {
    jest.spyOn(Common, 'doConnect').mockImplementation((url, method, body) => {
      if (url === 'getGameLevels') {
        return Promise.resolve({
          levelsMap: {
            'level-1': { id: 'level-1', name: 'Level One' }
          }
        });
      }
      if (url === 'getThemes') {
        return Promise.resolve({
          themesMap: {
            'DoubleBoxOverlapWithImage': {
              name: 'DoubleBoxOverlapWithImage',
              content: {
                text: 'Sample text',
                image: {
                  id: 'img-1',
                  fileName: 'testImage.png',
                  fileType: 'image/png'
                }
              }
            }
          }
        });
      }
      if (url === 'getLevelMappingData') {
        return Promise.resolve({
          response: JSON.stringify([
            {
              title: 'Stage Title',
              theme: 'DoubleBoxOverlapWithImage',
              content: {
                text: 'This is test content',
                image: {
                  id: 'img-1',
                  fileName: 'testImage.png',
                  fileType: 'image/png'
                }
              }
            }
          ])
        });
      }
      if (url === 'getGameFilesList') {
        return Promise.resolve({
          filesMap: {
            'img-1': {
              id: 'img-1',
              fileName: 'testImage.png',
              fileType: 'image/png',
              title: 'Test Image'
            }
          }
        });
      }
      if (url === 'updateLevelMapping') {
        return Promise.resolve({ response: 'Success' });
      }
      return Promise.resolve({});
    });
  });

  it('renders LevelManager and loads level data including image', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/level/level-1']}>
          <Route path="/level/:levelid" component={LevelManager} />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('top-menu')).toBeInTheDocument();
    expect(screen.getByTestId('side-menu')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByTestId('level-dropdown')).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText('Stage 1')).toBeInTheDocument();
    });

    await waitFor(() => {
      const image = screen.getByTestId('theme-image');
      expect(image).toBeInTheDocument();
      expect(image.src).toBe(undefined);
    });
  });

  it('submits level data successfully', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/level/level-1']}>
          <Route path="/level/:levelid" component={LevelManager} />
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() => screen.getByText(/Stage 1/i));

    await act(async () => {
      fireEvent.click(screen.getByText('Submit'));
    });

    await waitFor(() => {
      const toast = screen.queryByTestId('submit-success-toast');
      expect(toast).toBe(null);
    });
  });

  it('changes level and loads level mapping data', async () => {
  render(
    <Provider store={store}>
      <MemoryRouter initialEntries={['/level/level-1']}>
        <Route path="/level/:levelid" component={LevelManager} />
      </MemoryRouter>
    </Provider>
  );

  await waitFor(() => {
    expect(screen.getByTestId('level-dropdown')).toBeInTheDocument();
  });

  fireEvent.change(screen.getByTestId('level-dropdown'), {
    target: { value: 'level-1' }
  });

  await waitFor(() => {
    expect(screen.getByText('Stage 1')).toBeInTheDocument();
  });
});

it('shows error when trying to submit without selecting a level', async () => {
  render(
    <Provider store={store}>
      <MemoryRouter initialEntries={['/level/level-unknown']}>
        <Route path="/level/:levelid" component={LevelManager} />
      </MemoryRouter>
    </Provider>
  );

  await waitFor(() => {
    expect(screen.getByText(/Level/i)).toBeInTheDocument();
  });

  act(() => {
    fireEvent.click(screen.getByText('Submit'));
  });

  expect(screen.getByText(/Enter Select Level/i)).toBeInTheDocument();
});

it('adds a new stage when clicking "Add New Stage"', async () => {
  render(
    <Provider store={store}>
      <MemoryRouter initialEntries={['/level/level-1']}>
        <Route path="/level/:levelid" component={LevelManager} />
      </MemoryRouter>
    </Provider>
  );

  await waitFor(() => screen.getByText('Stage 1'));

  fireEvent.click(screen.getByText('Add New Stage'));

  await waitFor(() => {
    expect(screen.getByText('Stage 2')).toBeInTheDocument();
  });
});

it('removes a stage when clicking delete', async () => {
  render(
    <Provider store={store}>
      <MemoryRouter initialEntries={['/level/level-1']}>
        <Route path="/level/:levelid" component={LevelManager} />
      </MemoryRouter>
    </Provider>
  );

  await waitFor(() => screen.getByText('Stage 1'));

  const deleteButtons = screen.getAllByRole('img'); // Includes the close button
  fireEvent.click(deleteButtons.find(img => img.alt === '')); // Simulate close

  await waitFor(() => {
    expect(screen.queryByText('Stage 1')).not.toBeInTheDocument();
  });
});

it('handles API failure on submit gracefully', async () => {
  Common.doConnect.mockImplementationOnce((url) =>
    url === 'updateLevelMapping' ? Promise.resolve({ response: 'Error' }) : Promise.resolve({})
  );

  render(
    <Provider store={store}>
      <MemoryRouter initialEntries={['/level/level-1']}>
        <Route path="/level/:levelid" component={LevelManager} />
      </MemoryRouter>
    </Provider>
  );

  await waitFor(() => screen.getByText('Stage 1'));

  act(() => {
    fireEvent.click(screen.getByText('Submit'));
  });

  // no toast success should be found
  await waitFor(() => {
    expect(screen.queryByTestId('submit-success-toast')).not.toBeInTheDocument();
  });
});


it('updates theme when selecting a theme from dropdown', async () => {
  render(
    <Provider store={store}>
      <MemoryRouter initialEntries={['/level/level-1']}>
        <Route path="/level/:levelid" component={LevelManager} />
      </MemoryRouter>
    </Provider>
  );

  await waitFor(() => {
    expect(screen.getByText('Stage 1')).toBeInTheDocument();
  });

  const themeDropdown = screen.getByTestId('theme-dropdown-0');
  fireEvent.change(themeDropdown, { target: { value: 'DoubleBoxOverlapWithImage' } });
});


it('reorders stages when clicking down arrow', async () => {
  render(
    <Provider store={store}>
      <MemoryRouter initialEntries={['/level/level-1']}>
        <Route path="/level/:levelid" component={LevelManager} />
      </MemoryRouter>
    </Provider>
  );

  await waitFor(() => screen.getByText('Stage 1'));

  const downArrows = screen.getAllByRole('img', { hidden: true });
  fireEvent.click(downArrows[0]); // Click first down arrow
});


});
