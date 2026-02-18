import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";

function CreateTicket() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        title: "",
        description: "",
        category: "",
        priority: "Low",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.title || !form.description || !form.category) {
            return toast.error("All fields are required");
        }

        try {
            setLoading(true);

            await API.post("/tickets", form);

            toast.success("Ticket Created Successfully");

            navigate("/dashboard", { replace: true });

        } catch (error) {
            toast.error(
                error.response?.data?.message || "Failed to create ticket"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Navbar />

            <div
                style={{
                    minHeight: "100vh",
                    backgroundColor: "#f1f5f9",
                    padding: "40px 20px",
                }}
            >
                <div
                    style={{
                        maxWidth: "600px",
                        margin: "auto",
                        background: "white",
                        padding: "30px",
                        borderRadius: "12px",
                        boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
                    }}
                >
                    <h2
                        style={{
                            marginBottom: "25px",
                            color: "#1e293b",
                            fontWeight: "600",
                            textAlign: "center",
                        }}
                    >
                        Create New Ticket
                    </h2>

                    <form
                        onSubmit={handleSubmit}
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "18px",
                        }}
                    >
                        <input
                            name="title"
                            placeholder="Enter ticket title"
                            value={form.title}
                            onChange={handleChange}
                            style={{
                                padding: "12px",
                                borderRadius: "8px",
                                border: "1px solid #cbd5e1",
                                fontSize: "14px",
                            }}
                        />

                        <textarea
                            name="description"
                            placeholder="Enter Detailed Description"
                            value={form.description}
                            onChange={handleChange}
                            rows="4"
                            style={{
                                padding: "12px",
                                borderRadius: "8px",
                                border: "1px solid #cbd5e1",
                                fontSize: "14px",
                                resize: "none",
                            }}
                        />

                        <input
                            name="category"
                            placeholder="Enter category (Bug, Billing, Support...)"
                            value={form.category}
                            onChange={handleChange}
                            style={{
                                padding: "12px",
                                borderRadius: "8px",
                                border: "1px solid #cbd5e1",
                                fontSize: "14px",
                            }}
                        />

                        <select
                            name="priority"
                            value={form.priority}
                            onChange={handleChange}
                            style={{
                                padding: "12px",
                                borderRadius: "8px",
                                border: "1px solid #cbd5e1",
                                fontSize: "14px",
                            }}
                        >
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                        </select>

                        <button
                            type="submit"
                            disabled={loading}
                            style={{
                                padding: "12px",
                                borderRadius: "8px",
                                border: "none",
                                backgroundColor: loading
                                    ? "#94a3b8"
                                    : "#2563eb",
                                color: "white",
                                fontWeight: "600",
                                fontSize: "14px",
                                cursor: loading
                                    ? "not-allowed"
                                    : "pointer",
                                transition: "0.3s",
                            }}
                        >
                            {loading ? "Creating..." : "Create Ticket"}
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default CreateTicket;