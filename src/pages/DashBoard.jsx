import { useEffect, useState } from "react";
import { collection, getDocs, query, where, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
    const [tickets, setTickets] = useState([]);
    const [viewTicket, setViewTicket] = useState(null);
    const [editTicket, setEditTicket] = useState(null);
    const { user } = useAuth();
    const isAgent = user?.email === "agent@support.com";

    useEffect(() => {
        const fetchTickets = async () => {
            let q = isAgent ? query(collection(db, "tickets")) : query(collection(db, "tickets"), where("createdBy", "==", user?.email));
            const querySnapshot = await getDocs(q);
            setTickets(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
        };
        fetchTickets();
    }, [user]);

    const handleDelete = async (ticketId) => {
        if (!isAgent) {
            await deleteDoc(doc(db, "tickets", ticketId));
            setTickets(tickets.filter((ticket) => ticket.id !== ticketId));
        }
    };

    const handleUpdate = async () => {
        if (editTicket) {
            const docRef = doc(db, "tickets", editTicket.id);
            await updateDoc(docRef, {
                title: editTicket.title,
                description: editTicket.description,
                priority: editTicket.priority,
                status: editTicket.status,
                assignedTo: editTicket.assignedTo || "",
            });
            setEditTicket(null);
        }
    };

    return (
        <div className="ml-64 p-6 relative">
            <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
            <table className="w-full border-collapse border border-gray-300">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="border p-2">Ticket ID</th>
                        <th className="border p-2">Title</th>
                        <th className="border p-2">Priority</th>
                        <th className="border p-2">Status</th>
                        <th className="border p-2">Created By</th>
                        <th className="border p-2">Assigned To</th>
                        <th className="border p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {tickets.map((ticket) => (
                        <tr key={ticket.id} className="hover:bg-gray-100">
                            <td className="border p-2">{ticket.id}</td>
                            <td className="border p-2">{ticket.title}</td>
                            <td className="border p-2">{ticket.priority}</td>
                            <td className="border p-2">{ticket.status}</td>
                            <td className="border p-2">{ticket.createdBy}</td>
                            <td className="border p-2">{ticket.assignedTo || "Unassigned"}</td>
                            <td className="border p-2 flex gap-2">
                                <button onClick={() => setViewTicket(ticket)} className="bg-blue-500 text-white px-3 py-1 rounded">View</button>
                                {isAgent && (
                                    <button onClick={() => setEditTicket(ticket)} className="bg-yellow-500 text-white px-3 py-1 rounded">Edit</button>
                                )}
                                {!isAgent && (
                                    <button onClick={() => handleDelete(ticket.id)} className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* View Modal */}
            {/* View Modal */}
            {viewTicket && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
                        <h2 className="text-2xl font-bold mb-4">{viewTicket.title}</h2>
                        <div className="space-y-2">
                            <p><strong>Description:</strong> {viewTicket.description}</p>
                            <p><strong>Priority:</strong> {viewTicket.priority}</p>
                            <p><strong>Category:</strong> {viewTicket.category}</p>
                            <p><strong>Status:</strong> {viewTicket.status}</p>
                            <p><strong>Created By:</strong> {viewTicket.createdBy}</p>
                            <p><strong>Assigned To:</strong> {viewTicket.assignedTo || "Unassigned"}</p>
                            <p><strong>Contact Email:</strong> {viewTicket.contactEmail}</p>
                            <p><strong>Phone:</strong> {viewTicket.phone}</p>
                            <p><strong>Due Date:</strong> {viewTicket.dueDate}</p>
                            <p><strong>Urgency Level:</strong> {viewTicket.urgency}</p>
                            <p><strong>Issue Type:</strong> {viewTicket.issueType}</p>
                            <p><strong>Additional Notes:</strong> {viewTicket.notes}</p>
                        </div>
                        <button onClick={() => setViewTicket(null)} className="mt-4 bg-gray-600 text-white px-4 py-2 rounded">Close</button>
                    </div>
                </div>
            )}


            {/* Edit Modal */}
            {editTicket && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
                    <div className="bg-white p-6 rounded shadow-lg w-1/3">
                        <h2 className="text-2xl font-bold mb-4">Edit Ticket</h2>
                        {/* <label className="block mb-2">Title</label>
            <input
              type="text"
              value={editTicket.title}
              onChange={(e) => setEditTicket({ ...editTicket, title: e.target.value })}
              className="border p-2 w-full rounded"
            />
            <label className="block mb-2 mt-2">Description</label>
            <textarea
              value={editTicket.description}
              onChange={(e) => setEditTicket({ ...editTicket, description: e.target.value })}
              className="border p-2 w-full rounded"
            />
            <label className="block mb-2 mt-2">Priority</label>
            <select
              value={editTicket.priority}
              onChange={(e) => setEditTicket({ ...editTicket, priority: e.target.value })}
              className="border p-2 w-full rounded"
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select> */}
                        <label className="block mb-2 mt-2">Status</label>
                        <select
                            value={editTicket.status}
                            onChange={(e) => setEditTicket({ ...editTicket, status: e.target.value })}
                            className="border p-2 w-full rounded"
                        >
                            <option>Open</option>
                            <option>In Progress</option>
                            <option>Closed</option>
                        </select>
                        <label className="block mb-2 mt-2">Assigned To</label>
                        <input
                            type="text"
                            value={editTicket.assignedTo || ""}
                            onChange={(e) => setEditTicket({ ...editTicket, assignedTo: e.target.value })}
                            className="border p-2 w-full rounded"
                        />
                        <div className="flex justify-end gap-2 mt-4">
                            <button onClick={handleUpdate} className="bg-green-500 text-white px-4 py-2 rounded">Save</button>
                            <button onClick={() => setEditTicket(null)} className="bg-gray-600 text-white px-4 py-2 rounded">Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
