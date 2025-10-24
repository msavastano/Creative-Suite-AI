import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders dashboard on default route', () => {
  render(<App />);
  const headingElement = screen.getByText(/Creative Suite AI/i);
  expect(headingElement).toBeInTheDocument();
});
