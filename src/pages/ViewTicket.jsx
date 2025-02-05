import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";
import { db } from "../firebase/firebase";

const ViewTicket = () => {
  const { ticketId } = useParams(); // Corrected parameter name
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTicket = async () => {
      if (!ticketId) return;
      try {
        const docRef = doc(db, "tickets", ticketId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setTicket(docSnap.data());
        } else {
          console.error("Ticket not found");
        }
      } catch (error) {
        console.error("Error fetching ticket:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTicket();
  }, [ticketId]);

  if (loading) return <p className="p-6">Loading...</p>;

  if (!ticket) return <p className="p-6">Ticket not found</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">{ticket.title}</h1>
      <p><strong>Description:</strong> {ticket.description}</p>
      <p><strong>Priority:</strong> {ticket.priority}</p>
      <p><strong>Status:</strong> {ticket.status}</p>
      <p><strong>Created By:</strong> {ticket.createdBy}</p>
      <p><strong>Assigned To:</strong> {ticket.assignedTo || "Unassigned"}</p>
    </div>
  );
};

export default ViewTicket;
