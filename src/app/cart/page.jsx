"use client";

import { useEffect } from "react";
import styles from "./page.module.css";
import { checkUser } from "@/helpers";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/lib/hooks";

const Page = () => {
    const cartProducts = useAppSelector((state) => state.cart.cartProducts);
    console.log(cartProducts);

    const router = useRouter();

    useEffect(() => {
        const existsUser = checkUser();
        if (!existsUser) {
            router.push("/login");
        }
    }, [router]);

    const total = cartProducts.reduce((sum, item) => {
        return sum + item.price * item.quantity;
    }, 0);
    
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
                                    <button className={styles.cart_button}>+</button>
                                    <p>{item.quantity}</p>
                                    <button className={styles.cart_button}>-</button>
                                </div>
                                <div className={styles.div_price}>
                                    <p>{(item.price * item.quantity).toFixed(2)} $</p>
                                    <button className={styles.cart_button}>DELETE</button>
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