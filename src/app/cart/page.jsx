"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";

const Page = () => {
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const getCart = async () => {
            try {
                const res = await fetch("https://fakestoreapi.com/carts/1");
                const result = await res.json();
                const productsWithDetails = await Promise.all(
                    result.products.map(async (item) => {
                        const res = await fetch(`https://fakestoreapi.com/products/${item.productId}`);
                        const productData = await res.json();
                        return {
                            ...productData,
                            quantity: item.quantity,
                        };
                    })
                );
                setCart(productsWithDetails);
            } catch (error) {
                setError(true);
            } finally {
                setLoading(false);
            }
        };
        getCart();
    }, []);

    if (loading) {
        return <div className={styles.error_loading}>LOADING</div>;
    }

    if (error) {
        return (
            <div className={styles.error_loading}>
                Something went wrong
            </div>
        );
    }

    const increaseQty = (id) => {
        setCart((prev) =>
            prev.map((item) =>
                item.id === id
                    ? { ...item, quantity: Math.min(item.quantity + 1, 10) }
                    : item
            )
        );
    };

    const decreaseQty = (id) => {
        setCart((prev) =>
            prev.map((item) =>
                item.id === id
                    ? { ...item, quantity: Math.max(item.quantity - 1, 1) }
                    : item
            )
        );
    };

    const deleteItem = (id) => {
        setCart((prev) => prev.filter((item) => item.id !== id));
    };

    const total = cart.reduce((sum, item) => {
        return sum + item.price * item.quantity;
    }, 0);

    return (
        <div className={styles.div_layout}>
            <div className={styles.cart_wrapper}>
                <h1 className={styles.cart_h1}>Shoping cart</h1>
                <div className={styles.cart_layout}>
                    <div className={styles.div_cart}>
                        {cart.map((item) => (
                            <div className={styles.div_cart_sum} key={item.id}>
                                <div className={styles.div_product}>
                                    <img src={item.image} alt={item.title} width={50} />
                                    <h3 className={styles.cart_h3}>{item.title}</h3>
                                </div>
                                <div className={styles.div_quan}>
                                    <button className={styles.cart_button} onClick={() => increaseQty(item.id)}>+</button>
                                    <p>{item.quantity}</p>
                                    <button className={styles.cart_button} onClick={() => decreaseQty(item.id)}>-</button>
                                </div>
                                <div className={styles.div_price}>
                                    <p>{(item.price * item.quantity).toFixed(2)} $</p>
                                    <button className={styles.cart_button} onClick={() => deleteItem(item.id)}>DELETE</button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className={styles.div_sum}>
                        <div className={styles.div_total}>
                            <h4>Total</h4>
                            <p>{total.toFixed(2)} $</p>
                        </div>
                        <div className={styles.div_buy}>
                            BUY
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;