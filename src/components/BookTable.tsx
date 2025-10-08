import { Book } from "@/types/book";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Pencil, Trash2, BookOpen } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface BookTableProps {
  books: Book[];
  onEdit: (book: Book) => void;
  onDelete: (id: string) => void;
}

export const BookTable = ({ books, onEdit, onDelete }: BookTableProps) => {
  if (books.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <BookOpen className="w-16 h-16 text-muted-foreground mb-4 opacity-50" />
        <h3 className="text-xl font-semibold mb-2">No books found</h3>
        <p className="text-muted-foreground">
          Get started by adding your first book to the library.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border bg-card shadow-sm overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="font-semibold">Title</TableHead>
            <TableHead className="font-semibold">Author</TableHead>
            <TableHead className="font-semibold">Genre</TableHead>
            <TableHead className="font-semibold">Year</TableHead>
            <TableHead className="font-semibold">Status</TableHead>
            <TableHead className="text-right font-semibold">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {books.map((book) => (
            <TableRow key={book._id} className="transition-smooth hover:bg-muted/30">
              <TableCell className="font-medium">{book.title}</TableCell>
              <TableCell>{book.author}</TableCell>
              <TableCell>
                {book.genre ? (
                  <span className="text-sm text-muted-foreground">{book.genre}</span>
                ) : (
                  <span className="text-sm text-muted-foreground italic">Not specified</span>
                )}
              </TableCell>
              <TableCell>
                {book.publishedYear || (
                  <span className="text-sm text-muted-foreground italic">N/A</span>
                )}
              </TableCell>
              <TableCell>
                <Badge
                  variant={book.available ? "default" : "secondary"}
                  className={
                    book.available
                      ? "bg-success hover:bg-success/90"
                      : "bg-muted text-muted-foreground"
                  }
                >
                  {book.available ? "Available" : "Borrowed"}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex gap-2 justify-end">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onEdit(book)}
                    className="transition-smooth hover:bg-primary hover:text-primary-foreground"
                  >
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onDelete(book._id)}
                    className="transition-smooth hover:bg-destructive hover:text-destructive-foreground"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
