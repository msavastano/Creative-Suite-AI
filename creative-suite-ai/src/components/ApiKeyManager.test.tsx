import React from 'react';
import { render, screen } from '@testing-library/react';
import ApiKeyManager from './ApiKeyManager';

test('renders API key prompt when no key is present', () => {
  localStorage.removeItem('apiKey');
  render(<ApiKeyManager><div>Protected Content</div></ApiKeyManager>);

  const headingElement = screen.getByText(/API Key Required/i);
  expect(headingElement).toBeInTheDocument();
});

test('renders children when API key is present', () => {
    localStorage.setItem('apiKey', 'test-key');
    render(<ApiKeyManager><div>Protected Content</div></ApiKeyManager>);

    const contentElement = screen.getByText(/Protected Content/i);
    expect(contentElement).toBeInTheDocument();
});
