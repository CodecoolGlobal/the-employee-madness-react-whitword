import { useState, useEffect } from "react";

const Divisions = () => {

    const [employees, setEmployees] = useState()
    const [divisions, setDivisions] = useState();
    
    useEffect(() => {
        fetch(`/divisions`)
        .then((res) => res.json())
        .then((res) => setDivisions(res))
        return () => {
            
        };
    }, []);

    useEffect(() => {
        fetch(`/api/employees/`)
        .then((res) => res.json())
        .then((res) => setEmployees(res))
        return () => {
            
        };
    }, []);

    const HandleDelete = (id) => {
         fetch(`/divisions/${id}`, { method: "DELETE" })
         .then((res)=> setDivisions([...divisions.filter(division=>division._id!==id)]))
        .catch((err) => console.log(err))

    } 

    return ( 
        <>
        {divisions && employees &&
        <div>
        <h1>Divisions</h1>
        <table>
            <thead>
                <tr>
                <th>Name</th>
                <th>Boss</th>
                <th>Budget</th>
                <th>Location</th>
                <th>Employees</th>
                <th />
                </tr>
            </thead>
            <tbody>
                {divisions.map((div) =>(
                <tr key={div._id}>
                    <td>{div.name}</td>
                    <td>{employees.filter((r)=>r._id===div.boss)[0].name}</td>
                    <td>{div.budget}</td>
                    <td>{div.location.city} -- {div.location.country}</td>
                    
                    <td >{div.employees.map((e)=>employees.filter((r)=>r._id===e)[0].name).join(', ')}</td>
                    <td><button type="button" onClick={() => {HandleDelete(div._id)}}>Delete</button></td>
                </tr>
                ))}
            </tbody>                                                                    
        </table>
        </div>
        }
        </>
     );
}
 
export default Divisions;