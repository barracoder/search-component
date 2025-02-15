import React from 'react';
import { SearchBox } from '@fluentui/react';
import ResultsPopup from './ResultsPopup';

interface SearchComponentProps {
  onSearch: (query: string) => void;
  loading: boolean;
  error: boolean;
  results: any[];
  renderResults?: (results: any[]) => React.ReactNode;
}

const SearchComponent: React.FC<SearchComponentProps> = ({ onSearch, loading, error, results, renderResults }) => {
  const [query, setQuery] = React.useState('');

  const handleSearch = (newValue: string) => {
    setQuery(newValue);
    onSearch(newValue);
  };

  return (
    <div>
      <SearchBox
        placeholder="Search"
        onSearch={handleSearch}
        onChange={(_, newValue) => handleSearch(newValue || '')}
        disabled={loading}
        errorMessage={error ? 'Error occurred' : undefined}
      />
      {renderResults ? renderResults(results) : <ResultsPopup results={results} noResultsMessage="No results found" />}
    </div>
  );
};

export default SearchComponent;
