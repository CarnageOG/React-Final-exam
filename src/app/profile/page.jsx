"use client";

import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { checkUser } from "@/helpers";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { updateUser, deleteUser } from "@/lib/slices/userSlice";

function Page() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);
  console.log(user);
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
        dispatch(updateUser(data));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [router, dispatch]);

  if (loading) {
    return (
      <div className={styles.error_loading}>LOADING</div>
    );
  }

  if (!user) {
    return (
      <div className={styles.user_not}>Profile Not Found</div>
    );
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
        <button className={styles.button_out} onClick={() => {dispatch(deleteUser()); router.push("/");}}>
          Log Out
        </button>
      </div>
    </div>
  );
}

export default Page;