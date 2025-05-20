
import React from 'react';
import { Book } from '@/models/Book';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BookTableSkeleton } from '../Components/BookTableSkeleton';

interface BookTableProps {
  books: Book[];
  isLoading: boolean;
  onEdit: (book: Book) => void;
  onDelete: (book: Book) => void;
  view: 'table' | 'grid';
}

export const BookTable: React.FC<BookTableProps> = ({
  books,
  isLoading,
  onEdit,
  onDelete,
  view,
}) => {
  if (isLoading) {
    return <BookTableSkeleton />;
  }
  
  if (books.length === 0) {
    return (
      <div className="p-8 text-center">
        <p className="text-gray-500">No books found. Try adjusting your filters or add a new book.</p>
      </div>
    );
  }
  
  if (view === 'grid') {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {books.map(book => (
          <div key={book.id} className="bg-white p-4 rounded-md shadow-sm border">
            <h3 className="font-medium text-lg truncate">{book.title}</h3>
            <p className="text-sm text-gray-600 mb-2 truncate">by {book.author}</p>
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">{book.genre}</span>
              <span className="text-xs">{book.publishedYear}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className={`text-xs px-2 py-1 rounded-full ${
                book.status === 'Available' ? 'bg-green-100 text-green-800' :
                book.status === 'Borrowed' ? 'bg-yellow-100 text-yellow-800' :
                book.status === 'Reserved' ? 'bg-blue-100 text-blue-800' :
                'bg-red-100 text-red-800'
              }`}>
                {book.status}
              </span>
              <div className="flex space-x-2">
                <Button size="sm" variant="ghost" onClick={() => onEdit(book)}>Edit</Button>
                <Button size="sm" variant="ghost" onClick={() => onDelete(book)}>Delete</Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
  
  // Default table view
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Author</TableHead>
            <TableHead className="hidden md:table-cell">Genre</TableHead>
            <TableHead className="hidden sm:table-cell">Year</TableHead>
            <TableHead className="hidden lg:table-cell">Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {books.map(book => (
            <TableRow key={book.id}>
              <TableCell className="font-medium">{book.title}</TableCell>
              <TableCell>{book.author}</TableCell>
              <TableCell className="hidden md:table-cell">{book.genre}</TableCell>
              <TableCell className="hidden sm:table-cell">{book.publishedYear}</TableCell>
              <TableCell className="hidden lg:table-cell">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  book.status === 'Available' ? 'bg-green-100 text-green-800' :
                  book.status === 'Borrowed' ? 'bg-yellow-100 text-yellow-800' :
                  book.status === 'Reserved' ? 'bg-blue-100 text-blue-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {book.status}
                </span>
              </TableCell>
              <TableCell className="text-right space-x-2">
                <Button size="sm" variant="ghost" onClick={() => onEdit(book)}>
                  Edit
                </Button>
                <Button size="sm" variant="ghost" className="text-red-500" onClick={() => onDelete(book)}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
