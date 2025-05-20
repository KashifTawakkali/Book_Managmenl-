import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BOOK_GENRES, BOOK_STATUS } from '@/models/Book';
import { useDebounce } from '@/hooks/useDebounce';

interface BookFiltersProps {
  onSearch: (term: string) => void;
  onGenreFilter: (genre: string | undefined) => void;
  onStatusFilter: (status: string | undefined) => void;
}

export const BookFilters: React.FC<BookFiltersProps> = ({
  onSearch,
  onGenreFilter,
  onStatusFilter,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  
  React.useEffect(() => {
    onSearch(debouncedSearchTerm);
  }, [debouncedSearchTerm, onSearch]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleGenreChange = (value: string) => {
    onGenreFilter(value === 'all' ? undefined : value);
  };
  
  const handleStatusChange = (value: string) => {
    onStatusFilter(value === 'all' ? undefined : value);
  };

  return (
    <div className="p-4 bg-card rounded-md shadow-sm border space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Input
            placeholder="Search books by title or author..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full bg-background"
          />
        </div>
        <div>
          <Button 
            variant="outline" 
            onClick={() => {
              setSearchTerm('');
              onGenreFilter(undefined);
              onStatusFilter(undefined);
            }}
          >
            Clear filters
          </Button>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <Select onValueChange={handleGenreChange} defaultValue="all">
          <SelectTrigger className="w-full sm:w-[180px] bg-background">
            <SelectValue placeholder="Genre" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Genres</SelectItem>
            {BOOK_GENRES.map(genre => (
              <SelectItem key={genre} value={genre}>{genre}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <Select onValueChange={handleStatusChange} defaultValue="all">
          <SelectTrigger className="w-full sm:w-[180px] bg-background">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            {BOOK_STATUS.map(status => (
              <SelectItem key={status} value={status}>{status}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
