import { Search } from 'lucide-react';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '../../ui/input-group';
import { useEffect, useState } from 'react';

interface AppSearchBarProps {
  initialValue?: string;
  onSearch: (value: string) => void;
  placeholder?: string;
  totalSearchResult: number;
  isLoading: boolean;
}

export function AppSearchBar({
  isLoading,
  totalSearchResult = 0,
  initialValue = '',
  onSearch,
  placeholder = 'Tìm kiếm...',
}: AppSearchBarProps) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (value !== initialValue) {
        onSearch(value);
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [value, initialValue, onSearch]);

  return (
    <InputGroup className='border border-border bg-card'>
      <InputGroupInput
        placeholder={placeholder}
        onChange={(e) => setValue(e.target.value)}
      />
      <InputGroupAddon>
        <Search />
      </InputGroupAddon>
      {value !== '' && !isLoading && (
        <InputGroupAddon align='inline-end'>
          <span> {totalSearchResult} kết quả</span>
        </InputGroupAddon>
      )}
    </InputGroup>
  );
}
