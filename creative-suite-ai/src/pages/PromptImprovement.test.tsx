import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import PromptImprovement from './PromptImprovement';
import * as aiService from '../services/ai';

// Mock the AI service
jest.mock('../services/ai');
const mockedImprovePrompt = aiService.improvePrompt as jest.Mock;

describe('PromptImprovement', () => {
  it('renders the component', () => {
    render(<PromptImprovement />);
    expect(screen.getByText('Prompt Improvement')).toBeInTheDocument();
  });

  it('allows typing in the prompt text area', () => {
    render(<PromptImprovement />);
    const textarea = screen.getByPlaceholderText('Enter your prompt here...');
    fireEvent.change(textarea, { target: { value: 'a test prompt' } });
    expect(textarea).toHaveValue('a test prompt');
  });

  it('calls the improvePrompt service when the button is clicked', async () => {
    mockedImprovePrompt.mockResolvedValue('an improved prompt');
    render(<PromptImprovement />);
    const textarea = screen.getByPlaceholderText('Enter your prompt here...');
    fireEvent.change(textarea, { target: { value: 'a test prompt' } });
    const button = screen.getByText('Improve Prompt');
    fireEvent.click(button);

    expect(button).toBeDisabled();
    expect(screen.getByText('Improving...')).toBeInTheDocument();

    await waitFor(() => {
      expect(mockedImprovePrompt).toHaveBeenCalledWith('a test prompt', 'video');
    });

    await waitFor(() => {
      expect(screen.getByText('Improved Prompt')).toBeInTheDocument();
      expect(screen.getByDisplayValue('an improved prompt')).toBeInTheDocument();
    });
  });
});
