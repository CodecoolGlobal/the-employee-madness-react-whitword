import './FilterInputField.css';


const FilterInputField = ({ originalEmployees, setEmployees }) => {

    let positions = [];
    originalEmployees.map(i => (positions.push(i.position)));
    const positionsWithNoDuplicates = positions.reduce((accumulator, currentValue) => {
        if (!accumulator.includes(currentValue)) {
            return [...accumulator, currentValue];
        }
        return accumulator;
    }, []);

    let levels = [];
    originalEmployees.map(i => (levels.push(i.level)));
    const levelsWithNoDuplicates = levels.reduce((accumulator, currentValue) => {
        if (!accumulator.includes(currentValue)) {
            return [...accumulator, currentValue];
        }
        return accumulator;
    }, []);


    const handleFilterPosition = (value) => {
        const filteredEmployees = originalEmployees.filter(i=> i.position === value)
        value === "all" ? setEmployees(originalEmployees) : setEmployees(filteredEmployees)
    }
    const handleFilterLevel = (value) => {
        const filteredEmployees = originalEmployees.filter(i=> i.level === value)
        value === "all" ? setEmployees(originalEmployees) : setEmployees(filteredEmployees)

    }
    return (

        <div className={"FilterInputField"}>
            <div className={"filterTitle"}>Filter by Level
                <select onChange={(e) => handleFilterLevel(e.target.value)}>
                    <option key={"a1"} value={"all"}>All</option>
                    {levelsWithNoDuplicates.map(i => <option key={i} value={i}>{i}</option>)}
                </select>
                </div>
            <div className={"filterTitle"}>Filter by Position
                <select onChange={(e) => handleFilterPosition(e.target.value)}>
                    <option key={"a1"}value={"all"}>All</option>
                    {positionsWithNoDuplicates.map(i => <option key={i} value={i}>{i}</option>)}
                </select>
                </div>
        </div>

    )
}
export default FilterInputField