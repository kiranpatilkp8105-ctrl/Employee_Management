import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AddEmployee() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8084/api/employees", {
        firstName,
        lastName,
        email,
      });
      alert("Employee added successfully ✅");
      navigate("/"); // Redirect to Employee List
    } catch (error) {
      console.error(error);
      alert("Error adding employee ❌");
    }
  };

  return (
    <div style={{ textAlign: "center", paddingTop: "50px" }}>
      <h1>Add Employee</h1>
      <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
          style={{ padding: "8px", margin: "5px", borderRadius: "5px", width: "200px" }}
        />
        <br />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
          style={{ padding: "8px", margin: "5px", borderRadius: "5px", width: "200px" }}
        />
        <br />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ padding: "8px", margin: "5px", borderRadius: "5px", width: "200px" }}
        />
        <br />
        <button
          type="submit"
          style={{ padding: "8px 16px", marginTop: "10px", background: "#940952", color: "#fff", border: "none", borderRadius: "5px" }}
        >
          Save
        </button>
      </form>
    </div>
  );
}
