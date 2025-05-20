import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

// Mocks
jest.mock('react-dom', () => ({
  render: jest.fn(),
}));

jest.mock('./App', () => () => <div data-testid="app">App</div>);
jest.mock('./redux/store', () => ({
  store: {},
  persistor: {},
}));
jest.mock('redux-persist/integration/react', () => ({
  PersistGate: ({ children }) => <div data-testid="persist-gate">{children}</div>,
}));

beforeEach(() => {
  const root = document.createElement('div');
  root.setAttribute('id', 'root');
  document.body.appendChild(root);
});

afterEach(() => {
  const root = document.getElementById('root');
  if (root) document.body.removeChild(root);
  jest.resetModules(); // Clears module cache
  jest.clearAllMocks();
});

it('renders the App with Provider and PersistGate', () => {
  require('./index'); // <- Import AFTER mocks are registered

  expect(ReactDOM.render).toHaveBeenCalledTimes(1);
  const [element, container] = ReactDOM.render.mock.calls[0];

  expect(container).toBe(document.getElementById('root'));
  expect(element.type).toBe(Provider);
  expect(element.props.children.type.name).toBe('PersistGate');
});

it('calls reportWebVitals', () => {
  // Use actual module and spy on default export
  const spy = jest.spyOn(require('./reportWebVitals'), 'default');

  require('./index');

  expect(spy).toHaveBeenCalled(); // ✅ Should now pass
});
