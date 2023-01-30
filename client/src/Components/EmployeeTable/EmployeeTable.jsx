import { Link } from "react-router-dom";
import "./EmployeeTable.css";
import FilterInputField from "../EmployeeFilterInputField";
import ArrangeSelectors from "../EmployeeArrangeSelectors";
import { useState } from "react";


const EmployeeTable = ({ employees, onDelete, setEmployees }) => {
  let allPositions = [];
  employees.map(i => (allPositions.push(i.position)));
  const allPositionsWithNoDuplicates = allPositions.reduce((accumulator, currentValue) => {
    if (!accumulator.includes(currentValue)) {
      return [...accumulator, currentValue];
    }
    return accumulator;
  }, []);
  
  const [position, setPosition] = useState(allPositionsWithNoDuplicates);

  let allLevels = [];
  employees.map(i => (allLevels.push(i.level)));
  const allLevelsWithNoDuplicates = allLevels.reduce((accumulator, currentValue) => {
      if (!accumulator.includes(currentValue)) {
          return [...accumulator, currentValue];
      }
      return accumulator;
  }, []);

const [level, setLevel] = useState(allLevelsWithNoDuplicates);

  console.log("table run")
  return (
    <div className="EmployeeTable">
      <div className={"FilterAndArrangeMenu"}>
        <ArrangeSelectors employees={employees} setEmployees={setEmployees} />
        <FilterInputField allLevels={allLevelsWithNoDuplicates} allPositions={allPositionsWithNoDuplicates} setLevel={setLevel} setPosition={setPosition} />
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
          {employees.filter(e=> level.includes(e.level) && position.includes(e.position)).map((employee) => (
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
