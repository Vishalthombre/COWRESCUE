import { useState, useEffect } from "react";
import CowRescueForm from "./CowRescueForm";
import CowRescueList from "./CowRescueList";

const CowRescueDashboard = () => {
  const [rescues, setRescues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchRescues();
  }, []);

  const fetchRescues = async () => {
    setError("");

    try {
      const response = await fetch("https://cowrescue.onrender.com/api/cows/rescues");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setRescues(data);
    } catch (error) {
      setError("Failed to load rescue data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleRescueSubmit = async (formData) => {
    try {
      const response = await fetch("https://cowrescue.onrender.com/api/cows/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit rescue request");
      }

      fetchRescues();
    } catch (error) {
      console.error("Error submitting request:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`https://cowrescue.onrender.com/api/cows/delete/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete rescue");
      }

      fetchRescues(); // Refresh list after delete
    } catch (error) {
      console.error("Error deleting rescue:", error);
    }
  };

  return (
    <div className="dashboard-container">
      {error && <p className="text-danger">{error}</p>}
      <CowRescueForm onSubmit={handleRescueSubmit} />
      {loading ? <p>Loading rescues...</p> : <CowRescueList rescues={rescues} onDelete={handleDelete} />}
    </div>
  );
};

export default CowRescueDashboard;
