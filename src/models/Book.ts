
export interface Book {
  id: string;
  title: string;
  author: string;
  genre: string;
  publishedYear: number;
  status: 'Available' | 'Borrowed' | 'Reserved' | 'Lost';
}

export type BookFormData = Omit<Book, 'id'>;

export const BOOK_STATUS = ['Available', 'Borrowed', 'Reserved', 'Lost'] as const;

export const BOOK_GENRES = [
  'Fiction',
  'Non-Fiction',
  'Science Fiction',
  'Fantasy',
  'Mystery',
  'Thriller',
  'Romance',
  'Biography',
  'History',
  'Self-Help',
  'Business',
  'Poetry',
  'Children',
  'Young Adult',
  'Comics',
  'Art',
  'Cookbooks',
  'Travel',
  'Science',
  'Philosophy',
  'Religion',
] as const;
