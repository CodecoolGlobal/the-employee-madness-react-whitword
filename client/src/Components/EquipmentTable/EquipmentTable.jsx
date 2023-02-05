import { Link } from "react-router-dom";
import "./EquipmentTable.css";

const EquipmentTable = ({ equipments, onDelete, setEquipments }) => {
  return (
    <div className="EquipmentTable">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Amount</th>
            <th>Employees assigned</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {equipments.map((equipment) => (
            <tr key={equipment._id}>
              <td>{equipment.name}</td>
              <td>{equipment.type}</td>
              <td>{equipment.amount}</td>
              <td>{equipment.employeeRefs.map(employeeId=>
              <div>
                <Link to={`/employee/${employeeId}/equipments`}>
                Employee's equipments
                  </Link>
                </div>
              )}</td>
              <td>
                <Link to={`/equipments/update/${equipment._id}`}>
                  <button type="button">Update</button>
                </Link>
                <button type="button" onClick={() => onDelete(equipment._id)}>
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
export default EquipmentTable;
