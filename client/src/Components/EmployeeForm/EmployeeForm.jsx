import { useEffect, useState } from "react";


const EmployeeForm = ({ onSave, disabled, employee, onCancel }) => {

  const [divisions, setDivisions] = useState();

  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const entries = [...formData.entries()];

    const employee = entries.reduce((acc, entry) => {
      const [k, v] = entry;
      acc[k] = v;
      return acc;
    }, {});

    return onSave(employee);
  };

useEffect(() => {
  fetch("/divisions")
  .then((res) => res.json())
  .then((res) => setDivisions(res))
  return () => {
  };

}, []);

  return (
    <form className="EmployeeForm" onSubmit={onSubmit}>
      {employee && (
        <input type="hidden" name="_id" defaultValue={employee._id} />
      )}

      <div className="control">
        <label htmlFor="name">Name:</label>
        <input
          defaultValue={employee ? employee.name : null}
          name="name"
          id="name"
        />
      </div>

      <div className="control">
        <label htmlFor="level">Level:</label>
        <input
          defaultValue={employee ? employee.level : null}
          name="level"
          id="level"
        />
      </div>

      <div className="control">
        <label htmlFor="position">Position:</label>
        <input
          defaultValue={employee ? employee.position : null}
          name="position"
          id="position"
        />
      </div>

      <div className="control">
        <label htmlFor="current_salary">Current salary:</label>
        <input
          defaultValue={employee ? employee.current_salary : null}
          name="current_salary"
          id="current_salary"
        />
      </div>

      <div className="control">
        <label htmlFor="desired_salary">Desired salary:</label>
        <input
          defaultValue={employee ? employee.desired_salary : null}
          name="desired_salary"
          id="desired_salary"
        />
      </div>

      <div className="control">
        <label htmlFor="fav_color">Favourite color:</label>
        <input
          defaultValue={employee ? employee.fav_color : null}
          name="fav_color"
          id="fav_color"
        />
      </div>

      <div className="control">
        <label htmlFor="division">Choose a division</label>
        <select
        id="division"
        name="division">
          <option >Select division</option>
        {divisions && divisions.map(division=>
          <option 
          key={division._id} 
          defaultValue={employee && employee.division ? employee.division : null}
          value={division._id}
           >{division.name}</option>)}
        </select>
      </div>

      <div className="buttons">
        <button type="submit" disabled={disabled}>
          {employee ? "Update Employee" : "Create Employee"}
        </button>

        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EmployeeForm;
