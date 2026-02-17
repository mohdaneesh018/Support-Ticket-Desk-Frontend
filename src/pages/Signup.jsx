import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axios";
import toast from "react-hot-toast";

function Signup() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: "",
        password: "",
        role: "user",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await API.post("/auth/signup", form);
            toast.success("Account created successfully");
            navigate("/");
        } catch (err) {
            toast.error(
                err.response?.data?.message || "Signup failed"
            );
        }
    };

    return (
        <div
            style={{
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "linear-gradient(135deg, #1e293b, #0f172a)",
            }}
        >
            <div
                style={{
                    background: "white",
                    padding: "40px",
                    borderRadius: "12px",
                    width: "350px",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
                }}
            >
                <h2
                    style={{
                        textAlign: "center",
                        marginBottom: "25px",
                        color: "#1e293b",
                    }}
                >
                    Sign Up
                </h2>

                <form
                    onSubmit={handleSubmit}
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "15px",
                    }}
                >
                    <input
                        type="email"
                        placeholder="Enter email"
                        required
                        onChange={(e) =>
                            setForm({
                                ...form,
                                email: e.target.value,
                            })
                        }
                        style={{
                            padding: "10px",
                            borderRadius: "8px",
                            border: "1px solid #cbd5e1",
                        }}
                    />

                    <input
                        type="password"
                        placeholder="Enter password"
                        required
                        onChange={(e) =>
                            setForm({
                                ...form,
                                password: e.target.value,
                            })
                        }
                        style={{
                            padding: "10px",
                            borderRadius: "8px",
                            border: "1px solid #cbd5e1",
                        }}
                    />

                    <select
                        onChange={(e) =>
                            setForm({
                                ...form,
                                role: e.target.value,
                            })
                        }
                        style={{
                            padding: "10px",
                            borderRadius: "8px",
                            border: "1px solid #cbd5e1",
                        }}
                    >
                        <option value="user">
                            Register as User
                        </option>
                        <option value="admin">
                            Register as Admin
                        </option>
                    </select>

                    <button
                        type="submit"
                        style={{
                            padding: "10px",
                            borderRadius: "8px",
                            border: "none",
                            backgroundColor: "#16a34a",
                            color: "white",
                            fontWeight: "600",
                            cursor: "pointer",
                        }}
                    >
                        Create Account
                    </button>
                </form>

                <p
                    style={{
                        marginTop: "15px",
                        textAlign: "center",
                        fontSize: "14px",
                    }}
                >
                    Already have an account?{" "}
                    <Link
                        to="/"
                        style={{
                            color: "#2563eb",
                            fontWeight: "500",
                            textDecoration: "none",
                        }}
                    >
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default Signup;