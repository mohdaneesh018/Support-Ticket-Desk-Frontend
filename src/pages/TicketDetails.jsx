import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axios";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";

function TicketDetails() {
    const { id } = useParams();
    const { user } = useAuth();

    const [ticket, setTicket] = useState(null);
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);
    const [assignId, setAssignId] = useState("");

    const fetchTicket = async () => {
        try {
            const { data } = await API.get(`/tickets/${id}`);
            setTicket(data);
        } catch {
            toast.error("Failed to load ticket");
        }
    };

    const fetchComments = async () => {
        try {
            const { data } = await API.get(`/tickets/${id}/comments`);
            setComments(data);
        } catch {
            toast.error("Failed to load comments");
        }
    };

    const updateStatus = async (status) => {
        try {
            await API.patch(`/tickets/${id}`, { status });
            toast.success("Status updated");
            fetchTicket();
        } catch (error) {
            toast.error(error.response?.data?.message);
        }
    };

    const assignTicket = async () => {
        try {
            await API.patch(`/tickets/${id}`, {
                assigned_to: assignId,
            });
            toast.success("Ticket assigned");
            setAssignId("");
            fetchTicket();
        } catch (error) {
            toast.error(error.response?.data?.message);
        }
    };

    const addComment = async () => {
        if (!comment.trim()) return;

        try {
            await API.post(`/tickets/${id}/comments`, {
                comment,
            });
            toast.success("Comment added");
            setComment("");
            fetchComments();
        } catch {
            toast.error("Failed to add comment");
        }
    };

    useEffect(() => {
        fetchTicket();
        fetchComments();
    }, [id]);

    if (!ticket) return <p style={{ padding: "20px" }}>Loading...</p>;

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
                        maxWidth: "900px",
                        margin: "auto",
                        background: "white",
                        padding: "30px",
                        borderRadius: "12px",
                        boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
                    }}
                >
                    <h2 style={{ marginBottom: "10px", color: "#1e293b" }}>
                        {ticket.title}
                    </h2>

                    <p style={{ color: "#475569", marginBottom: "20px" }}>
                        {ticket.description}
                    </p>

                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr",
                            gap: "15px",
                            marginBottom: "25px",
                        }}
                    >
                        <div>
                            <strong>Status:</strong>{" "}
                            <span
                                style={{
                                    padding: "4px 10px",
                                    borderRadius: "20px",
                                    backgroundColor: "#e0f2fe",
                                    color: "#0369a1",
                                    fontSize: "13px",
                                }}
                            >
                                {ticket.status}
                            </span>
                        </div>

                        <div>
                            <strong>Priority:</strong> {ticket.priority}
                        </div>

                        <div>
                            <strong>Category:</strong> {ticket.category}
                        </div>

                        <div>
                            <strong>Assigned To:</strong>{" "}
                            {ticket.assigned_to || "Not Assigned"}
                        </div>
                    </div>

                    {user?.role === "admin" && (
                        <div
                            style={{
                                backgroundColor: "#f8fafc",
                                padding: "20px",
                                borderRadius: "10px",
                                marginBottom: "25px",
                            }}
                        >
                            <h4 style={{ marginBottom: "10px" }}>
                                Update Status
                            </h4>

                            <div style={{ display: "flex", gap: "10px" }}>
                                {["In Progress", "Resolved", "Closed"].map(
                                    (status) => (
                                        <button
                                            key={status}
                                            onClick={() =>
                                                updateStatus(status)
                                            }
                                            style={{
                                                padding: "8px 14px",
                                                borderRadius: "8px",
                                                border: "none",
                                                backgroundColor:
                                                    "#2563eb",
                                                color: "white",
                                                cursor: "pointer",
                                            }}
                                        >
                                            {status}
                                        </button>
                                    )
                                )}
                            </div>

                            <hr style={{ margin: "20px 0" }} />

                            <h4 style={{ marginBottom: "10px" }}>
                                Assign Ticket
                            </h4>

                            <div style={{ display: "flex", gap: "10px" }}>
                                <input
                                    type="text"
                                    placeholder="Enter User ID"
                                    value={assignId}
                                    onChange={(e) =>
                                        setAssignId(e.target.value)
                                    }
                                    style={{
                                        flex: 1,
                                        padding: "8px",
                                        borderRadius: "8px",
                                        border: "1px solid #cbd5e1",
                                    }}
                                />
                                <button
                                    onClick={assignTicket}
                                    style={{
                                        padding: "8px 16px",
                                        borderRadius: "8px",
                                        border: "none",
                                        backgroundColor:
                                            "#16a34a",
                                        color: "white",
                                        cursor: "pointer",
                                    }}
                                >
                                    Assign
                                </button>
                            </div>
                        </div>
                    )}

                    <h3 style={{ marginBottom: "15px" }}>Comments:</h3>

                    {comments.length === 0 && (
                        <p style={{ color: "#64748b" }}>
                            No comments yet.
                        </p>
                    )}

                    {comments.map((c) => (
                        <div
                            key={c._id}
                            style={{
                                backgroundColor: "#f8fafc",
                                padding: "12px",
                                borderRadius: "8px",
                                marginBottom: "12px",
                            }}
                        >
                            <p style={{ marginBottom: "5px" }}>
                                {c.comment}
                            </p>
                            <small style={{ color: "#64748b" }}>
                                {c.created_by?.email || "User"} |{" "}
                                {new Date(
                                    c.createdAt
                                ).toLocaleString()}
                            </small>
                        </div>
                    ))}

                    <div style={{ marginTop: "20px" }}>
                        <textarea
                            value={comment}
                            onChange={(e) =>
                                setComment(e.target.value)
                            }
                            placeholder="Add comment..."
                            rows="3"
                            style={{
                                width: "100%",
                                padding: "10px",
                                borderRadius: "8px",
                                border: "1px solid #cbd5e1",
                                marginBottom: "10px",
                                resize: "none",
                            }}
                        />

                        <button
                            onClick={addComment}
                            style={{
                                padding: "10px 18px",
                                borderRadius: "8px",
                                border: "none",
                                backgroundColor: "#2563eb",
                                color: "white",
                                cursor: "pointer",
                            }}
                        >
                            Add Comment
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default TicketDetails;