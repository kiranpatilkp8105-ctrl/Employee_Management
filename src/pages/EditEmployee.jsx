import { useEffect, useState } from "react";
import { getEmployeeById, updateEmployee } from "../api/employeeApi";
import { useNavigate, useParams } from "react-router-dom";

export default function EditEmployee() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: ""
  });

  useEffect(() => {
    getEmployeeById(id).then(res => setForm(res.data));
  }, [id]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateEmployee(id, form);
    navigate("/");
  };

  return (
    <div className="container small">
      <h1>Edit Employee</h1>

      <form className="form" onSubmit={handleSubmit}>
        <input name="firstName" value={form.firstName} onChange={handleChange} />
        <input name="lastName" value={form.lastName} onChange={handleChange} />
        <input name="email" value={form.email} onChange={handleChange} />

        <button className="btn primary">Update</button>
      </form>
    </div>
  );
}
