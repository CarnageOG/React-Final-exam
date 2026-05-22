"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

function Page() {
    const router = useRouter();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [submitError, setSubmitError] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (username.length === 0) {
            return setSubmitError("Username is required");
        }

        if (password.length === 0) {
            return setSubmitError("Password is required");
        }

        try {
            const response = await fetch(
                "https://fakestoreapi.com/auth/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        username,
                        password,
                    }),
                }
            );

            const result = await response.json();

            if (result?.token) {
                router.push("/");
            } else {
                setSubmitError("Invalid username or password");
            }
        } catch (error) {
            setSubmitError("Error occurred during login");
        }
    };

    return (
        <div className={styles.main}>
            <form className={styles.container} onSubmit={handleSubmit}>
                <h3 className={styles.signin}>Sign In</h3>

                <div className={styles.div_inputs}>
                    <input
                        placeholder="Username"
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                        className={styles.input}
                    />

                    <input
                        placeholder="Password"
                        type={passwordVisible ? "text" : "password"}
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        className={styles.input}
                    />
                </div>

                {submitError.length > 0 ? (
                    <div className={styles.error}>{submitError}</div>
                ) : null}
                
                <div className={styles.div_login_options}>
                    <div className={styles.rememberMe}>
                        <input type="checkbox" id="rememberMe" />
                        <label htmlFor="rememberMe">Remember me</label>
                    </div>

                    <button
                        className={styles.seePassword}
                        type="button"
                        onClick={() =>setPasswordVisible(!passwordVisible)}
                    >
                        {passwordVisible ? "Hide password" : "See password"}
                    </button>
                </div>    

                <div className={styles.div_button}>
                    <button
                        type="submit"
                        className={styles.button}
                    >
                        Log In
                    </button>

                    <Link
                        href="/register"
                        className={styles.notRegistered}
                    >
                        Don't have an account? Register
                    </Link>
                </div>
            </form>
        </div>
    );
}

export default Page;