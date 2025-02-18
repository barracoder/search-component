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
  onSelectItem: (item: any) => void; // New prop for handling selection
  isLoading: boolean;
  results: SearchBoxResult<TResultType>[] | null;
  placeholder?: string;
}

interface SearchBoxResult<TItem> {
  value: TItem;
  displayText: string;
}

const SearchBox: React.FC<SearchBoxProps<any>> = ({
  onSearch,
  onSelectItem,
  results,
  placeholder = "Search...",
}) => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const searchBoxRef = React.useRef<HTMLInputElement>(null);
  const positioningRef = React.useRef<PositioningImperativeRef>(null);
  const firstMenuItemRef = useRef<HTMLDivElement>(null);
  const onOpenChange: MenuProps["onOpenChange"] = (e, data) => {
    // do not close menu as an outside click if clicking on the custom trigger/target
    // this prevents it from closing & immediately re-opening when clicking custom triggers
    // as per 
    if (data.type === "clickOutside" && e.target === searchBoxRef.current) {
      return;
    }

    setOpen(data.open);
  };

  React.useEffect(() => {
    console.log("Setting target");
    if (searchBoxRef.current) {
      console.log("Setting target");
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

  const handleSelectItem = (item: SearchBoxResult<any>) => {
    onSelectItem(item.value);
    setQuery(item.displayText);
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
