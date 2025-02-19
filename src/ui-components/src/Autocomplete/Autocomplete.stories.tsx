import React, { useState } from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { Option } from '@fluentui/react-components';
import Autocomplete from './Autocomplete';

// Define the meta information for Storybook
export default {
  title: 'Components/Autocomplete',
  component: Autocomplete,
  argTypes: {
    maxHeight: {
      control: 'number',
      description: 'Maximum height of the dropdown in pixels',
      defaultValue: 200,
    },
    debounceTime: {
      control: 'number',
      description: 'Debounce time for API calls in milliseconds',
      defaultValue: 300,
    },
    minInputLength: {
      control: 'number',
      description: 'Minimum characters before triggering fetch',
      defaultValue: 1,
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text for the input',
      defaultValue: 'Search...',
    },
  },
} as Meta<typeof Autocomplete>;

// Company Autocomplete Story
interface Company {
  key: string;
  name: string;
  stockSymbol: string;
  headquarters: string;
}

const CompanyAutocompleteTemplate: StoryFn<
  typeof Autocomplete<Company>
> = (args) => {
  const [options, setOptions] = useState<Company[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchCompanies = async (inputValue: string) => {
    setLoading(true);
    try {
      const response = await new Promise<Company[]>((resolve) =>
        setTimeout(() => {
          resolve([
            {
              key: '1',
              name: `${inputValue} Corp`,
              stockSymbol: 'CORP',
              headquarters: 'New York',
            },
            {
              key: '2',
              name: `${inputValue} Inc`,
              stockSymbol: 'INC',
              headquarters: 'London',
            },
            {
              key: '3',
              name: `${inputValue} Ltd`,
              stockSymbol: 'LTD',
              headquarters: 'Tokyo',
            },
          ]);
        }, 1000)
      );
      setOptions(response);
    } catch (error) {
      console.error('Fetch error:', error);
      setOptions([]);
    } finally {
      setLoading(false);
    }
  };

  const renderCompanyOption = (option: Company) => (
    <Option key={option.key} value={option.key} text={option.name}>
      <div>
        <strong>{option.name}</strong> ({option.stockSymbol})
        <br />
        <small>{option.headquarters}</small>
      </div>
    </Option>
  );

  return (
    <Autocomplete<Company>
      {...args}
      onDataFetch={fetchCompanies}
      options={options}
      loading={loading}
      renderOption={renderCompanyOption}
    />
  );
};

export const CompanyAutocomplete = CompanyAutocompleteTemplate.bind({});
CompanyAutocomplete.args = {
  placeholder: 'Search companies...',
  maxHeight: 300,
};

// User Autocomplete Story
interface User {
  key: string;
  fullName: string;
  email: string;
  isActive: boolean;
}

const UserAutocompleteTemplate: StoryFn<typeof Autocomplete<User>> = (args) => {
  const [options, setOptions] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async (inputValue: string) => {
    setLoading(true);
    try {
      const response = await new Promise<User[]>((resolve) =>
        setTimeout(() => {
          resolve([
            {
              key: 'u1',
              fullName: `${inputValue} Smith`,
              email: `${inputValue.toLowerCase()}.smith@example.com`,
              isActive: true,
            },
            {
              key: 'u2',
              fullName: `${inputValue} Johnson`,
              email: `${inputValue.toLowerCase()}.johnson@example.com`,
              isActive: false,
            },
          ]);
        }, 800)
      );
      setOptions(response);
    } finally {
      setLoading(false);
    }
  };

  const renderUserOption = (option: User) => (
    <Option
      key={option.key}
      value={option.key}
      text={option.fullName}
      disabled={!option.isActive}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span>{option.fullName}</span>
        <small style={{ color: option.isActive ? 'green' : 'red' }}>
          {option.email}
        </small>
      </div>
    </Option>
  );

  return (
    <Autocomplete<User>
      {...args}
      onDataFetch={fetchUsers}
      options={options}
      loading={loading}
      renderOption={renderUserOption}
    />
  );
};

export const UserAutocomplete = UserAutocompleteTemplate.bind({});
UserAutocomplete.args = {
  placeholder: 'Search users...',
  debounceTime: 400,
  maxHeight: 200,
};