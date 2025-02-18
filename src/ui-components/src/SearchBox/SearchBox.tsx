import React, { useState, useCallback } from "react";
import {
  Button,
  SearchBox as FluentSearchBox,
  Menu,
  MenuItem,
  MenuList,
  MenuPopover,
  Popover,
  PopoverSurface,
  PositioningImperativeRef,
  Spinner,
  useId,
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

  React.useEffect(() => {
    if (searchBoxRef.current) {
      positioningRef.current?.setTarget(searchBoxRef.current);
    }
  }, [searchBoxRef, positioningRef]);

  const restoreFocusTargetAttribute = useRestoreFocusTarget();

  const handleSearch = async (newValue: string) => {
    try {
      console.log(newValue);
      setQuery(newValue);
      setLoading(true);
      setOpen(true);
      onSearch(newValue);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  const handleSelectItem = useCallback(
    (item: any) => {
      onSelectItem(item);
      setQuery("");
    },
    [onSelectItem]
  );

  return (
    <>
      <FluentSearchBox
        {...restoreFocusTargetAttribute}
        placeholder={placeholder}
        value={query}
        onChange={(_, newValue) => handleSearch(newValue.value || "")}
        disabled={loading}
        contentAfter={loading ? <Spinner /> : undefined}
        ref={searchBoxRef}
      />
      <Menu open={open} positioning={{ positioningRef }}>
        <MenuPopover>
          <MenuList>
            <MenuItem>New </MenuItem>
            <MenuItem>New Window</MenuItem>
            <MenuItem disabled>Open File</MenuItem>
            <MenuItem>Open Folder</MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>
    </>
  );
};

export default SearchBox;
export { SearchBoxProps, SearchBox };
