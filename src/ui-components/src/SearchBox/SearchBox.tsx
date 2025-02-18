import React, {
  useState,
  useCallback,
  SyntheticEvent,
  useEffect,
  useRef,
} from "react";
import {
  SearchBox as FluentSearchBox,
  InputOnChangeData,
  Menu,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuProps,
  PositioningImperativeRef,
  SearchBoxChangeEvent,
  Spinner,
  useRestoreFocusTarget,
} from "@fluentui/react-components";

interface SearchBoxProps<TResultType> {
  onSearch: (query: string, onComplete: () => void) => void;
  onSelectItem: (item: TResultType) => void; 
  isLoading: boolean;
  results: SearchBoxResult<TResultType>[] | null;
  placeholder?: string;
}

interface SearchBoxResult<TItem> {
  value: TItem;
  displayText: string;
}

const SearchBox = <TResultType,>({
  onSearch,
  onSelectItem,
  isLoading,
  results,
  placeholder = 'Search...',
}: SearchBoxProps<TResultType>)  => {
  // contains the current search query
  const [query, setQuery] = useState("");
  // contains the current loading state
  const [loading, setLoading] = useState(false);
  // contains the current open state
  const [open, setOpen] = useState(false);
  // ref to the search box
  const searchBoxRef = React.useRef<HTMLInputElement>(null);
  // ref to the positioning imperative
  const positioningRef = React.useRef<PositioningImperativeRef>(null);
  // ref to the first menu item
  const firstMenuItemRef = useRef<HTMLDivElement>(null);
  /* 
    * do not close menu as an outside click if clicking on the custom trigger/target
    * this prevents it from closing & immediately re-opening when clicking custom triggers
    * as per https://react.fluentui.dev/iframe.html?viewMode=docs&id=components-menu-menu--docs#anchor-to-custom-target
  */
  const onOpenChange: MenuProps["onOpenChange"] = (e, data) => {
    setOpen(data.open);
  };

  React.useEffect(() => {
    if (searchBoxRef.current) {
      positioningRef.current?.setTarget(searchBoxRef.current);
    }
  }, [searchBoxRef, positioningRef]);

  const restoreFocusTargetAttribute = useRestoreFocusTarget();

  const handleSearch = (
    event: SearchBoxChangeEvent,
    data: InputOnChangeData
  ) => {
    setQuery(data.value);
  };

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLElement>) => {
      if (event.key === "Enter") {
        if (query.trim()) {
          setLoading(true);
          onSearch(query, () => {
            setLoading(false);
            setOpen(true);
          });
        } else {
          setOpen(false);
        }
      }
    },
    [onSearch, query]
  );

  const handleSelectItem = (item: SearchBoxResult<TResultType>) => {
    onSelectItem(item.value);
    setQuery("");
  };

  useEffect(() => {
    if (open && firstMenuItemRef.current) {
      firstMenuItemRef.current.focus();
    }
  }, [open]);

  return (
    <>
      <FluentSearchBox
        {...restoreFocusTargetAttribute}
        placeholder={placeholder}
        value={query}
        onChange={handleSearch}
        onKeyDown={handleKeyDown}
        contentBefore={loading ? <Spinner size="tiny" /> : undefined}
        ref={searchBoxRef}
        disabled={loading}
      />
      <Menu
        open={open}
        onOpenChange={onOpenChange}
        positioning={{ positioningRef }}
      >
        <MenuPopover>
          <MenuList>
            {results && results.length > 0 ? (
              results.map((result, index) => (
                <MenuItem
                  key={index}
                  onClick={() => handleSelectItem(result)}
                  ref={index === 0 ? firstMenuItemRef : null}
                >
                  {result.displayText}
                </MenuItem>
              ))
            ) : (
              <MenuItem disabled>No results found</MenuItem>
            )}
          </MenuList>
        </MenuPopover>
      </Menu>
    </>
  );
};

export default SearchBox;
export { SearchBoxProps, SearchBox, SearchBoxResult };
