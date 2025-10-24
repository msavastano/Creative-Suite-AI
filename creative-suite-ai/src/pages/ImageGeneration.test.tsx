import React from 'react';
import { render, screen } from '@testing-library/react';
import ImageGeneration from './ImageGeneration';

test('renders image generation tool', () => {
  render(<ImageGeneration />);

  const headingElement = screen.getByText(/Image Generation/i);
  expect(headingElement).toBeInTheDocument();

  const generateButton = screen.getByText(/Generate/i);
  expect(generateButton).toBeInTheDocument();
});
