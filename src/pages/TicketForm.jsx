import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useAuth } from "../context/AuthContext";

const TicketForm = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "Low",
    category: "Technical Issue",
    status: "Open",
    contactEmail: user?.email || "",
    phone: "",
    dueDate: "",
    urgency: "Normal",
    issueType: "Bug",
    additionalNotes: "",
    termsAccepted: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, "tickets"), {
      ...formData,
      createdBy: user?.email,
      assignedTo: "",
    });
    setFormData({
      title: "",
      description: "",
      priority: "Low",
      category: "Technical Issue",
      status: "Open",
      contactEmail: user?.email || "",
      phone: "",
      dueDate: "",
      urgency: "Normal",
      issueType: "Bug",
      additionalNotes: "",
      termsAccepted: false,
    });
  };

  return (
    <div className= "ml-72 bg-white p-6 rounded-lg shadow-lg w-2/3">
      <h2 className="text-2xl font-bold mb-4">Submit a Ticket</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChange} className="border p-2 w-full rounded" required />

        <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} className="border p-2 w-full rounded" required />

        <select name="priority" value={formData.priority} onChange={handleChange} className="border p-2 w-full rounded">
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>

        <select name="category" value={formData.category} onChange={handleChange} className="border p-2 w-full rounded">
          <option>Technical Issue</option>
          <option>Billing</option>
          <option>Account Support</option>
          <option>Other</option>
        </select>

        <input type="email" name="contactEmail" placeholder="Contact Email" value={formData.contactEmail} onChange={handleChange} className="border p-2 w-full rounded" required />

        <input type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} className="border p-2 w-full rounded" />

        <input type="date" name="dueDate" value={formData.dueDate} onChange={handleChange} className="border p-2 w-full rounded" />

        <div className="flex items-center gap-4">
          <label className="font-bold">Urgency:</label>
          <label><input type="radio" name="urgency" value="Normal" checked={formData.urgency === "Normal"} onChange={handleChange} /> Normal</label>
          <label><input type="radio" name="urgency" value="Urgent" checked={formData.urgency === "Urgent"} onChange={handleChange} /> Urgent</label>
        </div>

        <div className="flex items-center gap-4">
          <label className="font-bold">Issue Type:</label>
          <label><input type="radio" name="issueType" value="Bug" checked={formData.issueType === "Bug"} onChange={handleChange} /> Bug</label>
          <label><input type="radio" name="issueType" value="Feature Request" checked={formData.issueType === "Feature Request"} onChange={handleChange} /> Feature Request</label>
          <label><input type="radio" name="issueType" value="Other" checked={formData.issueType === "Other"} onChange={handleChange} /> Other</label>
        </div>

        <textarea name="additionalNotes" placeholder="Additional Notes (Optional)" value={formData.additionalNotes} onChange={handleChange} className="border p-2 w-full rounded" />

        <div className="flex items-center">
          <input type="checkbox" name="termsAccepted" checked={formData.termsAccepted} onChange={handleChange} className="mr-2" required />
          <label>I agree to the terms and conditions</label>
        </div>

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Submit Ticket</button>
      </form>
    </div>
  );
};

export default TicketForm;
