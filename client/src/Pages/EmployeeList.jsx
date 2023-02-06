import { useEffect, useState } from "react";
import Loading from "../Components/Loading";
import EmployeeTable from "../Components/EmployeeTable";

const fetchEmployees = (signal) => {
  return fetch("/api/employees", { signal }).then((res) => res.json());
};

const deleteEmployee = (id) => {
  return fetch(`/api/employees/${id}`, { method: "DELETE" }).then((res) =>
    res.json()
  );
};

const EmployeeList = ({path}) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [divisions, setDivisions] = useState();

  const handleDelete = (id) => {
    deleteEmployee(id).catch((err) => {
      console.log(err);
    });

    setData((employees) => {
      return employees.filter((employee) => employee._id !== id);
    });
  };

  useEffect(() => {
    const controller = new AbortController();

    fetchEmployees(controller.signal)
      .then((employees) => {
        setLoading(false);
        setData(employees);
      })
      .catch((error) => {
        if (error.name !== "AbortError") {
          setData(null);
          throw error;
        }
      });

    return () => controller.abort();
  }, []);

  useEffect(() => {
    fetch("./divisions")
    .then((res)=>res.json())
    .then((res)=> setDivisions(res))
    // return () => {
    // };
  }, []);
  if (loading) {
    return <Loading />;
  }

  let filteredEmployees = data;
  if (path==="/top-paid"){
    filteredEmployees = ([...data].sort((a, b) => b.current_salary-a.current_salary)).splice(0,3)
  }
  return (
        <EmployeeTable employees={filteredEmployees} onDelete={handleDelete} setEmployees={setData} divisions={divisions}/>
  )
};

export default EmployeeList;
