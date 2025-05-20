
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { BookForm } from './BookForm';
import { Book, BookFormData } from '@/models/Book';

interface BookFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  book?: Book;
  onSubmit: (data: BookFormData) => void;
  isSubmitting: boolean;
  mode: 'add' | 'edit';
}

export const BookFormModal: React.FC<BookFormModalProps> = ({
  isOpen,
  onClose,
  book,
  onSubmit,
  isSubmitting,
  mode,
}) => {
  const handleSubmit = (data: BookFormData) => {
    onSubmit(data);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {mode === 'add' ? 'Add New Book' : 'Edit Book'}
          </DialogTitle>
        </DialogHeader>
        <BookForm
          book={book}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          onCancel={onClose}
        />
      </DialogContent>
    </Dialog>
  );
};
