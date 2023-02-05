import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";


const EmployeeEquipments = () => {
    const { employeeId } = useParams();

    const [employee, setEmployee] = useState()
    const [equipments, setEquipments] = useState([]);
    const [refresh, setRefresh] = useState(0);

    useEffect(() => {
        fetch(`/api/employees/${employeeId}`)
        .then((res) => res.json())
        .then((res) => setEmployee(res))
        return () => {
            
        };
    }, [employeeId, refresh]);

    const [equipmentName, setEquipmentName] = useState('');
    const [equipmentType, setEquipmentType] = useState('');
    const [equipmentId, setEquipmentId] = useState('');


    useEffect(() => {
        fetch("/api/equipments")
            .then((res) => res.json())
            .then((res) => setEquipments(res))
    }, []);
    
    const HandleSelect = (value) => {
        let equipmentDetails = equipments.filter(i=>i._id===value)
        console.log(equipmentDetails)
        setEquipmentId(value)
        setEquipmentName(equipmentDetails.name)
        setEquipmentType(equipmentDetails.type)
    }
    const HandleSubmit = () => {

        const newEquipment = {
            _id: equipmentId,
            name: equipmentName,
            type: equipmentType
        }
        const upDatedEmployee = {...employee}
        upDatedEmployee.equipments = [newEquipment, ...upDatedEmployee.equipments]
        
        fetch(`/api/employees/${employeeId}`,
         {method: "PATCH", headers: {"Content-type": "application/json"}, 
         body: JSON.stringify({equipments: upDatedEmployee.equipments})})
        .then((res)=> res.json())
        .then((res)=> console.log(res))

        let equipmentDetails = equipments.filter(i=>i._id===equipmentId)
        const updatedEquipmentRefs = [...equipmentDetails[0].employeeRefs, employeeId]

        fetch(`/api/equipments/${equipmentId}`,
        {method: "PATCH", headers: {"Content-type": "application/json"}, 
        body: JSON.stringify({employeeRefs: updatedEquipmentRefs})})
       .then((res)=> res.json())
       .then((res)=> console.log(res))
       .then((res)=> setRefresh(refresh+1))
    }

    return ( 
        <>
        <div>
        {employee &&
        <>
            <h1>Equipments assigned to {employee.name}</h1>
        <table>
            <thead>
                <tr>
                <th>Name</th>
                <th>Type</th>
                <th />
                </tr>
            </thead>
            <tbody>
                {employee.equipments.map((equipment) => equipments.filter((e)=>e._id===equipment).map((e,index)=>
                <tr key={index}>
                    <td>{e.name}</td>
                    <td>{e.type}</td>
                    <td>
                    </td>
                </tr>
                ))}
            </tbody>                                                                   
        </table>
        </>}
        <h2>Set equipments</h2>
        <form onSubmit={(e)=>{e.preventDefault()}}>
        <select style={{margin:"auto", textAlign:"center", fontSize:18, width:300}} onChange={(e) => HandleSelect(e.target.value)}>
            <option key={"default"}>Select equipment</option>
            {equipments.map((equipment)=>
                <option key={equipment._id+equipment._id} value={equipment._id}>{equipment.name} - {equipment.type}</option>
                )}
        </select>
        <button style={{margin:"auto"}} onClick={HandleSubmit}>Save</button>
        </form>

       </div>
        </>
     );
}
 
export default EmployeeEquipments;