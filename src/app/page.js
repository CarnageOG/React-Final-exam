"use client";

import styles from "./page.module.css";
import Link from "next/link";
import Image from "next/image";
import { useAppSelector } from "@/lib/hooks";

export default function Home() {
  const user = useAppSelector((state) => state.user);
  console.log(user);
  
  const { loading, error } = useAppSelector((state) => state.user);

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
    <div className={styles.page}>
      <div className={styles.links}>
        <Link href="/login" className={styles.card}>
          <h2>Login Page</h2>
          <Image
            className={styles.image}
            src="/login.png"
            alt="login"
            width={400}
            height={200}
          />
        </Link>

        <Link href="/products" className={styles.card}>
          <h2>Product Page</h2>
          <Image
            className={styles.image}
            src="/product.png"
            alt="products"
            width={400}
            height={200}
          />
        </Link>

        <Link href="/profile" className={styles.card}>
          <h2>Profile Page</h2>
          <Image
            className={styles.image}
            src="/profile.png"
            alt="profile"
            width={400}
            height={200}
          />
        </Link>

        <Link href="/cart" className={styles.card}>
          <h2>Cart Page</h2>
          <Image
            className={styles.image}
            src="/cart.png"
            alt="cart"
            width={400}
            height={200}
          />
        </Link>
      </div>
    </div>
  );
}