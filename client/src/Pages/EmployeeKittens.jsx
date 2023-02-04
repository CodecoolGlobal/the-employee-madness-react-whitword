import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";


const EmployeeKittens = () => {
    const { employeeId } = useParams();
    const [employee, setEmployee] = useState()
    const [kittens, setKittens] = useState([]);
    
    useEffect(() => {
        fetch(`/api/employees/${employeeId}`)
        .then((res) => res.json())
        .then((res) => setEmployee(res))
        return () => {
            
        };
    }, [employeeId, kittens]);
    const [kittenName, setKittenName] = useState();
    const [kittenWeight, setKittenWeight] = useState();

    const HandleInput = (value, input) => {
        if (input==="name") setKittenName(value)
        if (input==="weight") setKittenWeight(value)
    }

    const HandleSubmit = () => {
        const newKitty = {
            name: kittenName,
            weight: kittenWeight,
            employee: employeeId
        }
        setKittenName(''); 
        setKittenWeight('')
       const newKittens = [newKitty, ...employee.kittens]
        
            fetch(`/api/employees/${employeeId}`,
            {method: "PATCH", headers: {"Content-type": "application/json"}, 
            body: JSON.stringify({kittens: newKittens})})
           .then((res)=> res.json())
           .then((res) => setKittens(newKittens))

           fetch("/api/kittens", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newKitty),
            }).then((res) => res.json())
            .then((res)=> console.log(res))
    }

    return ( 
        <>
        {employee &&
        <div style={{width:500, fontSize:20, margin:"auto"}}>
        <h1>Kittens of {employee.name}</h1>
        {employee.kittens.map((kitten, index)=>
        <div style={{marginLeft: 100, padding: 10}} key={index} >name: {kitten.name} --- weight: {kitten.weight}kg</div>
        )}
        </div>
        }
        <form style={{width:500, fontSize:20, margin:"auto"}} onSubmit={(e)=>{e.preventDefault()}}>
            <h2>Add new kitten</h2>
            <input id="name" value={kittenName} placeholder={"Kitten name"} onChange={(e)=>{HandleInput(e.target.value, "name")}}></input>
            <input id="weight" value={kittenWeight} placeholder={"Kitten weight"} onChange={(e)=>{HandleInput(e.target.value, "weight")}}></input>
            <button style={{margin:"auto"}} onClick={HandleSubmit}>Save</button>
        </form>
        </>
     );
}
 
export default EmployeeKittens;