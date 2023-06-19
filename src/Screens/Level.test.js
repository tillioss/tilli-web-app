import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Level from './Level';

test('renders Level component', () => {
  render(
      <Router>
        <Level />
      </Router>
  );
});
