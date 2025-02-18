import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { SearchBox, SearchBoxProps } from './SearchBox'; // Adjust this path to where your SearchBox component is located

export default {
  title: 'Components/SearchBox',
  component: SearchBox,
  argTypes: {
    onSearch: { action: 'search performed' },
  },
} as Meta<typeof SearchBox>;

const Template: StoryFn<typeof SearchBox> = (args) => { 
  const [searchResults, setSearchResults] = React.useState<string[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSearch = async (query: string) => {
    setIsLoading(true);
    try {
      // Simulate an API call
      const results = await new Promise<string[]>((resolve) => {
        setTimeout(() => {
          resolve([`Result for ${query} 1`, `Result for ${query} 2`, `Result for ${query} 3`]);
        }, 1000);
      });
      setSearchResults(results);
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const renderResults = (results: string[]) => (
    <ul>
      {results.map((result, index) => (
        <li key={index}>{result}</li>
      ))}
    </ul>
  );

  return (
    <SearchBox 
      {...args} 
      onSearch={handleSearch} 
      isLoading={isLoading} 
      results={searchResults} 
      renderResults={renderResults}
    />
  );
};

export const Basic = Template.bind({});
Basic.args = {
  placeholder: 'Search for something...',
};

export const WithPreloadedResults = Template.bind({});
WithPreloadedResults.args = {
  placeholder: 'Search with preloaded results',
};
WithPreloadedResults.parameters = {
  docs: {
    description: {
      story: 'This story shows the SearchBox component with preloaded search results for demonstration purposes.',
    },
  },
};
// Here, we remove the decorator because 'args' isn't needed within a decorator function for this story