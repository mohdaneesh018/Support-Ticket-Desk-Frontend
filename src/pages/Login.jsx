import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axios";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const { data } = await API.post("/auth/login", {
                email,
                password,
            });

            login(data.token);

            toast.success("Login Successful");
            navigate("/dashboard");
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Login Failed"
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
                    Login
                </h2>

                <form
                    onSubmit={handleLogin}
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "15px",
                    }}
                >
                    <input
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={{
                            padding: "10px",
                            borderRadius: "8px",
                            border: "1px solid #cbd5e1",
                        }}
                    />

                    <input
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                        required
                        style={{
                            padding: "10px",
                            borderRadius: "8px",
                            border: "1px solid #cbd5e1",
                        }}
                    />

                    <button
                        type="submit"
                        style={{
                            padding: "10px",
                            borderRadius: "8px",
                            border: "none",
                            backgroundColor: "#2563eb",
                            color: "white",
                            fontWeight: "600",
                            cursor: "pointer",
                        }}
                    >
                        Login
                    </button>
                </form>

                <p
                    style={{
                        marginTop: "15px",
                        textAlign: "center",
                        fontSize: "14px",
                    }}
                >
                    Don't have an account?{" "}
                    <Link
                        to="/signup"
                        style={{
                            color: "#2563eb",
                            fontWeight: "500",
                            textDecoration: "none",
                        }}
                    >
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default Login;