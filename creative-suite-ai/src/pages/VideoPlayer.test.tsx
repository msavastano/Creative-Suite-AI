import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import VideoPlayer from './VideoPlayer';

test('renders video player', () => {
  render(
    <MemoryRouter>
      <VideoPlayer />
    </MemoryRouter>
  );

  const headingElement = screen.getByText(/Video Preview/i);
  expect(headingElement).toBeInTheDocument();

  const downloadButton = screen.getByText(/Download Video/i);
  expect(downloadButton).toBeInTheDocument();
});
