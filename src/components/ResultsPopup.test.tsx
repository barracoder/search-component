import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ResultsPopup from './ResultsPopup';

describe('ResultsPopup', () => {
  test('renders search results', () => {
    const results = ['result1', 'result2'];
    render(<ResultsPopup results={results} noResultsMessage="No results found" />);
    const result1 = screen.getByText('result1');
    const result2 = screen.getByText('result2');
    expect(result1).toBeInTheDocument();
    expect(result2).toBeInTheDocument();
  });

  test('displays custom message when no results are found', () => {
    render(<ResultsPopup results={[]} noResultsMessage="No results found" />);
    const noResultsMessage = screen.getByText('No results found');
    expect(noResultsMessage).toBeInTheDocument();
  });
});
