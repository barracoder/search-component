import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { SearchBox, SearchBoxProps, SearchBoxResult } from './SearchBox'; // Adjust this path to where your SearchBox component is located

export default {
  title: 'Components/SearchBox',
  component: SearchBox,
  argTypes: {
    onSearch: { action: 'search performed' },
  },
} as Meta<typeof SearchBox>;

export interface Company{
  name: string;
  assetCode: string;
}

const companies: Company[] = [
  { name: 'Microsoft', assetCode: 'MSFT' },
  { name: 'Apple', assetCode: 'AAPL' },
  { name: 'Amazon', assetCode: 'AMZN' },
  { name: 'Google', assetCode: 'GOOGL' },
  { name: 'Facebook', assetCode: 'FB' },
];

const Template: StoryFn<typeof SearchBox> = (args) => { 
  const [searchResults, setSearchResults] = React.useState<SearchBoxResult<Company>[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSearch = async (query: string, onComplete: () => void) => {
    setIsLoading(true);
    try {
      // Simulate an API call
      const results = await new Promise<SearchBoxResult<Company>[]>((resolve) => {
        setTimeout(() => {
          resolve(companies
            .map((company) => ({
              value: company,
              displayText: company.name,
            })));
        }, 1000);
      });
      setSearchResults(results);
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
      onComplete();
    }
  };

  return (
    <SearchBox 
      {...args} 
      onSearch={handleSearch} 
      onSelectItem={(item) => console.log('Selected item:', item)}
      isLoading={isLoading} 
      results={searchResults} 
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