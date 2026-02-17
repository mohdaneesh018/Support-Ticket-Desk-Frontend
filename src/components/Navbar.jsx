import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Navbar() {
    const { logout, user } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        toast((t) => (
            <div style={{ padding: "5px 10px" }}>
                <p style={{ marginBottom: "10px" }}>
                    Are you sure you want to logout?
                </p>

                <div
                    style={{
                        display: "flex",
                        gap: "12px",
                        justifyContent: "center",
                        marginTop: "10px"
                    }}
                >
                    <button
                        onClick={() => {
                            toast.dismiss(t.id);
                            logout();
                            navigate("/");
                        }}
                        style={{
                            backgroundColor: "#ef4444",
                            color: "white",
                            border: "none",
                            padding: "6px 12px",
                            borderRadius: "6px",
                            cursor: "pointer",
                        }}
                    >
                        Yes
                    </button>

                    <button
                        onClick={() => toast.dismiss(t.id)}
                        style={{
                            backgroundColor: "#e5e7eb",
                            border: "none",
                            padding: "6px 12px",
                            borderRadius: "6px",
                            cursor: "pointer",
                        }}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        ), { duration: 5000 });
    };

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "16px 30px",
                background: "linear-gradient(90deg, #1e293b, #0f172a)",
                color: "white",
                boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
            }}
        >
            <div style={{ fontSize: "18px", fontWeight: "500" }}>
                Logged in as:
                <span
                    style={{
                        backgroundColor: "#3b82f6",
                        padding: "6px 14px",
                        borderRadius: "20px",
                        marginLeft: "10px",
                        fontSize: "14px",
                        fontWeight: "600",
                    }}
                >
                    {user?.role?.toUpperCase()}
                </span>
            </div>

            <button
                onClick={handleLogout}
                style={{
                    backgroundColor: "#ef4444",
                    border: "none",
                    padding: "8px 18px",
                    borderRadius: "8px",
                    color: "white",
                    fontWeight: "500",
                    cursor: "pointer",
                    transition: "0.3s",
                }}
                onMouseOver={(e) =>
                    (e.target.style.backgroundColor = "#dc2626")
                }
                onMouseOut={(e) =>
                    (e.target.style.backgroundColor = "#ef4444")
                }
            >
                Logout
            </button>
        </div>
    );
}

export default Navbar;