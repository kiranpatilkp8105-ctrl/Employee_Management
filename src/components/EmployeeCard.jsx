import { useNavigate } from "react-router-dom";
import { deleteEmployee } from "../api/employeeApi";

export default function EmployeeCard({ employee, onDelete }) {
  const navigate = useNavigate();

  return (
    <div className="card">
      <h3>{employee.firstName} {employee.lastName}</h3>
      <p>{employee.email}</p>

      <div className="actions">
        <button
          className="btn primary"
          onClick={() => navigate(`/edit/${employee.id}`)}
        >
          Edit
        </button>

        <button
          className="btn danger"
          onClick={async () => {
            if (window.confirm("Delete this employee?")) {
              await deleteEmployee(employee.id);
              onDelete(employee.id);
            }
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
