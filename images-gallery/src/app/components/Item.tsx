import React, { useState } from 'react';

interface ItemProps {
    id: number;
    image: string;
    name: string;
    description: string;
    price: number;
    onAddToCart: (id: number, quantity: number) => void;
}

const Item: React.FC<ItemProps> = ({ id, image, name, description, price, onAddToCart }) => {
    const [quantity, setQuantity] = useState<number>(1);

    return (
        <div
            className="item"
            style={{
                border: '1px solid #ddd',
                borderRadius: '8px',
                padding: '16px',
                maxWidth: '300px',
                textAlign: 'center',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                backgroundColor: '#fff',
            }}
        >
            <img
                src={image}
                alt={name}
                className="item-image"
                style={{
                    maxWidth: '100%',
                    maxHeight: '200px',
                    objectFit: 'cover',
                    borderRadius: '8px',
                    marginBottom: '16px',
                }}
            />
            <h3
                className="item-name"
                style={{
                    fontSize: '18px',
                    fontWeight: 'bold',
                    marginBottom: '8px',
                    color: 'rgba(0, 0, 0, 0.8)',
                }}
            >
                {name}
            </h3>
            <p
                className="item-description"
                style={{
                    fontSize: '14px',
                    color: 'rgba(0, 0, 0, 0.7)',
                    marginBottom: '16px',
                }}
            >
                {description}
            </p>
            <p
                className="item-price"
                style={{
                    fontSize: '16px',
                    fontWeight: 'bold',
                    color: '#333',
                    marginBottom: '16px',
                }}
            >
                ${price}
            </p>
            <div
                className="action-container"
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '8px',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        color: 'rgba(0, 0, 0, 0.7)',
                    }}
                >
                    <label
                        htmlFor={`quantity-${id}`}
                        style={{
                            fontSize: '14px',
                            fontWeight: 'bold',
                        }}
                    >
                        Cantidad:
                    </label>
                    <select
                        id={`quantity-${id}`}
                        value={quantity}
                        onChange={(e) => setQuantity(parseInt(e.target.value))}
                        style={{
                            padding: '4px',
                            borderRadius: '4px',
                            border: '1px solid #ddd',
                        }}
                    >
                        {Array.from({ length: 10 }, (_, i) => i + 1).map((qty) => (
                            <option key={qty} value={qty}>
                                {qty}
                            </option>
                        ))}
                    </select>
                </div>
                <button
                    className="add-to-cart-button"
                    onClick={() => onAddToCart(id, quantity)}
                    style={{
                        padding: '8px 16px',
                        backgroundColor: 'rgba(0, 123, 255, 0.8)',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '14px',
                        fontWeight: 'bold',
                    }}
                >
                    Agregar al carrito
                </button>
            </div>
        </div>
    );
};

export default Item;