import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const EmployeeNotes = () => {
    const { employeeId } = useParams();
    const [employee, setEmployee] = useState()

useEffect(() => {
    fetch(`/api/employees/${employeeId}`)
    .then((res) => res.json())
    .then((res) => setEmployee(res))
    return () => {
        
    };
}, [employeeId]);
const [newNote, setNewNote] = useState()
const HandleUpdateNotes = (value) => {
    setNewNote(value);
    console.log(value);
}
const HandleSubmit = () => {
    console.log(newNote)
    const upDatedEmployee = {...employee}
    console.log(upDatedEmployee);
    upDatedEmployee.notes.push(newNote);
    setEmployee(upDatedEmployee)

    fetch(`/api/employees/${employeeId}`,
     {method: "PATCH", headers: {"Content-type": "application/json"}, 
     body: JSON.stringify({notes: upDatedEmployee.notes})})
    .then((res)=> res.json())
    .then((res)=> console.log(res))
}
    return ( 
        <>
        { employee && 
        <div>
            <h1>{employee.name}</h1>
            <ul>
            {employee.notes.map((note, index)=>
            <li key={employee._id+index}>{note}</li>)}
            </ul>
            <input placeholder={"Update notes"} onChange={(e) => HandleUpdateNotes(e.target.value)}></input>
            <button onClick={HandleSubmit}>Submit</button>
        </div> }
        </>
     );
}
 
export default EmployeeNotes;