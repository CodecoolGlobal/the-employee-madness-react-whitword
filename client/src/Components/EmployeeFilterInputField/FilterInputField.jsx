import './FilterInputField.css';


const FilterInputField = ({ allLevels, allPositions, setLevel, setPosition }) => {

    
    return (

        <div className={"FilterInputField"}>
            <div className={"filterTitle"}>Filter by Level
                <select onChange={(e) => setLevel(e.target.value)}>
                    <option key={"a1"} value={allLevels}>All</option>
                    {allLevels.map(i => <option key={i} value={i}>{i}</option>)}
                </select>
                </div>
            <div className={"filterTitle"}>Filter by Position
                <select onChange={(e) => setPosition(e.target.value)}>
                    <option key={"a1"}value={allPositions}>All</option>
                    {allPositions.map(i => <option key={i} value={i}>{i}</option>)}
                </select>
                </div>
        </div>

    )
}
export default FilterInputField