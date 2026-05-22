"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import styles from "./page.module.css";

const loginSchema = yup.object({
    username: yup
        .string()
        .required("Username is required"),

    password: yup
        .string()
        .required("Password is required"),
});

function Page() {
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(loginSchema),
        defaultValues: {
            username: "johnd",
            password: "m38rmF$",
        },
    });

    const [passwordVisible, setPasswordVisible] = useState(false);
    const [submitError, setSubmitError] = useState("");
    const [rememberMe, setRememberMe] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            router.push("/");
        }
    }, []);

    const handleLogin = async (data) => {
        setSubmitError("");

        try {
            const response = await fetch(
                "https://fakestoreapi.com/auth/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                }
            );

            if (!response.ok) {
                setSubmitError("Invalid username or password");
                return;
            }

            const result = await response.json();

            console.log("Login successful:", result);

            if (rememberMe) {
                localStorage.setItem("token", result.token);
            }

            router.push("/");
        } catch (error) {
            console.error("Login error:", error);
            setSubmitError("Something went wrong");
        }
    };

    return (
        <div className={styles.main}>
            <form
                className={styles.container}
                onSubmit={handleSubmit(handleLogin)}
            >
                <h3 className={styles.signin}>Sign In</h3>

                <div className={styles.div_inputs}>
                    <input
                        placeholder="Username"
                        {...register("username")}
                        className={styles.input}
                    />

                    {errors.username && (
                        <p className={styles.error}>
                            {errors.username.message}
                        </p>
                    )}

                    <input
                        placeholder="Password"
                        type={passwordVisible ? "text" : "password"}
                        {...register("password")}
                        className={styles.input}
                    />

                    {errors.password && (
                        <p className={styles.error}>
                            {errors.password.message}
                        </p>
                    )}
                </div>

                {submitError && (
                    <div className={styles.error}>
                        {submitError}
                    </div>
                )}

                <div className={styles.div_login_options}>
                    <div className={styles.rememberMe}>
                        <input
                            className={styles.checkbox}
                            type="checkbox"
                            checked={rememberMe}
                            onChange={(event) =>
                                setRememberMe(event.target.checked)
                            }
                        />

                        <label htmlFor="rememberMe">
                            Remember me
                        </label>
                    </div>

                    <button
                        className={styles.seePassword}
                        type="button"
                        onClick={() =>
                            setPasswordVisible(!passwordVisible)
                        }
                    >
                        {passwordVisible
                            ? "Hide password"
                            : "See password"}
                    </button>
                </div>

                <button
                    type="submit"
                    className={styles.button}
                >
                    Log In
                </button>
            </form>
        </div>
    );
}

export default Page;