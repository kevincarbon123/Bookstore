import { Card, Button } from "react-bootstrap";

export type BookProps = {
    id: number;
    name: string;
    price: number;
    category: string;
    description: string;
    imgUrl: string;
    onDelete: (id: number) => void;
    onEdit: (book: BookProps) => void;
};

export function BookItem({ id, name, price, category, description, imgUrl, onDelete, onEdit }: BookProps) {
    const handleDelete = () => {
        onDelete(id);
    };

    const handleEdit = () => {
        onEdit({id, name, price, category, description, imgUrl, onDelete, onEdit });
    };

    return (
        <Card>
            <Card.Img variant="top" src={imgUrl} height="400px" style={{ objectFit: "contain" }} onClick={handleEdit}/>
            <Card.Body className="d-flex flex-column">
                <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
                    <span className="fs-2">{name}</span>
                    <span className="ms-2 text-muted">${price}</span>
                </Card.Title>
                <span className="ms-2">Category: {category}</span>
                <span className="ms-2 mb-2">Description: {description}</span>

                <div className="mt-auto">
                    <div className="d-flex flex-column" style={{ gap: ".5rem" }}>
                        <div className="d-flex" style={{ gap: ".5rem" }}>
                            <Button onClick={handleDelete}>Delete</Button>
                        </div>
                        
                    </div>
                </div>
            </Card.Body>
        </Card>
    );
}
