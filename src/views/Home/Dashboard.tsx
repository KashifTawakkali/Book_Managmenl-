
import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { BookFilters } from './BookFilters';
import { BookTable } from './BookTable';
import { BookPagination } from './BookPagination';
import { BookFormModal } from '../AddEditBook/BookFormModal';
import { ConfirmationDialog } from '../Components/ConfirmationDialog';
import { useBooksViewModel } from '@/viewmodels/useBooksViewModel';
import { Book, BookFormData } from '@/models/Book';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

export const Dashboard: React.FC = () => {
  const [view, setView] = useState<'table' | 'grid'>('table');
  const [bookToEdit, setBookToEdit] = useState<Book | undefined>(undefined);
  const [bookToDelete, setBookToDelete] = useState<Book | undefined>(undefined);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const {
    books,
    totalBooks,
    page,
    limit,
    isLoading,
    isCreating,
    isUpdating,
    isDeleting,
    handlePageChange,
    handleFilterChange,
    handleCreateBook,
    handleUpdateBook,
    handleDeleteBook,
  } = useBooksViewModel();
  
  const totalPages = Math.ceil(totalBooks / limit);
  
  const handleSearch = useCallback((term: string) => {
    handleFilterChange({ search: term || undefined });
  }, [handleFilterChange]);
  
  const handleGenreFilter = useCallback((genre: string | undefined) => {
    handleFilterChange({ genre });
  }, [handleFilterChange]);
  
  const handleStatusFilter = useCallback((status: string | undefined) => {
    handleFilterChange({ status });
  }, [handleFilterChange]);
  
  const handleAddBook = () => {
    setIsAddModalOpen(true);
  };
  
  const handleEditBook = (book: Book) => {
    if (!book || !book.id) {
      toast.error("Cannot edit book: Invalid book data");
      return;
    }
    setBookToEdit(book);
    setIsEditModalOpen(true);
  };
  
  const handleDeleteBookClick = (book: Book) => {
    if (!book || !book.id) {
      toast.error("Cannot delete book: Invalid book data");
      return;
    }
    setBookToDelete(book);
    setIsDeleteDialogOpen(true);
  };
  
  const confirmDeleteBook = () => {
    if (bookToDelete && bookToDelete.id) {
      handleDeleteBook(bookToDelete.id);
      setIsDeleteDialogOpen(false);
      setBookToDelete(undefined);
    } else {
      toast.error("Cannot delete book: Missing book ID");
      setIsDeleteDialogOpen(false);
      setBookToDelete(undefined);
    }
  };
  
  const handleCreateBookSubmit = (data: BookFormData) => {
    handleCreateBook(data);
    setIsAddModalOpen(false);
  };
  
  const handleUpdateBookSubmit = (data: BookFormData) => {
    if (bookToEdit && bookToEdit.id) {
      handleUpdateBook(bookToEdit.id, data);
      setIsEditModalOpen(false);
      setBookToEdit(undefined);
    } else {
      toast.error("Cannot update book: Missing book ID");
      setIsEditModalOpen(false);
      setBookToEdit(undefined);
    }
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Book Dashboard</h1>
        <Button onClick={handleAddBook}>Add New Book</Button>
      </div>
      
      <BookFilters
        onSearch={handleSearch}
        onGenreFilter={handleGenreFilter}
        onStatusFilter={handleStatusFilter}
      />
      
      <div className="bg-white rounded-md shadow-sm">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-lg font-medium">Books ({totalBooks})</h2>
          <Tabs defaultValue="table" value={view} onValueChange={(v) => setView(v as 'table' | 'grid')}>
            <TabsList>
              <TabsTrigger value="table">Table</TabsTrigger>
              <TabsTrigger value="grid">Grid</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        <div className="p-4">
          <BookTable
            books={books}
            isLoading={isLoading}
            onEdit={handleEditBook}
            onDelete={handleDeleteBookClick}
            view={view}
          />
          
          <div className="mt-4 flex justify-center">
            <BookPagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
      
      {/* Modals */}
      <BookFormModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleCreateBookSubmit}
        isSubmitting={isCreating}
        mode="add"
      />
      
      <BookFormModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setBookToEdit(undefined);
        }}
        book={bookToEdit}
        onSubmit={handleUpdateBookSubmit}
        isSubmitting={isUpdating}
        mode="edit"
      />
      
      <ConfirmationDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => {
          setIsDeleteDialogOpen(false);
          setBookToDelete(undefined);
        }}
        onConfirm={confirmDeleteBook}
        title="Delete Book"
        description={`Are you sure you want to delete "${bookToDelete?.title}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        variant="destructive"
      />
    </div>
  );
};
