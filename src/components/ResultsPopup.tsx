import React from 'react';

interface ResultsPopupProps {
  results: any[];
  noResultsMessage: string;
}

const ResultsPopup: React.FC<ResultsPopupProps> = ({ results, noResultsMessage }) => {
  return (
    <div>
      {results.length > 0 ? (
        <ul>
          {results.map((result, index) => (
            <li key={index}>{result}</li>
          ))}
        </ul>
      ) : (
        <div>{noResultsMessage}</div>
      )}
    </div>
  );
};

export default ResultsPopup;
