"use client";

import styles from "./page.module.css";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useAppDispatch } from "@/lib/hooks";
import { addToCart } from "@/lib/slices/cartSlice";

function Page() {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then(res => res.json())
      .then((result) => setProduct(result))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return(
      <div className={styles.error_loading}>Product is Loading</div>
    )
  }

  if (error) {
    return (
      <div className={styles.error_loading}>Something went wrong</div>
    )
  }

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  return (
    <div className={styles.div_layout}>
      <div className={styles.div_wrapper}>
        <div className={styles.div_products}>
          <h1 className={styles.product_title}>{product.title}</h1>
          <div className={styles.product_category}>{product.category}</div>
          <img className={styles.product_img} src={product.image} alt={product.title}/>
          <p>Price: {product.price} $</p>
          <p className={styles.product_des}>{product.description}</p>
          <button className={styles.button_add_to_cart} onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default Page;