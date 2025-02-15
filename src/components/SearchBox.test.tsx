import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SearchBox from './SearchBox';

describe('SearchBox', () => {
  test('displays loading indicator when loading prop is true', () => {
    render(<SearchBox loading={true} error={false} />);
    const loadingIndicator = screen.getByText('Loading...');
    expect(loadingIndicator).toBeInTheDocument();
  });

  test('displays error message when error prop is true', () => {
    render(<SearchBox loading={false} error={true} />);
    const errorMessage = screen.getByText('Error occurred');
    expect(errorMessage).toBeInTheDocument();
  });
});
