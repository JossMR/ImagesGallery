import React from 'react';

interface CartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
}

interface CartProps {
    cartItems: CartItem[];
    onRemoveFromCart: (id: number) => void;
}

const Cart: React.FC<CartProps> = ({ cartItems, onRemoveFromCart }) => {
    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <div
            style={{
                border: '1px solid #ddd',
                borderRadius: '8px',
                padding: '16px',
                maxWidth: '400px',
                backgroundColor: '#fff',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                color: 'rgba(0, 0, 0, 0.8)',
            }}
        >
            <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px' }}>Carrito</h2>
            {cartItems.length === 0 ? (
                <p style={{ fontSize: '16px', color: '#555' }}>El carrito está vacío.</p>
            ) : (
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    {cartItems.map((item) => (
                        <li
                            key={item.id}
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                marginBottom: '8px',
                                borderBottom: '1px solid #ddd',
                                paddingBottom: '8px',
                            }}
                        >
                            <span>{item.name} (x{item.quantity})</span>
                            <span>${(item.price * item.quantity).toFixed(2)}</span>
                            <button
                                onClick={() => onRemoveFromCart(item.id)}
                                style={{
                                    background: 'rgba(214, 62, 62, 0.81)',
                                    color: 'rgba(255, 255, 255, 0.8)',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                    fontSize: '16px',
                                    minHeight: '24px',
                                    minWidth: '24px',
                                    marginLeft: '8px',
                                    transition: 'background 0.3s ease',
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.background = 'rgba(156, 4, 4, 0.9)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background = 'rgba(214, 62, 62, 0.81)';
                                }}
                            >
                                <span style={{ fontWeight: 'bold', fontSize: '18px' }}>✖</span>
                            </button>
                        </li>
                    ))}
                </ul>
            )}
            <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginTop: '16px', color: 'rgba(26, 104, 39, 0.8)' }}>
                Total: ${total.toFixed(2)}
            </h3>
        </div>
    );
};

export default Cart;