
import { Book, BookFormData } from "../models/Book";

// Using CRUDCRUD API with the provided endpoint
const API_URL = "https://crudcrud.com/api/fedb619670aa4c29b39dc886e996d9d2/books";

export const bookService = {
  // Fetch all books with optional search and filter params
  async getBooks(params?: {
    search?: string;
    genre?: string;
    status?: string;
    page?: number;
    limit?: number;
  }): Promise<{ data: Book[]; total: number }> {
    try {
      // In a real API, we would pass these params to the endpoint
      // For crudcrud, we'll fetch all and filter client-side
      const response = await fetch(API_URL);
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      
      let data = await response.json() as any[];
      // Transform the data to match our Book interface
      let allBooks = data.map(item => ({
        id: item._id, // CRUDCRUD uses _id as the identifier
        title: item.title,
        author: item.author,
        genre: item.genre,
        publishedYear: parseInt(item.publishedYear) || item.publishedYear,
        status: item.status
      }));
      
      let filteredData = [...allBooks];
      
      // Apply filters
      if (params?.search) {
        const searchLower = params.search.toLowerCase();
        filteredData = filteredData.filter(book => 
          book.title.toLowerCase().includes(searchLower) || 
          book.author.toLowerCase().includes(searchLower)
        );
      }
      
      if (params?.genre) {
        filteredData = filteredData.filter(book => 
          book.genre === params.genre
        );
      }
      
      if (params?.status) {
        filteredData = filteredData.filter(book => 
          book.status === params.status
        );
      }
      
      // Calculate pagination
      const total = filteredData.length;
      const page = params?.page || 1;
      const limit = params?.limit || 10;
      const start = (page - 1) * limit;
      const end = start + limit;
      
      // Apply pagination
      const paginatedData = filteredData.slice(start, end);
      
      return { 
        data: paginatedData,
        total
      };
    } catch (error) {
      console.error("Error fetching books:", error);
      throw error;
    }
  },

  // Get a single book by ID
  async getBook(id: string): Promise<Book> {
    try {
      const response = await fetch(`${API_URL}/${id}`);
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      
      const data = await response.json();
      return {
        id: data._id,
        title: data.title,
        author: data.author,
        genre: data.genre,
        publishedYear: parseInt(data.publishedYear) || data.publishedYear,
        status: data.status
      };
    } catch (error) {
      console.error(`Error fetching book with id ${id}:`, error);
      throw error;
    }
  },

  // Create a new book
  async createBook(book: BookFormData): Promise<Book> {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(book),
      });
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      
      const data = await response.json();
      return {
        id: data._id,
        ...book
      };
    } catch (error) {
      console.error("Error creating book:", error);
      throw error;
    }
  },

  // Update an existing book
  // CRUDCRUD requires PUT without content-type header for updates
  async updateBook(id: string, book: BookFormData): Promise<Book> {
    try {
      // CRUDCRUD doesn't allow PUT to include _id in the body
      const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: book.title,
          author: book.author,
          genre: book.genre,
          publishedYear: book.publishedYear,
          status: book.status
        }),
      });
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      
      // CrudCrud doesn't return data on PUT, so we build the response
      return {
        id,
        ...book
      };
    } catch (error) {
      console.error(`Error updating book with id ${id}:`, error);
      throw error;
    }
  },

  // Delete a book
  async deleteBook(id: string): Promise<void> {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      
      // Success - no return needed
    } catch (error) {
      console.error(`Error deleting book with id ${id}:`, error);
      throw error;
    }
  },
};
