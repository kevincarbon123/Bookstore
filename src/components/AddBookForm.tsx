import { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { BookProps } from "../components/Book";

type AddBookFormProps = {
    show: boolean;
    onClose: () => void;
    onAddBook: (newBook: BookProps) => void;
};

export const AddBookForm: React.FC<AddBookFormProps> = ({ show, onClose, onAddBook }) => {
    const [formData, setFormData] = useState({
        name: "",
        price: "",
        category: "",
        description: "",
        imgUrl: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { name, price, category, description, imgUrl } = formData;
        if (!name || !price || !category || !description || !imgUrl) {
            alert("Please fill in all fields.");
            return;
        }
        const newBook = {
            id: Date.now(), 
            name,
            price: parseFloat(price),
            category,
            description,
            imgUrl,
            onEdit: () => {},
            onDelete: () => {}
        };
        onAddBook(newBook);
        setFormData({
            name: "",
            price: "",
            category: "",
            description: "",
            imgUrl: ""
        });
        onClose();
    };

    return (
        <Modal show={show} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add New Book</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formPrice">
                        <Form.Label>Price</Form.Label>
                        <Form.Control
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formCategory">
                        <Form.Label>Category</Form.Label>
                        <Form.Control
                            type="text"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formDescription">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formImgUrl">
                        <Form.Label>Image URL</Form.Label>
                        <Form.Control
                            type="url"
                            name="imgUrl"
                            value={formData.imgUrl}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Button variant="secondary" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" type="submit">
                        Add Book
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};
