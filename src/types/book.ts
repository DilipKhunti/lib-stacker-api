export interface Book {
  _id: string;
  title: string;
  author: string;
  publishedYear?: number;
  genre?: string;
  available: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateBookInput {
  title: string;
  author: string;
  publishedYear?: number;
  genre?: string;
  available?: boolean;
}

export interface UpdateBookInput extends Partial<CreateBookInput> {}
