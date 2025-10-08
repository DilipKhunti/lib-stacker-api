import { Book, CreateBookInput, UpdateBookInput } from "@/types/book";

const API_BASE_URL = "http://localhost:5000/api";

export const bookApi = {
  // Get all books
  getAll: async (): Promise<Book[]> => {
    const response = await fetch(`${API_BASE_URL}/books`);
    if (!response.ok) {
      throw new Error("Failed to fetch books");
    }
    return response.json();
  },

  // Get book by ID
  getById: async (id: string): Promise<Book> => {
    const response = await fetch(`${API_BASE_URL}/books/${id}`);
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("Book not found");
      }
      throw new Error("Failed to fetch book");
    }
    return response.json();
  },

  // Create new book
  create: async (book: CreateBookInput): Promise<Book> => {
    const response = await fetch(`${API_BASE_URL}/books`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(book),
    });
    if (!response.ok) {
      throw new Error("Failed to create book");
    }
    return response.json();
  },

  // Update book
  update: async (id: string, book: UpdateBookInput): Promise<Book> => {
    const response = await fetch(`${API_BASE_URL}/books/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(book),
    });
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("Book not found");
      }
      throw new Error("Failed to update book");
    }
    return response.json();
  },

  // Delete book
  delete: async (id: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/books/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("Book not found");
      }
      throw new Error("Failed to delete book");
    }
  },
};
