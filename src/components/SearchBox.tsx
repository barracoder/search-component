import React from 'react';
import { SearchBox as FluentSearchBox } from '@fluentui/react';

interface SearchBoxProps {
  loading: boolean;
  error: boolean;
}

const SearchBox: React.FC<SearchBoxProps> = ({ loading, error }) => {
  return (
    <div>
      <FluentSearchBox
        placeholder="Search"
        disabled={loading}
        errorMessage={error ? 'Error occurred' : undefined}
      />
      {loading && <div>Loading...</div>}
      {error && <div>Error occurred</div>}
    </div>
  );
};

export default SearchBox;
