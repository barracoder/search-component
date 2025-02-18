import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import { SearchBox, SearchBoxResult } from "./SearchBox"; // Adjust this path to where your SearchBox component is located
import { CardHeader, Body1, Caption1 } from "@fluentui/react-components";

export default {
  title: "Components/SearchBox",
  component: SearchBox,
  argTypes: {
    onSearch: { action: "search performed" },
  },
} as Meta<typeof SearchBox>;

export interface Company {
  name: string;
  assetCode: string;
}

const companies: Company[] = [
  { name: "Microsoft", assetCode: "MSFT" },
  { name: "Apple", assetCode: "AAPL" },
  { name: "Amazon Product Service (Europe) plc", assetCode: "AMZN" },
  { name: "Google", assetCode: "GOOGL" },
  { name: "Facebook", assetCode: "FB" },
  { name: "Twitter", assetCode: "TWTR" },
  { name: "Netflix", assetCode: "NFLX" },
  { name: "Tesla", assetCode: "TSLA" },
  { name: "Alphabet", assetCode: "GOOG" },
  { name: "Shopify", assetCode: "SHOP" },
  { name: "PayPal", assetCode: "PYPL" },
  { name: "Zoom Video Communications", assetCode: "ZM" },
  { name: "Spotify", assetCode: "SPOT" },
  { name: "Snap", assetCode: "SNAP" },
  { name: "Pinterest", assetCode: "PINS" },
  { name: "Microsoft", assetCode: "MSFT" },
  { name: "Apple", assetCode: "AAPL" },
  { name: "Amazon Product Service (Europe) plc", assetCode: "AMZN" },
  { name: "Google", assetCode: "GOOGL" },
  { name: "Facebook", assetCode: "FB" },
  { name: "Twitter", assetCode: "TWTR" },
  { name: "Netflix", assetCode: "NFLX" },
  { name: "Tesla", assetCode: "TSLA" },
  { name: "Alphabet", assetCode: "GOOG" },
  { name: "Shopify", assetCode: "SHOP" },
  { name: "PayPal", assetCode: "PYPL" },
  { name: "Zoom Video Communications", assetCode: "ZM" },
  { name: "Spotify", assetCode: "SPOT" },
  { name: "Snap", assetCode: "SNAP" },
  { name: "Pinterest", assetCode: "PINS" },
  { name: "Microsoft", assetCode: "MSFT" },
  { name: "Apple", assetCode: "AAPL" },
  { name: "Amazon Product Service (Europe) plc", assetCode: "AMZN" },
  { name: "Google", assetCode: "GOOGL" },
  { name: "Facebook", assetCode: "FB" },
  { name: "Twitter", assetCode: "TWTR" }
];

const Template: StoryFn<typeof SearchBox> = (args) => {
  const [searchResults, setSearchResults] = React.useState<
    SearchBoxResult<Company>[]
  >([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [selectedCompany, setSelectedCompany] = React.useState<Company | null>(
    null
  );

  const handleSearch = async (query: string, onComplete: () => void) => {
    setIsLoading(true);
    try {
      // Simulate an API call
      const results = await new Promise<SearchBoxResult<Company>[]>(
        (resolve) => {
          setTimeout(() => {
            resolve(
              companies.map((company) => ({
                value: company,
                displayText: company.name,
              }))
            );
          }, 2000);
        }
      );
      setSearchResults(results);
    } catch (error) {
      console.error("Search error:", error);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
      onComplete();
    }
  };

  function handleSelectedItem(item: Company): void {
    setSelectedCompany(item);
  }

  return (
    <>
      <SearchBox
        {...args}
        onSearch={handleSearch}
        onSelectItem={handleSelectedItem}
        results={searchResults}
      />
      {selectedCompany && (
          <CardHeader
            header={<Body1>{selectedCompany.assetCode}</Body1>}
            description={<Caption1>{selectedCompany.name}</Caption1>}
          />
      )}
    </>
  );
};

export const Basic = Template.bind({});
Basic.args = {
  placeholder: "Search for something...",
};

export const WithPreloadedResults = Template.bind({});
WithPreloadedResults.args = {
  placeholder: "Search with preloaded results",
};
WithPreloadedResults.parameters = {
  docs: {
    description: {
      story:
        "This story shows the SearchBox component with preloaded search results for demonstration purposes.",
    },
  },
};
