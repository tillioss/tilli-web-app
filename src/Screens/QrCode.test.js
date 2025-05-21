/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import QrCode from './QrCode';

jest.mock('../../src/images/logos.png', () => 'logos.png');

jest.mock('qrcode.react', () => props => (
    <div
        data-testid="qrcode"
        data-value={props.value}
        data-size={props.size}
        data-bgcolor={props.bgColor}
    />
));

const reducer = (state = {}) => state;
const renderWithRedux = component => {
  const store = createStore(reducer);
  return render(<Provider store={store}>{component}</Provider>);
};

describe('QrCode Component', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it('renders correctly on wide screens (>500)', () => {
    global.innerWidth = 800;
    const { container } = renderWithRedux(<QrCode />);

    expect(
        container.querySelector('div.row.mx-0.pt-3.mb-2.mt-5')
    ).toBeInTheDocument();

    const img = screen.getByAltText('');
    expect(img).toHaveAttribute('src', expect.stringContaining('logos.png'));

    const qrcode = screen.getByTestId('qrcode');
    expect(qrcode).toHaveAttribute('data-value', 'https://bit.ly/tilli-play-manage');
    expect(qrcode).toHaveAttribute('data-size', '310');
    expect(qrcode).toHaveAttribute('data-bgcolor', 'rgb(0, 198, 174)');

    expect(
        screen.getByText(/Open QR Code Scanner on your phone/)
    ).toBeInTheDocument();
    expect(
        screen.getByText(/Point your phone to this screen to capture the code/)
    ).toBeInTheDocument();
  });

  it('renders correctly on narrow screens (<=500) and updates on resize', () => {
    global.innerWidth = 400;
    const { container } = renderWithRedux(<QrCode />);

    expect(
        container.querySelector('div.row.mx-0.pt-3.mb-2.mt-3')
    ).toBeInTheDocument();

    act(() => {
      global.innerWidth = 600;
      global.dispatchEvent(new Event('resize'));
    });

    expect(
        container.querySelector('div.row.mx-0.pt-3.mb-2.mt-5')
    ).toBeInTheDocument();
  });
});
