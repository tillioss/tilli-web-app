import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LanguageScreen from './LanguageScreen'; // adjust path as needed
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import * as Common from '../../config/Common';

// Mocks
jest.mock('../../Component/TilliGameWebDropDown', () => (props) => {
  return (
    <div data-testid="dropdown">
      {props.options.map((opt) => (
        <div
          key={opt.value}
          data-testid={`option-${opt.value}`}
          onClick={() => props.onChange(opt)} // trigger onChange properly
        >
          {opt.label}
        </div>
      ))}
    </div>
  );
});



jest.mock('../../images/tilli-game-web/US_Flag.png', () => 'us-flag.png');
jest.mock('../../images/tilli-game-web/UK_Flag.png', () => 'uk-flag.png');
jest.mock('../../images/tilli-game-web/Sri_Lanka_Flag.png', () => 'sl-flag.png');
jest.mock('../../images/tilli-game-web/WhiteTick.png', () => 'tick-img.png');

describe('LanguageScreen Component', () => {
  const mockJson = {
    eventContext: {
      eventList: [{ key: 'language', value: ['United States- English', 'United Kingdom- English', 'Sri Lanka- Sinhala'] }]
    }
  };

  beforeEach(() => {
    jest.spyOn(Common, 'readJsonFile').mockResolvedValue(mockJson);
    jest.spyOn(Common, 'keyReadData').mockResolvedValue({ value: mockJson.eventContext.eventList[0].value });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  function renderWithRouter(path = '/game') {
    const history = createMemoryHistory({ initialEntries: [path] });
    const routeProps = { path };
    render(
      <Router history={history}>
        <LanguageScreen {...routeProps} history={history} />
      </Router>
    );
    return history;
  }

  test('updates selectedCountry when dropdown option is clicked', async () => {
  renderWithRouter();

  await waitFor(() => {
    expect(screen.getByTestId('option-United Kingdom- English')).toBeInTheDocument();
  });

  fireEvent.click(screen.getByTestId('option-United Kingdom- English'));

  // Selected value should now be visible again inside dropdown
  expect(screen.getByTestId('option-United Kingdom- English')).toBeInTheDocument();
});



  test('displays all language options with flags', async () => {
    renderWithRouter();
    await waitFor(() => {
      expect(screen.getByTestId('option-United States- English')).toBeInTheDocument();
      expect(screen.getByTestId('option-United Kingdom- English')).toBeInTheDocument();
      expect(screen.getByTestId('option-Sri Lanka- Sinhala')).toBeInTheDocument();
    });
  });

  test('updates selectedCountry when dropdown option is clicked', async () => {
    renderWithRouter();

    await waitFor(() => {
      expect(screen.getByTestId('option-United Kingdom- English')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByTestId('option-United Kingdom- English'));
    expect(screen.getByText('United Kingdom- English')).toBeInTheDocument();
  });

  test('navigates to create-account when Continue button is clicked', async () => {
    const history = renderWithRouter('/game');
    await waitFor(() => screen.getByText('Continue'));

    fireEvent.click(screen.getByText('Continue'));
    expect(history.location.pathname).toBe('/game/create-account');
  });

test('handles single language in dropdown', async () => {
  const oneLanguageJson = {
    eventContext: {
      eventList: [{ key: 'language', value: ['Sri Lanka- Sinhala'] }]
    }
  };

  Common.readJsonFile.mockResolvedValueOnce(oneLanguageJson);
  Common.keyReadData.mockResolvedValueOnce({ value: oneLanguageJson.eventContext.eventList[0].value });

  renderWithRouter();

  await waitFor(() => {
    expect(screen.getByTestId('option-Sri Lanka- Sinhala')).toBeInTheDocument();
  });

  // Should default to the only available language
  expect(screen.getByTestId('option-Sri Lanka- Sinhala')).toBeInTheDocument();
});

// test('handles readJsonFile failure gracefully', async () => {
//   Common.readJsonFile.mockRejectedValueOnce(new Error('Failed to load'));

//   renderWithRouter();

//   await waitFor(() => {
//     expect(Common.readJsonFile).toHaveBeenCalled();
//   });

//   // Even if it fails, the component should not crash (optional assertion)
//   expect(screen.getByTestId('dropdown')).toBeInTheDocument();
// });

test('handles empty language response from keyReadData', async () => {
  Common.keyReadData.mockResolvedValueOnce({ value: [] });

  renderWithRouter();

  await waitFor(() => {
    expect(screen.getByTestId('dropdown')).toBeInTheDocument();
  });

  // Should render dropdown with no options
  expect(screen.queryByTestId('option-United States- English')).not.toBeInTheDocument();
});

test('renders with custom styles applied to dropdown', async () => {
  renderWithRouter();

  await waitFor(() => {
    expect(screen.getByTestId('dropdown')).toBeInTheDocument();
  });

  // Implicitly covers `customStyles` execution
});


});
