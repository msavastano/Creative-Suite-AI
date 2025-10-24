import React from 'react';
import { render, screen } from '@testing-library/react';
import ImageEditing from './ImageEditing';

test('renders image editing tool', () => {
  render(<ImageEditing />);

  const headingElement = screen.getByText(/Image Editing/i);
  expect(headingElement).toBeInTheDocument();

  const generateButton = screen.getByText(/Generate/i);
  expect(generateButton).toBeInTheDocument();
});
