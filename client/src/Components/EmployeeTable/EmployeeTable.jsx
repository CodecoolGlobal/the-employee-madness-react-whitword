import { Link } from "react-router-dom";
import "./EmployeeTable.css";
import FilterInputField from "../EmployeeFilterInputField";
import ArrangeSelectors from "../EmployeeArrangeSelectors";
import { useState } from "react";
import ConfirmDeleteModal from "../../Pages/EmployeeConfirmDelete";

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

  const handleCheckBoxChange = (employee, value) => {
    employee.present = value
    setEmployees([...employees])

    return fetch(`/api/employees/${employee._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(employee),
    }).then((res) => res.json())
  }
  
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [id, setId] = useState(null)
  return (
    <>
    <div className="EmployeeTable">
      <div className={"FilterAndArrangeMenu"}>
        <ArrangeSelectors employees={employees} setEmployees={setEmployees} />
        <FilterInputField allLevels={allLevelsWithNoDuplicates} allPositions={allPositionsWithNoDuplicates} setLevel={setLevel} setPosition={setPosition} />
        <Link style={{color: "white", backgroundColor: "rgb(76, 117, 219)", padding: 20, borderRadius: 5}} to="/top-paid">Top-paid employees</Link>
        <Link style={{color: "white", backgroundColor: "rgb(76, 117, 219)", marginLeft: 310, padding: 20, borderRadius: 5}} to="/missing">Missing employees</Link>
      </div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Level</th>
            <th>Position</th>
            <th>Current salary</th>
            <th>Desired salary</th>
            <th>Difference(salary)</th>
            <th>Starting date</th>
            <th>Fav. color</th>
            <th>Present</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {employees.filter(e => level.includes(e.level) && position.includes(e.position)).map((employee, index) => (
            <tr key={employee._id}>
              <td>{employee.name}</td>
              <td>{employee.level}</td>
              <td>{employee.position}</td>
              <td>{employee.current_salary / 1000.0}k 🃏</td>
              <td>{employee.desired_salary / 1000.0}k 🃏</td>
              <td>{(employee.current_salary - employee.desired_salary) / 1000.0}k 🃏</td>
              <td>{employee.starting_date.slice(0, 10)}</td>
              <td style={{color: employee.fav_color}}>{employee.fav_color}</td>
              <td><input checked={employee.present} type={"checkbox"} onChange={(e) => handleCheckBoxChange(employee, e.target.checked)} ></input></td>
              <td>
                <Link to={`/update/${employee._id}`}>
                  <button type="button">Update</button>
                </Link>
                {/* <button type="button" onClick={() => {onDelete(employee._id); console.log(employee._id)}}>
                  Delete
                </button> */}
                <button type="button" onClick={(e)=> {setShowConfirmDelete(true); setId(employee._id)} }>
                  Delete 
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
          <ConfirmDeleteModal show={showConfirmDelete} setShow={setShowConfirmDelete} onDelete={onDelete} id={id}/>
    </div>
    
    </>
  );
}
export default EmployeeTable;
