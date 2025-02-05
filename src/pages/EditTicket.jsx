import { useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../firebase/firebase";

const EditTicket = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ticket, setTicket] = useState(null);
  const [status, setStatus] = useState("");
  const [assignedTo, setAssignedTo] = useState("");

  useEffect(() => {
    const fetchTicket = async () => {
      const docRef = doc(db, "tickets", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setTicket(docSnap.data());
        setStatus(docSnap.data().status);
        setAssignedTo(docSnap.data().assignedTo || "");
      }
    };
    fetchTicket();
  }, [id]);

  const handleUpdate = async () => {
    const docRef = doc(db, "tickets", id);
    await updateDoc(docRef, { status, assignedTo });
    navigate("/dashboard");
  };

  return ticket ? (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Edit Ticket</h1>
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option>Open</option>
        <option>In Progress</option>
        <option>Closed</option>
      </select>
      <input value={assignedTo} onChange={(e) => setAssignedTo(e.target.value)} />
      <button onClick={handleUpdate}>Save</button>
    </div>
  ) : (
    <p>Loading...</p>
  );
};

export default EditTicket;
