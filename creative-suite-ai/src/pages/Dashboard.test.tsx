import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Dashboard from './Dashboard';

test('renders dashboard with links to tools', () => {
  render(
    <MemoryRouter>
      <Dashboard />
    </MemoryRouter>
  );

  const headingElement = screen.getByText(/Creative Suite AI/i);
  expect(headingElement).toBeInTheDocument();

  const imageGenerationLink = screen.getByText(/Image Generation/i);
  expect(imageGenerationLink).toBeInTheDocument();

  const imageEditingLink = screen.getByText(/Image Editing/i);
  expect(imageEditingLink).toBeInTheDocument();

  const videoGenerationLink = screen.getByText(/Video Generation/i);
  expect(videoGenerationLink).toBeInTheDocument();
});
