import React, { useState, useCallback, SyntheticEvent } from "react";
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

interface SearchBoxProps {
  onSearch: (query: string) => void;
  onSelectItem: (item: any) => void; // New prop for handling selection
  isLoading: boolean;
  results: any[] | null;
  renderResults?: (results: any[]) => React.ReactNode; // Optional, for custom rendering
  placeholder?: string;
}

const SearchBox: React.FC<SearchBoxProps> = ({
  onSearch,
  onSelectItem,
  results,
  renderResults,
  placeholder = "Search...",
}) => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const searchBoxRef = React.useRef<HTMLInputElement>(null);
  const positioningRef = React.useRef<PositioningImperativeRef>(null);
  const onOpenChange: MenuProps["onOpenChange"] = (e, data) => {
    // do not close menu as an outside click if clicking on the custom trigger/target
    // this prevents it from closing & immediately re-opening when clicking custom triggers
    if (
      data.type === "clickOutside" && e.target === searchBoxRef.current
    ) {
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

  const handleSearch = (event: SearchBoxChangeEvent, data: InputOnChangeData) => {
    setQuery(data.value);
  };

  const handleKeyDown = useCallback((event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === 'Enter') {
      if (query.trim()) {
        onSearch(query);
        setOpen(true);
      } else {
        setOpen(false);
      }
    }
  }, [onSearch, query]);

  function handleMenuSelect(event: SyntheticEvent<HTMLDivElement, Event>): void {
    throw new Error("Function not implemented.");
  }

  return (
    <>
      <FluentSearchBox
        {...restoreFocusTargetAttribute}
        placeholder={placeholder}
        value={query}
        onChange={handleSearch}
        onKeyDown={handleKeyDown}
        disabled={loading}
        contentAfter={loading ? <Spinner /> : undefined}
        ref={searchBoxRef}
      />
      <Menu open={open} onOpenChange={onOpenChange} positioning={{  positioningRef }}>
        <MenuPopover>
          <MenuList onSelect={handleMenuSelect }>
            <MenuItem>New </MenuItem>
            <MenuItem>New Window</MenuItem>
            <MenuItem>Open File This is a very long name Stlartibartfast</MenuItem>
            <MenuItem>Open Folder</MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>
    </>
  );
};

export default SearchBox;
export { SearchBoxProps, SearchBox };
