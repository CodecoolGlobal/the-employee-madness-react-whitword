import './FilterInputField.css';


const FilterInputField = ({ employees, setEmployees }) => {

    let positions = [];
    employees.map(i => (positions.push(i.position)));
    const positionsWithNoDuplicates = positions.reduce((accumulator, currentValue) => {
        if (!accumulator.includes(currentValue)) {
            return [...accumulator, currentValue];
        }
        return accumulator;
    }, []);

    let levels = [];
    employees.map(i => (levels.push(i.level)));
    const levelsWithNoDuplicates = levels.reduce((accumulator, currentValue) => {
        if (!accumulator.includes(currentValue)) {
            return [...accumulator, currentValue];
        }
        return accumulator;
    }, []);


    const handleFilterPosition = (value) => {
        const filteredEmployees = employees.filter(i=> i.position === value)
        setEmployees(filteredEmployees)
    }
    const handleFilterLevel = (value) => {
        const filteredEmployees = employees.filter(i=> i.level === value)
        setEmployees(filteredEmployees)
    }
    return (

        <div className={"FilterInputField"}>
            {/* <div className={"filterTitle"}>Filter by Level */}
                <select onChange={(e) => handleFilterLevel(e.target.value)}>
                    <option value={levelsWithNoDuplicates}>All</option>
                    {levelsWithNoDuplicates.map(i => <option value={i}>{i}</option>)}
                </select>
                {/* </div> */}
            {/* <div className={"filterTitle"}>Filter by Position */}
                <select onChange={(e) => handleFilterPosition(e.target.value)}>
                    <option value={positionsWithNoDuplicates}>All</option>
                    {positionsWithNoDuplicates.map(i => <option value={i}>{i}</option>)}
                </select>
                {/* </div> */}
        </div>

    )
}
export default FilterInputField