import { useEffect, useState } from "react";
import { getEmployees, deleteEmployee } from "../api/employeeApi";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import { toast } from "react-toastify";

const ITEMS_PER_PAGE = 5;

export default function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("asc");

  const navigate = useNavigate();

  const loadEmployees = async () => {
    try {
      setLoading(true);
      const res = await getEmployees();
      setEmployees(res.data);
    } catch {
      toast.error("Failed to load employees");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete employee?")) return;

    try {
      setLoading(true);
      await deleteEmployee(id);
      toast.success("Employee deleted");
      loadEmployees();
    } catch {
      toast.error("Delete failed");
    } finally {
      setLoading(false);
    }
  };

  /* 🔍 SEARCH */
  const filtered = employees.filter(emp =>
    `${emp.firstName} ${emp.lastName} ${emp.email}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  /* 🔃 SORT */
  const sorted = [...filtered].sort((a, b) =>
    sortOrder === "asc"
      ? a.firstName.localeCompare(b.firstName)
      : b.firstName.localeCompare(a.firstName)
  );

  /* 📄 PAGINATION */
  const totalPages = Math.ceil(sorted.length / ITEMS_PER_PAGE);
  const start = (page - 1) * ITEMS_PER_PAGE;
  const paginated = sorted.slice(start, start + ITEMS_PER_PAGE);

  return (
    <div className="container">
      {loading && <Loader />}

      <div className="header">
        <h1>Employees</h1>
        <button className="btn primary" onClick={() => navigate("/add")}>
          + Add Employee
        </button>
      </div>

      {/* SEARCH + SORT */}
      <div className="toolbar">
        <input
          className="search-input"
          placeholder="Search..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />

        <select
          className="sort-select"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="asc">Name A–Z</option>
          <option value="desc">Name Z–A</option>
        </select>
      </div>

      {/* TABLE */}
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginated.map(emp => (
              <tr key={emp.id}>
                <td>{emp.firstName} {emp.lastName}</td>
                <td>{emp.email}</td>
                <td className="actions">
                  <button
                    className="btn primary"
                    onClick={() => navigate(`/edit/${emp.id}`)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn danger"
                    onClick={() => handleDelete(emp.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      <div className="pagination">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Prev
        </button>

        <span>{page} / {totalPages}</span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
