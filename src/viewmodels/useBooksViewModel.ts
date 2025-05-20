
import { useCallback, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Book, BookFormData } from '../models/Book';
import { bookService } from '../services/bookService';
import { toast } from 'sonner';

interface BooksFilters {
  search?: string;
  genre?: string;
  status?: string;
}

export const useBooksViewModel = () => {
  const queryClient = useQueryClient();
  
  // Pagination state
  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(10);
  
  // Filters state
  const [filters, setFilters] = useState<BooksFilters>({});
  
  // Books query with filters and pagination
  const { 
    data,
    isLoading, 
    isError,
    error,
    refetch 
  } = useQuery({
    queryKey: ['books', page, limit, filters],
    queryFn: () => bookService.getBooks({ 
      page,
      limit,
      ...filters 
    }),
  });
  
  // Create book mutation
  const createBookMutation = useMutation({
    mutationFn: (newBook: BookFormData) => bookService.createBook(newBook),
    onSuccess: () => {
      toast.success('Book created successfully!');
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['books'] });
    },
    onError: (error: Error) => {
      toast.error(`Failed to create book: ${error.message}`);
    }
  });
  
  // Update book mutation
  const updateBookMutation = useMutation({
    mutationFn: ({ id, book }: { id: string; book: BookFormData }) => {
      if (!id) {
        throw new Error('Book ID is required for updating');
      }
      return bookService.updateBook(id, book);
    },
    onSuccess: () => {
      toast.success('Book updated successfully!');
      queryClient.invalidateQueries({ queryKey: ['books'] });
    },
    onError: (error: Error) => {
      toast.error(`Failed to update book: ${error.message}`);
      console.error("Update error:", error);
    }
  });
  
  // Delete book mutation
  const deleteBookMutation = useMutation({
    mutationFn: (id: string) => {
      if (!id) {
        throw new Error('Book ID is required for deletion');
      }
      console.log("Deleting book with valid ID:", id);
      return bookService.deleteBook(id);
    },
    onSuccess: () => {
      toast.success('Book deleted successfully!');
      queryClient.invalidateQueries({ queryKey: ['books'] });
    },
    onError: (error: Error) => {
      toast.error(`Failed to delete book: ${error.message}`);
      console.error("Delete error:", error);
    }
  });
  
  // Handler functions
  const handlePageChange = useCallback((newPage: number) => {
    setPage(newPage);
  }, []);
  
  const handleFilterChange = useCallback((newFilters: Partial<BooksFilters>) => {
    setFilters(prev => ({
      ...prev,
      ...newFilters
    }));
    setPage(1); // Reset pagination when filters change
  }, []);
  
  const handleCreateBook = useCallback((book: BookFormData) => {
    createBookMutation.mutate(book);
  }, [createBookMutation]);
  
  const handleUpdateBook = useCallback((id: string, book: BookFormData) => {
    if (!id) {
      toast.error("Cannot update book: Missing book ID");
      return;
    }
    console.log("Updating book with id:", id, "and data:", book);
    updateBookMutation.mutate({ id, book });
  }, [updateBookMutation, toast]);
  
  const handleDeleteBook = useCallback((id: string) => {
    if (!id) {
      toast.error("Cannot delete book: Missing book ID");
      return;
    }
    console.log("Deleting book with id:", id);
    deleteBookMutation.mutate(id);
  }, [deleteBookMutation, toast]);
  
  return {
    // Data
    books: data?.data || [],
    totalBooks: data?.total || 0,
    page,
    limit,
    filters,
    
    // Loading and error states
    isLoading,
    isCreating: createBookMutation.isPending,
    isUpdating: updateBookMutation.isPending,
    isDeleting: deleteBookMutation.isPending,
    isError,
    error,
    refetch,
    
    // Handlers
    handlePageChange,
    handleFilterChange,
    handleCreateBook,
    handleUpdateBook,
    handleDeleteBook
  };
};
