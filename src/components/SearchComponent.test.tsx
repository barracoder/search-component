import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SearchComponent from './SearchComponent';

describe('SearchComponent', () => {
  const mockOnSearch = jest.fn();

  beforeEach(() => {
    mockOnSearch.mockClear();
  });

  test('calls onSearch prop when search is performed', () => {
    render(<SearchComponent onSearch={mockOnSearch} loading={false} error={false} results={[]} />);
    const searchBox = screen.getByRole('searchbox');
    fireEvent.change(searchBox, { target: { value: 'test' } });
    fireEvent.keyDown(searchBox, { key: 'Enter', code: 'Enter' });
    expect(mockOnSearch).toHaveBeenCalledWith('test');
  });

  test('displays loading indicator when loading prop is true', () => {
    render(<SearchComponent onSearch={mockOnSearch} loading={true} error={false} results={[]} />);
    const searchBox = screen.getByRole('searchbox');
    expect(searchBox).toBeDisabled();
  });

  test('displays error message when error prop is true', () => {
    render(<SearchComponent onSearch={mockOnSearch} loading={false} error={true} results={[]} />);
    const errorMessage = screen.getByText('Error occurred');
    expect(errorMessage).toBeInTheDocument();
  });

  test('renders search results', () => {
    const results = ['result1', 'result2'];
    render(<SearchComponent onSearch={mockOnSearch} loading={false} error={false} results={results} />);
    const result1 = screen.getByText('result1');
    const result2 = screen.getByText('result2');
    expect(result1).toBeInTheDocument();
    expect(result2).toBeInTheDocument();
  });

  test('displays custom message when no results are found', () => {
    render(<SearchComponent onSearch={mockOnSearch} loading={false} error={false} results={[]} />);
    const noResultsMessage = screen.getByText('No results found');
    expect(noResultsMessage).toBeInTheDocument();
  });

  test('renders custom results when renderResults prop is provided', () => {
    const customRenderResults = (results: any[]) => (
      <div>
        {results.map((result, index) => (
          <div key={index} data-testid="custom-result">
            {result}
          </div>
        ))}
      </div>
    );

    const results = ['customResult1', 'customResult2'];
    render(
      <SearchComponent
        onSearch={mockOnSearch}
        loading={false}
        error={false}
        results={results}
        renderResults={customRenderResults}
      />
    );

    const customResult1 = screen.getByTestId('custom-result');
    const customResult2 = screen.getByTestId('custom-result');
    expect(customResult1).toBeInTheDocument();
    expect(customResult2).toBeInTheDocument();
  });
});
