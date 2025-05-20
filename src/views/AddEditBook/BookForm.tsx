
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Book, BookFormData, BOOK_GENRES, BOOK_STATUS } from '@/models/Book';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Validation schema
const bookFormSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100),
  author: z.string().min(1, 'Author is required').max(100),
  genre: z.string().min(1, 'Genre is required'),
  publishedYear: z.coerce.number()
    .int()
    .min(1000, 'Year must be at least 1000')
    .max(new Date().getFullYear(), `Year cannot be in the future`),
  status: z.string().min(1, 'Status is required'),
});

interface BookFormProps {
  book?: Book;
  onSubmit: (data: BookFormData) => void;
  isSubmitting: boolean;
  onCancel: () => void;
}

export const BookForm: React.FC<BookFormProps> = ({
  book,
  onSubmit,
  isSubmitting,
  onCancel,
}) => {
  const form = useForm<BookFormData>({
    resolver: zodResolver(bookFormSchema),
    defaultValues: book ? {
      title: book.title,
      author: book.author,
      genre: book.genre,
      publishedYear: book.publishedYear,
      status: book.status,
    } : {
      title: '',
      author: '',
      genre: '',
      publishedYear: new Date().getFullYear(),
      status: 'Available',
    },
  });

  const handleSubmit = (data: BookFormData) => {
    onSubmit(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Book title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="author"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Author</FormLabel>
              <FormControl>
                <Input placeholder="Author name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="genre"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Genre</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select genre" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {BOOK_GENRES.map((genre) => (
                      <SelectItem key={genre} value={genre}>{genre}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="publishedYear"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Published Year</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    min={1000} 
                    max={new Date().getFullYear()} 
                    placeholder="Year published"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select 
                onValueChange={field.onChange} 
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {BOOK_STATUS.map((status) => (
                    <SelectItem key={status} value={status}>{status}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="flex justify-end space-x-2">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Saving...' : book ? 'Update Book' : 'Add Book'}
          </Button>
        </div>
      </form>
    </Form>
  );
};
