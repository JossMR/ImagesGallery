"use client";
import React, { useState, useEffect } from 'react';
import Item from '@/app/components/Item';
import Cart from '@/app/components/Cart';

const ItemList: React.FC = () => {
    const [items, setItems] = useState<{ id: number; imageId: string; image: string; name: string; description: string; price: number }[]>([]);
    const [cartItems, setCartItems] = useState<{ id: number; name: string; price: number; quantity: number }[]>([]);

    const fetchImages = async (): Promise<any[]> => {
        const storedImages = localStorage.getItem('itemImages');
        if (storedImages) {
            return JSON.parse(storedImages);
        } else {
            try {
                let count = "5";
                let query = "cat";
                let client_id = "gOaGK3EqEmv20xvl3I8-x0tbzAtaJEJgmYrxaZ-JCLY";
                const response = await fetch(
                    `https://api.unsplash.com/photos/random?count=${count}&query=${query}&client_id=${client_id}`,
                );

                if (!response.ok) {
                    throw new Error(`Error en la solicitud: ${response.status}`);
                }

                const data = await response.json();
                console.log(data);
                localStorage.setItem('itemImages', JSON.stringify(data));
                return data;
            } catch (error) {
                console.error('Error al cargar las imágenes desde Unsplash:', error);
                return [];
            }
        }
    };

    const mapImages = (data: any[]): { id: number; imageId: string; image: string; name: string; description: string; price: number }[] => {
        return data.map((item: any, index: number) => ({
            id: index + 1,
            imageId: item.id,
            image: item.urls?.small || '',
            name: item.user?.name || 'Usuario desconocido',
            description: item.description || item.alt_description || 'Sin descripción', 
            price: parseFloat((Math.random() * 100).toFixed(2)),
        }));
    };

    useEffect(() => {
        const loadImages = async () => {
            const data = await fetchImages();
            if (Array.isArray(data)) {
                const mappedItems = mapImages(data);
                setItems(mappedItems);
            } else if (typeof data === 'object' && data !== null) {
                const mappedItems = mapImages([data]);
                setItems(mappedItems);
            } else {
                console.error('La respuesta de la API no es un arreglo:', data);
            }
        };

        loadImages();
    }, []);

    const addToCart = (id: number, quantity: number) => {
        const item = items.find((item) => item.id === id);
        if (item) {
            setCartItems((prevCart) => {
                const existingItem = prevCart.find((cartItem) => cartItem.id === id);
                if (existingItem) {
                    return prevCart.map((cartItem) =>
                        cartItem.id === id
                            ? { ...cartItem, quantity: cartItem.quantity + quantity }
                            : cartItem
                    );
                }
                return [...prevCart, { id: item.id, name: item.name, price: item.price, quantity }];
            });
        }
    };

    const removeFromCart = (id: number) => {
        setCartItems((prevCart) => prevCart.filter((item) => item.id !== id));
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', gap: '32px', padding: '16px' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'center' }}>
                {items.map((item) => (
                    <Item
                        key={item.id}
                        id={item.id}
                        image={item.image}
                        name={item.name}
                        description={item.description}
                        price={item.price}
                        onAddToCart={addToCart}
                    />
                ))}
            </div>
            <Cart cartItems={cartItems} onRemoveFromCart={removeFromCart} />
        </div>
    );
};

export default ItemList;