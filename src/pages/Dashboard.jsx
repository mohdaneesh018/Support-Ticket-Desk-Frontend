import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import API from "../api/axios";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";

function Dashboard() {
    const [tickets, setTickets] = useState([]);
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("");
    const [loading, setLoading] = useState(false);
    const location = useLocation();

    const fetchTickets = async () => {
        try {
            setLoading(true);

            const { data } = await API.get("/tickets", {
                params: {
                    ...(search && { search }),
                    ...(status && { status }),
                },
            });

            setTickets(data);
        } catch {
            toast.error("Failed to fetch tickets");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTickets();
    }, [search, status, location]);

    return (
        <>
            <Navbar />

            <div
                style={{
                    minHeight: "100vh",
                    backgroundColor: "#f1f5f9",
                    padding: "30px",
                }}
            >
                <div
                    style={{
                        maxWidth: "1200px",
                        margin: "auto",
                        background: "white",
                        padding: "25px",
                        borderRadius: "12px",
                        boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
                    }}
                >
                    <h2
                        style={{
                            marginBottom: "20px",
                            fontWeight: "600",
                            color: "#1e293b",
                        }}
                    >
                        Ticket Dashboard
                    </h2>

                    <div
                        style={{
                            display: "flex",
                            gap: "15px",
                            marginBottom: "25px",
                            flexWrap: "wrap",
                        }}
                    >
                        <input
                            placeholder="Search by title"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            style={{
                                padding: "10px",
                                borderRadius: "8px",
                                border: "1px solid #cbd5e1",
                                width: "220px",
                            }}
                        />

                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            style={{
                                padding: "10px",
                                borderRadius: "8px",
                                border: "1px solid #cbd5e1",
                                width: "180px",
                            }}
                        >
                            <option value="">All Status</option>
                            <option>Open</option>
                            <option>In Progress</option>
                            <option>Resolved</option>
                            <option>Closed</option>
                        </select>

                        <button
                            onClick={fetchTickets}
                            style={{
                                padding: "10px 18px",
                                borderRadius: "8px",
                                border: "none",
                                backgroundColor: "#2563eb",
                                color: "white",
                                fontWeight: "500",
                                cursor: "pointer",
                            }}
                        >
                            Filter
                        </button>

                        <Link to="/create">
                            <button
                                style={{
                                    padding: "10px 18px",
                                    borderRadius: "8px",
                                    border: "none",
                                    backgroundColor: "#16a34a",
                                    color: "white",
                                    fontWeight: "500",
                                    cursor: "pointer",
                                }}
                            >
                                + Create Ticket
                            </button>
                        </Link>
                    </div>

                    {loading && (
                        <p style={{ color: "#64748b" }}>
                            Loading tickets...
                        </p>
                    )}

                    {!loading && tickets.length === 0 && (
                        <p style={{ color: "#64748b" }}>
                            No tickets found.
                        </p>
                    )}

                    {!loading && tickets.length > 0 && (
                        <div style={{ overflowX: "auto" }}>
                            <table
                                style={{
                                    width: "100%",
                                    borderCollapse: "collapse",
                                }}
                            >
                                <thead>
                                    <tr
                                        style={{
                                            backgroundColor: "#f8fafc",
                                            textAlign: "left",
                                        }}
                                    >
                                        {[
                                            "Title",
                                            "Status",
                                            "Priority",
                                            "Category",
                                            "Assigned To",
                                            "Action",
                                        ].map((head) => (
                                            <th
                                                key={head}
                                                style={{
                                                    padding: "12px",
                                                    borderBottom:
                                                        "1px solid #e2e8f0",
                                                }}
                                            >
                                                {head}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>

                                <tbody>
                                    {tickets.map((ticket) => (
                                        <tr
                                            key={ticket._id}
                                            style={{
                                                borderBottom:
                                                    "1px solid #f1f5f9",
                                            }}
                                        >
                                            <td style={{ padding: "12px" }}>
                                                {ticket.title}
                                            </td>

                                            <td style={{ padding: "12px" }}>
                                                <span
                                                    style={{
                                                        padding:
                                                            "5px 10px",
                                                        borderRadius:
                                                            "20px",
                                                        backgroundColor:
                                                            "#e0f2fe",
                                                        color: "#0369a1",
                                                        fontSize:
                                                            "13px",
                                                    }}
                                                >
                                                    {ticket.status}
                                                </span>
                                            </td>

                                            <td style={{ padding: "12px" }}>
                                                {ticket.priority}
                                            </td>

                                            <td style={{ padding: "12px" }}>
                                                {ticket.category}
                                            </td>

                                            <td style={{ padding: "12px" }}>
                                                {ticket.assigned_to ||
                                                    "Not Assigned"}
                                            </td>

                                            <td style={{ padding: "12px" }}>
                                                <Link
                                                    to={`/ticket/${ticket._id}`}
                                                    style={{
                                                        textDecoration:
                                                            "none",
                                                        color: "#2563eb",
                                                        fontWeight:
                                                            "500",
                                                    }}
                                                >
                                                    View
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default Dashboard;