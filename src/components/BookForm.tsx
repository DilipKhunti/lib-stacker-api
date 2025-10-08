import { useState } from "react";
import { Book, CreateBookInput, UpdateBookInput } from "@/types/book";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface BookFormProps {
  book?: Book;
  onSubmit: (data: CreateBookInput | UpdateBookInput) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export const BookForm = ({ book, onSubmit, onCancel, isLoading }: BookFormProps) => {
  const [formData, setFormData] = useState({
    title: book?.title || "",
    author: book?.author || "",
    publishedYear: book?.publishedYear?.toString() || "",
    genre: book?.genre || "",
    available: book?.available ?? true,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const data: CreateBookInput | UpdateBookInput = {
      title: formData.title,
      author: formData.author,
      publishedYear: formData.publishedYear ? parseInt(formData.publishedYear) : undefined,
      genre: formData.genre || undefined,
      available: formData.available,
    };

    onSubmit(data);
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          {book ? "Edit Book" : "Add New Book"}
        </DialogTitle>
      </DialogHeader>
      
      <form onSubmit={handleSubmit} className="space-y-6 mt-4">
        <div className="space-y-2">
          <Label htmlFor="title">Title *</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="Enter book title"
            required
            className="transition-smooth"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="author">Author *</Label>
          <Input
            id="author"
            value={formData.author}
            onChange={(e) => setFormData({ ...formData, author: e.target.value })}
            placeholder="Enter author name"
            required
            className="transition-smooth"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="publishedYear">Published Year</Label>
            <Input
              id="publishedYear"
              type="number"
              value={formData.publishedYear}
              onChange={(e) => setFormData({ ...formData, publishedYear: e.target.value })}
              placeholder="2024"
              min="1000"
              max={new Date().getFullYear()}
              className="transition-smooth"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="genre">Genre</Label>
            <Input
              id="genre"
              value={formData.genre}
              onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
              placeholder="Fiction, Science, etc."
              className="transition-smooth"
            />
          </div>
        </div>

        <div className="flex items-center justify-between p-4 rounded-lg bg-secondary">
          <div className="space-y-0.5">
            <Label htmlFor="available" className="text-base font-medium">
              Available
            </Label>
            <p className="text-sm text-muted-foreground">
              Is this book available for borrowing?
            </p>
          </div>
          <Switch
            id="available"
            checked={formData.available}
            onCheckedChange={(checked) => setFormData({ ...formData, available: checked })}
          />
        </div>

        <div className="flex gap-3 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            className="flex-1"
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="flex-1 bg-gradient-primary hover:opacity-90 transition-smooth"
            disabled={isLoading}
          >
            {isLoading ? "Saving..." : book ? "Update Book" : "Add Book"}
          </Button>
        </div>
      </form>
    </>
  );
};
