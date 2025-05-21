import React from 'react';
import { render, fireEvent, waitFor, screen, within } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Level from '../Screens/Level';
import * as Common from '../config/Common';

jest.mock('../Component/DropDown', () => ({ selectedOption, onChange, options }) => (
  <select
    data-testid="dropdown"
    value={selectedOption.value}
    onChange={(e) => {
      const selected = options.find(opt => opt.value === e.target.value);
      onChange(selected || { value: 'img1', label: 'Image 1', json: { fileName: 'image1.png', fileType: 'image/png' } });
    }}
  >
    {options.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
  </select>
));



jest.mock('../Screens/Menu/TopMenu', () => () => <div data-testid="top-menu" />);
jest.mock('../Screens/Menu/SideMenu', () => () => <div data-testid="side-menu" />);
jest.mock('../Component/DataTable', () => ({ data, columns }) => (
  <div data-testid="data-table">
    {data.map((row, rowIndex) => (
      <div key={row.id || rowIndex} data-testid={`row-${row.id}`}>
        {columns.map((col, colIndex) => (
          <div key={colIndex}>
            {col.cell ? col.cell(row, rowIndex) : row[col.selector]}
          </div>
        ))}
      </div>
    ))}
  </div>
));

jest.mock('../config/Common', () => ({
  doConnect: jest.fn()
}));

const mockStore = configureStore([thunk]);

describe('Level Component', () => {
  let store;
  const mockLevel = {
    id: "1",
    name: "Level 1",
    color: "#123456",
    sortOrder: 1,
    image: { id: "img1", title: "Image 1", fileName: "img1.png", fileType: "image/png" }
  };

  beforeEach(() => {
    store = mockStore({});
    Common.doConnect.mockImplementation((key) => {
      if (key === 'getGameLevels') {
        return Promise.resolve({ levelsMap: { '1': mockLevel } });
      }
      if (key === 'getGameFilesList') {
  return Promise.resolve({
    filesMap: {
      img1: {
        id: 'img1',
        title: 'Image 1',
        fileName: 'image1.png',
        fileType: 'image/png'
      }
    }
  });
}

      if (['addGameLevel', 'updateGameLevel', 'deleteGameLevels'].includes(key)) {
        return Promise.resolve({ response: 'Success' });
      }
      return Promise.resolve({});
    });
  });

  it('renders and loads data', async () => {
    render(<Provider store={store}><Level history={{ push: jest.fn() }} /></Provider>);
    await waitFor(() => expect(screen.getByTestId('data-table')).toBeInTheDocument());
  });

  it('handles edit + update flow', async () => {
    render(<Provider store={store}><Level history={{ push: jest.fn() }} /></Provider>);
    const editBtn = await screen.findByTestId('edit-1');
    fireEvent.click(editBtn);

    fireEvent.change(screen.getByPlaceholderText('Enter Level Name'), { target: { value: 'Updated Name' } });
    fireEvent.change(screen.getByPlaceholderText('Enter Color'), { target: { value: '#000000' } });
    fireEvent.change(screen.getByPlaceholderText('Enter Sort Order'), { target: { value: '3' } });

    fireEvent.change(screen.getByTestId('dropdown'), { target: { value: 'img1' } });
    const updateBtn = await screen.findByText('Update');
    fireEvent.click(updateBtn);

    await waitFor(() =>
      expect(Common.doConnect).toHaveBeenCalledWith("updateGameLevel", "POST", expect.any(Object))
    );
  });

  it('handles create flow via Submit', async () => {
  render(<Provider store={store}><Level history={{ push: jest.fn() }} /></Provider>);

  fireEvent.change(screen.getByPlaceholderText('Enter Level Name'), { target: { value: 'New Level' } });
  fireEvent.change(screen.getByPlaceholderText('Enter Color'), { target: { value: '#ffcc00' } });
  fireEvent.change(screen.getByPlaceholderText('Enter Sort Order'), { target: { value: '4' } });

  // Simulate image selection
  fireEvent.change(screen.getByTestId('dropdown'), { target: { value: 'img1' } });

  fireEvent.click(screen.getByText('Submit'));

  await waitFor(() =>
    expect(Common.doConnect).toHaveBeenCalledWith("addGameLevel", "POST", expect.objectContaining({
      name: "New Level",
      color: "#ffcc00",
      sortOrder: 4,
      image: expect.objectContaining({
        fileName: "image1.png",
        fileType: "image/png"
      })
    }))
  );
});


  it('handles delete flow', async () => {
    render(<Provider store={store}><Level history={{ push: jest.fn() }} /></Provider>);
    const deleteBtn = await screen.findByText('Delete');
    fireEvent.click(deleteBtn);

    await waitFor(() =>
      expect(Common.doConnect).toHaveBeenCalledWith("deleteGameLevels", "POST", expect.any(Object))
    );
  });

  it('shows first validation error only (current logic)', async () => {
  render(<Provider store={store}><Level history={{ push: jest.fn() }} /></Provider>);

  fireEvent.click(screen.getByText('Submit'));

  expect(await screen.findByText('Please Enter Value')).toBeInTheDocument(); // Only this will appear
});

it('resets form when "Add new" is clicked after editing', async () => {
  render(<Provider store={store}><Level history={{ push: jest.fn() }} /></Provider>);

  const editBtn = await screen.findByTestId('edit-1');
  fireEvent.click(editBtn);

  expect(await screen.findByDisplayValue('Level 1')).toBeInTheDocument(); // Name prefilled

  const addNewBtn = await screen.findByText('Add new');
  fireEvent.click(addNewBtn);

  expect(screen.getByPlaceholderText('Enter Level Name')).toHaveValue('');
  expect(screen.getByPlaceholderText('Enter Color')).toHaveValue('');
  expect(screen.getByPlaceholderText('Enter Sort Order')).toHaveValue('');
});

it('shows validation error for invalid color format', async () => {
  render(<Provider store={store}><Level history={{ push: jest.fn() }} /></Provider>);

  fireEvent.change(screen.getByPlaceholderText('Enter Level Name'), { target: { value: 'Test' } });
  fireEvent.change(screen.getByPlaceholderText('Enter Color'), { target: { value: '123' } }); // Invalid format
  fireEvent.change(screen.getByPlaceholderText('Enter Sort Order'), { target: { value: '5' } });
  fireEvent.change(screen.getByTestId('dropdown'), { target: { value: 'img1' } });

  fireEvent.click(screen.getByText('Submit'));

  expect(await screen.findByText(/Please Enter six digit color cod with #/i)).toBeInTheDocument();
});

it('prevents update when color is missing', async () => {
  render(<Provider store={store}><Level history={{ push: jest.fn() }} /></Provider>);

  const editBtn = await screen.findByTestId('edit-1');
  fireEvent.click(editBtn);

  fireEvent.change(screen.getByPlaceholderText('Enter Color'), { target: { value: '' } });

  const updateBtn = await screen.findByText('Update');
  fireEvent.click(updateBtn);

  expect(await screen.findByText('Please Enter value')).toBeInTheDocument();
});

it('shows image preview when image is selected', async () => {
  render(<Provider store={store}><Level history={{ push: jest.fn() }} /></Provider>);

  fireEvent.change(screen.getByTestId('dropdown'), { target: { value: 'img1' } });

  const img = await screen.findByRole('img');
  expect(img).toHaveAttribute('src');
});

it('renders Manage, Edit, and Delete buttons in data table', async () => {
  render(<Provider store={store}><Level history={{ push: jest.fn() }} /></Provider>);

  const row = await screen.findByTestId('row-1');
  expect(within(row).getByText('Manage')).toBeInTheDocument();
  expect(within(row).getByText('Edit')).toBeInTheDocument();
  expect(within(row).getByText('Delete')).toBeInTheDocument();
});
});
