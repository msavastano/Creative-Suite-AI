import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import VideoGeneration from './VideoGeneration';

test('renders video generation tool', () => {
  render(
    <MemoryRouter>
      <VideoGeneration />
    </MemoryRouter>
  );

  const headingElement = screen.getByText(/Create with Veo/i);
  expect(headingElement).toBeInTheDocument();

  const generateButton = screen.getByText(/Generate Keyframes/i);
  expect(generateButton).toBeInTheDocument();
});
