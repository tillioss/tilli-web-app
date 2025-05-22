import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import Theme from './Theme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as Common from '../config/Common';

jest.mock('../Screens/Menu/TopMenu', () => () => <div data-testid="top-menu" />);
jest.mock('../Screens/Menu/SideMenu', () => () => <div data-testid="side-menu" />);
jest.mock('../Component/DropDown', () => ({ selectedOption, onChange, options }) => (
  <select
    data-testid="dropdown"
    value={selectedOption.value}
    onChange={(e) => {
      const selected = options.find(opt => opt.value === e.target.value);
      onChange(selected);
    }}
  >
    <option value="Select">Select</option>
    {options.map(opt => (
      <option key={opt.value} value={opt.value}>{opt.label}</option>
    ))}
  </select>
));

jest.mock('../config/MyConstant', () => ({
  keyList: { apiURL: 'http://mockapi/' }
}));

const mockStore = configureStore([thunk]);

describe('Theme Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({});
    jest.clearAllMocks();
  });

  it('renders with loading state and fetches images and themes', async () => {
    const mockResponse = {
      filesMap: {
        img1: { id: 'img1', title: 'Image One', fileName: 'img1.png', fileType: 'image' }
      }
    };
    jest.spyOn(Common, 'doConnect').mockImplementation((key) => {
      if (key === 'getGameFilesList') return Promise.resolve(mockResponse);
      if (key === 'getThemes') return Promise.resolve({ themesMap: {} });
      return Promise.resolve({ response: 'Success' });
    });

    render(<Provider store={store}><Theme /></Provider>);

    await waitFor(() => {
      expect(Common.doConnect).toHaveBeenCalledWith('getGameFilesList', 'POST', expect.any(Object));
    });

    expect(screen.getByText('Theme Name')).toBeInTheDocument();
  });

  it('shows validation errors on empty submission', async () => {
  jest.spyOn(Common, 'doConnect').mockImplementation((key) => {
    if (key === 'getGameFilesList') return Promise.resolve({ filesMap: {} });
    if (key === 'getThemes') return Promise.resolve({ themesMap: {} });
    return Promise.resolve({ response: 'Success' });
  });

  render(<Provider store={store}><Theme /></Provider>);

  await waitFor(() => screen.getByText('Theme Name'));

  fireEvent.click(screen.getByText('Submit'));

  await waitFor(() => {
    expect(screen.getByTestId('theme-validation')).toHaveTextContent('Please Enter Value');
    expect(screen.getByTestId('image-validation')).toHaveTextContent('');
  });
});

  it('submits theme when fields are valid', async () => {
    jest.spyOn(Common, 'doConnect').mockImplementation((key) => {
      if (key === 'getGameFilesList') {
        return Promise.resolve({
          filesMap: {
            img1: { id: 'img1', title: 'Image One', fileName: 'img1.png', fileType: 'image' }
          }
        });
      }
      if (key === 'getThemes') {
        return Promise.resolve({ themesMap: {} });
      }
      if (key === 'addTheme') return Promise.resolve({ response: 'Success' });
      return Promise.resolve({});
    });

    render(<Provider store={store}><Theme /></Provider>);

    await waitFor(() => screen.getByTestId('dropdown'));

    fireEvent.change(screen.getByPlaceholderText('Enter Theme'), {
      target: { value: 'My Theme' }
    });

    fireEvent.change(screen.getByTestId('dropdown'), { target: { value: 'img1' } });

    fireEvent.click(screen.getByText('Submit'));

    await waitFor(() => {
      expect(Common.doConnect).toHaveBeenCalledWith('addTheme', 'POST', expect.objectContaining({
        name: 'My Theme'
      }));
    });
  });

 it('opens modal when image div is clicked', async () => {
  const sharedImage = {
    id: 'img1',
    title: 'Image One',
    fileName: 'img1.png',
    fileType: 'image'
  };

  jest.spyOn(Common, 'doConnect').mockImplementation((key) => {
    if (key === 'getGameFilesList') {
      return Promise.resolve({ filesMap: { img1: sharedImage } });
    }
    if (key === 'getThemes') {
      return Promise.resolve({
        themesMap: {
          theme1: {
            id: 'theme1',
            name: 'Theme 1',
            image: sharedImage
          }
        }
      });
    }
    return Promise.resolve({});
  });

  render(<Provider store={store}><Theme /></Provider>);

  // Wait for image wrapper to appear
  const imageWrapper = await screen.findByTestId('table-image-theme1');

  fireEvent.click(imageWrapper);

  // Modal should now be visible
  const modal = screen.getByTestId('modal');
  expect(modal).toHaveStyle('display: block');

  expect(screen.getByTestId('modal-image')).toHaveAttribute(
  'src',
  expect.stringContaining('img1.png')
);
});

it('loads theme data into form when Edit is clicked', async () => {
  const sharedImage = {
    id: 'img1',
    title: 'Image One',
    fileName: 'img1.png',
    fileType: 'image'
  };

  jest.spyOn(Common, 'doConnect').mockImplementation((key) => {
    if (key === 'getGameFilesList') return Promise.resolve({ filesMap: { img1: sharedImage } });
    if (key === 'getThemes') {
      return Promise.resolve({
        themesMap: {
          theme1: {
            id: 'theme1',
            name: 'Theme 1',
            image: sharedImage
          }
        }
      });
    }
    return Promise.resolve({});
  });

  render(<Provider store={store}><Theme /></Provider>);

  // Wait for Edit button and click it
  const editButton = await screen.findByTestId('table-edit-theme1');
  fireEvent.click(editButton);

  // Confirm form is filled
  expect(screen.getByDisplayValue('Theme 1')).toBeInTheDocument();
  expect(screen.getByText('Update')).toBeInTheDocument();
});

it('submits updated theme when Update is clicked', async () => {
  const sharedImage = {
    id: 'img1',
    title: 'Image One',
    fileName: 'img1.png',
    fileType: 'image'
  };

  jest.spyOn(Common, 'doConnect').mockImplementation((key, method, body) => {
    if (key === 'getGameFilesList') return Promise.resolve({ filesMap: { img1: sharedImage } });
    if (key === 'getThemes') {
      return Promise.resolve({
        themesMap: {
          theme1: {
            id: 'theme1',
            name: 'Old Theme',
            image: sharedImage
          }
        }
      });
    }
    if (key === 'updateTheme') return Promise.resolve({ response: 'Success' });
    return Promise.resolve({});
  });

  render(<Provider store={store}><Theme /></Provider>);

  const editButton = await screen.findByTestId('table-edit-theme1');
  fireEvent.click(editButton);

  fireEvent.change(screen.getByPlaceholderText('Enter Theme'), {
    target: { value: 'Updated Theme' }
  });

  fireEvent.click(screen.getByText('Update'));

  await waitFor(() => {
    expect(Common.doConnect).toHaveBeenCalledWith('updateTheme', 'POST', expect.objectContaining({
      name: 'Updated Theme'
    }));
  });
});

it('calls deleteThemes API when Delete is clicked', async () => {
  const sharedImage = {
    id: 'img1',
    title: 'Image One',
    fileName: 'img1.png',
    fileType: 'image'
  };

  jest.spyOn(Common, 'doConnect').mockImplementation((key) => {
    if (key === 'getGameFilesList') return Promise.resolve({ filesMap: { img1: sharedImage } });
    if (key === 'getThemes') {
      return Promise.resolve({
        themesMap: {
          theme1: {
            id: 'theme1',
            name: 'To Delete',
            image: sharedImage
          }
        }
      });
    }
    if (key === 'deleteThemes') return Promise.resolve({ response: 'Success' });
    return Promise.resolve({});
  });

  render(<Provider store={store}><Theme /></Provider>);

  const deleteButton = await screen.findByTestId('table-delete-theme1');
  fireEvent.click(deleteButton);

  await waitFor(() => {
    expect(Common.doConnect).toHaveBeenCalledWith('deleteThemes', 'POST', expect.objectContaining({
      themeId: 'theme1'
    }));
  });
});

it('resets form when Add new is clicked after editing', async () => {
  const sharedImage = {
    id: 'img1',
    title: 'Image One',
    fileName: 'img1.png',
    fileType: 'image'
  };

  jest.spyOn(Common, 'doConnect').mockImplementation((key) => {
    if (key === 'getGameFilesList') return Promise.resolve({ filesMap: { img1: sharedImage } });
    if (key === 'getThemes') {
      return Promise.resolve({
        themesMap: {
          theme1: {
            id: 'theme1',
            name: 'Theme 1',
            image: sharedImage
          }
        }
      });
    }
    return Promise.resolve({});
  });

  render(<Provider store={store}><Theme /></Provider>);

  const editButton = await screen.findByTestId('table-edit-theme1');
  fireEvent.click(editButton);

  const addNewButton = await screen.findByTestId('add-button');
  fireEvent.click(addNewButton);

  expect(screen.getByText('Submit')).toBeInTheDocument();
  expect(screen.getByPlaceholderText('Enter Theme')).toHaveValue('');
});


});
