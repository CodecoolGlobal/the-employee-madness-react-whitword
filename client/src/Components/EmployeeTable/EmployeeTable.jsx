import { Link } from "react-router-dom";
import "./EmployeeTable.css";
import FilterInputField from "../FilterInputField";
import ArrangeSelectors from "../ArrangeSelectors/ArrangeSelectors";

const EmployeeTable = ({ employees, onDelete, setEmployees }) => {
  console.log("table run")
  return (
    <div className="EmployeeTable">
      <div className={"FilterAndArrangeMenu"}>
        <ArrangeSelectors employees={employees} setEmployees={setEmployees} />
        <FilterInputField employees={employees} setEmployees={setEmployees} />
      </div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Level</th>
            <th>Position</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee._id}>
              <td>{employee.name}</td>
              <td>{employee.level}</td>
              <td>{employee.position}</td>
              <td>
                <Link to={`/update/${employee._id}`}>
                  <button type="button">Update</button>
                </Link>
                <button type="button" onClick={() => onDelete(employee._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

  );
}
export default EmployeeTable;
