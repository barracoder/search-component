import React, { useState, useCallback, useMemo } from 'react';
import {
  Combobox,
  Spinner,
  makeStyles,
  ComboboxProps,
} from '@fluentui/react-components';

// Styles for the component
const useStyles = makeStyles({
  root: {
    position: 'relative',
    width: '300px',
  },
  spinner: {
    position: 'absolute',
    right: '8px',
    top: '50%',
    transform: 'translateY(-50%)',
  },
  listbox: {
    overflow: 'auto',
  },
});

// Type definitions
export interface AutocompleteOption {
  key: string;
  [key: string]: any;
}

export interface AutocompleteProps<T extends AutocompleteOption>
  extends Partial<Omit<ComboboxProps, 'onChange' | 'options'>> {
  onDataFetch: (inputValue: string) => void;
  options: T[];
  loading: boolean;
  renderOption: (option: T) => React.ReactNode;
  debounceTime?: number;
  placeholder?: string;
  minInputLength?: number;
  maxHeight?: string | number;
}

// Debounce utility function
const debounce = <F extends (...args: any[]) => any>(
  func: F,
  wait: number
): ((...args: Parameters<F>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<F>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

const Autocomplete = <T extends AutocompleteOption>({
  onDataFetch,
  options,
  loading,
  renderOption,
  debounceTime = 300,
  placeholder = 'Search...',
  minInputLength = 1,
  maxHeight = '200px',
  ...comboboxProps
}: AutocompleteProps<T>) => {
  const [inputValue, setInputValue] = useState('');
  const classes = useStyles();

  const debouncedFetch = useMemo(
    () => debounce((value: string) => {
      if (value.length >= minInputLength) {
        onDataFetch(value);
      }
    }, debounceTime),
    [onDataFetch, debounceTime, minInputLength]
  );

  const handleInputChange = useCallback(
    (ev: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = ev.target.value;
      setInputValue(newValue);
      debouncedFetch(newValue);
    },
    [debouncedFetch]
  );

  const renderedOptions = useMemo(
    () => options.map((option) => renderOption(option)),
    [options, renderOption]
  );

  const listboxStyles = {
    className: classes.listbox,
    style: {
      maxHeight: typeof maxHeight === 'number' ? `${maxHeight}px` : maxHeight,
    },
  };

  const loadingSpinner = loading && (
    <Spinner
      size="tiny"
      className={classes.spinner}
      labelPosition="after"
      label=""
    />
  );

  return (
    <div className={classes.root}>
      <Combobox
        freeform
        value={inputValue}
        onInput={handleInputChange}
        placeholder={placeholder}
        disabled={loading}
        aria-busy={loading}
        listbox={listboxStyles}
        {...comboboxProps}
      >
        {renderedOptions}
      </Combobox>
      {loadingSpinner}
    </div>
  );
};

export default Autocomplete;

