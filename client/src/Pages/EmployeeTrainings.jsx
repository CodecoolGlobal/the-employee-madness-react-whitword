import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const EmployeeTrainings = () => {
   const { employeeId } = useParams();
   const [employee, setEmployee] = useState()
   const [trainings, setTrainings] = useState([]);
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
        {title: training[0].title, difficulty: training[0].difficulty}
    )
}
const HandleSelect = (value) => {
    const trainingDetails = trainings.filter(i=>i._id===value)
    const copyOfSelectedTrainings = [...selectedTrainings]
    setselectedTrainings([...copyOfSelectedTrainings, trainingSchema(trainingDetails)])
}
const HandleSubmit = async () => {
    console.log("selectedTrainings", selectedTrainings);
    const upDatedEmployee = {...employee}
    upDatedEmployee.trainings = [...upDatedEmployee.trainings, ...selectedTrainings]
    setEmployee(upDatedEmployee)
    fetch(`/api/employees/${employeeId}`,
     {method: "PATCH", headers: {"Content-type": "application/json"}, 
     body: JSON.stringify({trainings: upDatedEmployee.trainings})})
    .then((res)=> res.json())
    .then((res)=> console.log(res))
    .then((res)=>setselectedTrainings([]))   
}

    return ( 
        <>
        {employee && trainings &&
        <div style={{width:500, fontSize:20, textAlign:"center", margin:"auto"}}>
        <h1>{employee.name}</h1>
        <h2>Completed trainings</h2>
        <ul>{employee.trainings.map((training, index)=>
            <li key={employee._id+index}>{training.title} - {training.difficulty}</li>
        )} 
        </ul>
        <h2>Available trainings</h2>
        <form onSubmit={(e)=>{e.preventDefault(); HandleSubmit()}}>
        <select style={{margin:"auto", textAlign:"center", width:300}} onChange={(e) => HandleSelect(e.target.value)}>
            <option key={"default"}>Select a training</option>
            {trainings.map((training)=>
                <option key={employee._id+training._id} value={training._id}>{training.title} - {training.difficulty}</option>
                )}
        </select>
        <h3>Selected trainings:</h3>
        <ul style={{color:"green"}}>
        {selectedTrainings.map((training, index)=>
        <li key={training+index}>{training.title} - {training.difficulty}</li>)}
        </ul>
        <button style={{margin:"auto"}} onClick={HandleSubmit}>Save</button>
        </form>
        </div>
        }
        </>
    );
}
 
export default EmployeeTrainings;