import { Link } from "react-router-dom";
import "./EmployeeTable.css";
import FilterInputField from "../FilterInputField";

const EmployeeTable = ({ data, onDelete, setData }) => {
    let employees = data;
    return(
  <div className="EmployeeTable">
    <table>
        <FilterInputField employees={data} setEmployees={setData}/>
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
