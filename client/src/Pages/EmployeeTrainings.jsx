import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const EmployeeTrainings = () => {
   const { employeeId } = useParams();
   const [employee, setEmployee] = useState()
   const [trainings, setTrainings] = useState();
   const [selectedTrainings, setselectedTrainings] = useState([]);

   useEffect(() => {
    fetch(`/api/employees/${employeeId}`)
    .then((res) => res.json())
    .then((res) => setEmployee(res))
    return () => {
        
    };
}, [employeeId]);

useEffect(() => {
    fetch("/api/trainings")
        .then((res) => res.json())
        .then((res) => setTrainings(res))

    // return () => {
    // };
}, []);
const trainingSchema = (training) => {
    return(
        `title: ${training.title}, difficulty: ${training.difficulty}`
    )
}
const HandleSelect = (value) => {
    const copyOfSelectedTrainings = [...selectedTrainings]
    // setselectedTrainings([...copyOfSelectedTrainings, value])
    copyOfSelectedTrainings.push(value)
    setselectedTrainings(copyOfSelectedTrainings)

}
const HandleSubmit = async () => {
    console.log(selectedTrainings)
    const upDatedEmployee = {...employee}
    upDatedEmployee.trainings.push(...selectedTrainings);
    setEmployee(upDatedEmployee)
    console.log(upDatedEmployee.trainings);
    fetch(`/api/employees/${employeeId}`,
     {method: "PATCH", headers: {"Content-type": "application/json"}, 
     body: JSON.stringify({trainings: upDatedEmployee.trainings})})
    .then((res)=> res.json())
    .then((res)=> console.log(res))    
}

    return ( 
        <>
        {employee && trainings &&
        <div>
        <h1>{employee.name}</h1>
        <p>Completed trainings</p>
        <ul>{employee.trainings.map((training, index)=>
            <li key={employee._id+index}>{training}</li>
        )} 
        </ul>
        <form onSubmit={(e)=>{e.preventDefault(); HandleSubmit()}}>
        <select onChange={(e) => HandleSelect(e.target.value)}>
            {trainings.map((training, index)=>
                <option key={employee._id+index} value={trainingSchema(training)}>{training.title}</option>
                )}
        </select>
        <h2>Selected trainings to add:</h2>
        <ul style={{color:"green"}}>
        {selectedTrainings.map((training, index)=>
        <li key={training+index}>{training}</li>)}
        </ul>
        <button onClick={HandleSubmit}>Submit</button>
        </form>
        </div>
        }
        </>
    );
}
 
export default EmployeeTrainings;