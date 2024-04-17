import { useState } from "react";
import { Col, Row, Button } from "react-bootstrap";
import books from "../data/books.json";
import { BookItem, BookProps } from "../components/Book";
import { EditBookModal } from "../components/EditBookModal";
import { AddBookForm } from "../components/AddBookForm"; 


export function Home() {
    const [items, setBooks] = useState(books);
    const [selectedBook, setSelectedBook] = useState<BookProps | null>(null);
    const [showAddBookModal, setShowAddBookModal] = useState(false); 

    const handleDelete = (id: number) => {
        setBooks(prevItems => prevItems.filter(item => item.id !== id));
    };

    const handleEdit = (book: BookProps) => {
        setSelectedBook(book);
    };

    const handleCloseModal = () => {
        setSelectedBook(null);
    };

    const handleSaveChanges = (updatedBook: BookProps) => {
        const updatedItems = items.map(item =>
            item.id === updatedBook.id ? updatedBook : item
        );
        setBooks(updatedItems);
        handleCloseModal();
    };

    const handleAddBook = () => {
        setShowAddBookModal(true);
    };

    const handleAddNewBook = (newBook: BookProps) => {
        setBooks(prevBooks => [...prevBooks, newBook]);
    };

    return (
        <>
            <h1>Kevin's Bookstore</h1>
            <Button onClick={handleAddBook} className="mb-3">Add New Book</Button>
            <Row md={2} xs={1} lg={3} className="g-3">
                {items.map(item => (
                    <Col key={item.id}>
                        <BookItem {...item} onEdit={handleEdit} onDelete={handleDelete} />
                    </Col>
                ))}
            </Row>
            {selectedBook && (
                <EditBookModal
                    book={selectedBook}
                    onSaveChanges={handleSaveChanges}
                    onClose={handleCloseModal}
                />
            )}
            <AddBookForm
                show={showAddBookModal}
                onClose={() => setShowAddBookModal(false)}
                onAddBook={handleAddNewBook}
            />
        </>
    );
}
