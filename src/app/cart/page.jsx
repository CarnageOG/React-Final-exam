"use client";

import { useEffect } from "react";
import Image from "next/image";
import styles from "./page.module.css";
import { checkUser } from "@/helpers";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/lib/hooks";
import { addToCart } from "@/lib/slices/cartSlice";
import { decreaseQuantity } from "@/lib/slices/cartSlice";
import { deleteFromCart } from "@/lib/slices/cartSlice";
import { selectCartTotal } from "@/lib/slices/cartSlice";
import { useAppDispatch } from "@/lib/hooks";

const Page = () => {
    
    const { cartProducts, loading, error } = useAppSelector((state) => state.cart);
    console.log(cartProducts);
    const total = useAppSelector(selectCartTotal);
    const dispatch = useAppDispatch();
    const router = useRouter();

    useEffect(() => {
        const existsUser = checkUser();
        if (!existsUser) {
            router.push("/login");
        }
    }, [router]);

    const handleIncrease = (item) => {
        dispatch(addToCart(item));
    };

    const handleDecrease = (item) => {
        dispatch(decreaseQuantity(item));
    };

    const handleDelete = (item) => {
        dispatch(deleteFromCart(item));
    };

    if (loading) {
        return (
            <div className={styles.error_loading}>LOADING</div>
        );
    }

    if (error) {
        return (
            <div className={styles.error_loading}>Something went wrong</div>
        );
    }
    
    return (
         <div className={styles.div_layout}>
            <div className={styles.cart_wrapper}>
                <h1 className={styles.cart_h1}>Shoping cart</h1>
                <div className={styles.cart_layout}>
                    <div className={styles.div_cart}>
                        {cartProducts.map((item) => (
                            <div className={styles.div_cart_sum} key={item.id}>
                                <div className={styles.div_product}>
                                    <img src={item.image} alt={item.title} width={50} />
                                    <h3 className={styles.cart_h3}>{item.title}</h3>
                                </div>
                                <div className={styles.div_quan}>
                                    <button className={styles.cart_button} onClick={() => handleIncrease(item)}>
                                        <Image src="/plus.svg" alt="plus" width={20} height={20} />
                                    </button>
                                    <p>{item.quantity}</p>
                                    <button className={styles.cart_button} onClick={() => handleDecrease(item)}>
                                        <Image src="/minus.svg" alt="minus" width={20} height={20} />
                                    </button>
                                </div>
                                <div className={styles.div_price}>
                                    <p>{(item.price * item.quantity).toFixed(2)} $</p>
                                    <button className={styles.cart_button} onClick={() => handleDelete(item)}>
                                        <Image src="/bin.svg" alt="delete" width={20} height={20} />
                                    </button>
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