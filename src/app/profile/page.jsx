"use client";

import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { checkUser } from "@/helpers";

function Page() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const existsUser = checkUser();
    if (!existsUser) {
      router.push("/login");
      return;
    }

    const fetchUser = async () => {
      try {
        const res = await fetch("https://fakestoreapi.com/users/1");
        const data = await res.json();
        setUser(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [router]);

  if (loading) {
    return (
      <div className={styles.error_loading}>LOADING</div>
    );
  }

  if (!user) {
    return <div className={styles.user_not}>Profile Not Found</div>;
  }

  return (
    <div className={styles.div_layout}>
      <div className={styles.div_wrapper}>
        <div className={styles.div_profile}>
          <h2>{user.name.firstname} {user.name.lastname}</h2>
          <p>Email: {user.email}</p>
          <p>Username: {user.username}</p>
          <p>Phone: {user.phone}</p>
        </div>
        <div className={styles.div_profile}>
          <h2>Address</h2>
          <p>City: {user.address.city}</p>
          <p>Street: {user.address.street} {user.address.number}</p>
          <p>Zipcode: {user.address.zipcode}</p>
        </div>
        <button className={styles.button_out}>Log Out</button>
      </div>
    </div>
  );
}

export default Page;