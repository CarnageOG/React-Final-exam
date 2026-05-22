"use client";
import styles from "./page.module.css";
import { useState, useEffect } from "react";
import {useRouter} from "next/navigation";

function page() {
    const router = useRouter();
    const [products, setProducts] = useState ([]);
    const [loading, setLoading] = useState (true);
    const [error, setError] = useState(false);

    useEffect(() => {
        try{
            fetch("https://fakestoreapi.com/products")
            .then((res) => res.json())
            .then((result) => setProducts(result));
        } catch (error){
            setError(true)
        } finally {
            setLoading(false);
        }
    }, []);

    if(loading) {
        return(
            <div className={styles.error_loading}>LOADING</div>
        )
    };

    if(error) {
        return(
            <div className={styles.error_loading}>Something went wrong</div>
        )
    };

    return (
        <div className={styles.div_layout}>
            <div className={styles.div_wrapper}>
                {products.map((product) => (
                    <div className={styles.div_products} key={product.id} onClick={() => router.push(`/products/details/${product.id}`)}>
                        <img className={styles.product_img} src={product.image} alt={product.title} />
                        <p className={styles.product_category}>{product.category}</p>
                        <h1 className={styles.product_title}>{product.title}</h1>
                        <p className={styles.product_des}>{product.description}</p>
                        <p>Price: {product.price} $</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default page;