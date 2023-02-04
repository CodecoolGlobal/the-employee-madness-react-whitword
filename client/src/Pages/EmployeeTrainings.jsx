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
}, []);

const trainingSchema = (training) => {
    return(
        {_id: training[0]._id, title: training[0].title, difficulty: training[0].difficulty}
    )
}
const HandleSelect = (value) => {
    const trainingDetails = trainings.filter(i=>i._id===value)
    const copyOfSelectedTrainings = [...selectedTrainings]
    setselectedTrainings([...copyOfSelectedTrainings, trainingSchema(trainingDetails)])
}
const HandleDeleteSelected = (value) => {
    let copyOfSelectedTrainings = [...selectedTrainings]
    copyOfSelectedTrainings = copyOfSelectedTrainings.filter(i=>i._id!==value)
    setselectedTrainings(copyOfSelectedTrainings) 
}
const HandleSubmit = () => {
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
        <div style={{width:400, fontSize:20, textAlign:"center", margin:"auto"}}>
        <h1>{employee.name}</h1>
        <h2>Completed trainings</h2>
        <ul>{employee.trainings.map((training, index)=>
            <li key={employee._id+index}>{training.title} - {training.difficulty}</li>
        )} 
        </ul>
        <h2>Available trainings</h2>
        <form onSubmit={(e)=>{e.preventDefault()}}>
        <select style={{margin:"auto", textAlign:"center", fontSize:18, width:300}} onChange={(e) => HandleSelect(e.target.value)}>
            <option key={"default"}>Select a training</option>
            {trainings.map((training)=>
                <option key={employee._id+training._id} value={training._id}>{training.title} - {training.difficulty}</option>
                )}
        </select>
        <h3>Selected trainings:</h3>
        <ul style={{margin:"auto", color:"green"}}>
        {selectedTrainings.map((training, index)=>
        <div key={"container"+index} style={{display:"flex", flexWrap:"wrap"}}>
        <li key={"select"+index}>{training.title} - {training.difficulty}</li>
        <button style={{padding:5, border:0}} key={"delete"+index} value={training._id} onClick={(e)=>HandleDeleteSelected(e.target.value)}>❌</button>
        </div>)}
        </ul>
        <button style={{margin:"auto"}} onClick={HandleSubmit}>Save</button>
        </form>
        </div>
        }
        </>
    );
}
 
export default EmployeeTrainings;