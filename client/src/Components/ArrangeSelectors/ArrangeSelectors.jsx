import './ArrangeSelectors.css';


const ArrangeSelectors = ({ employees, setEmployees }) => {

    const HandleArrange = (input) => {
        let arrangedEmployees;
        arrangedEmployees = [...employees].sort(function (a, b) {
            let textA="";
            let textB="";
            if (input === ("first_name")) { (textA = a.name); (textB = b.name) }
            else if (input === ("middle_name")) { (textA = a.name.split(' ')[1]); (textB = b.name.split(' ')[1]) }
            else if (input === ("last_name")) { (textA = a.name.split(' ')[2] ? a.name.split(' ')[2] : a.name.split(' ')[1]); (textB = b.name.split(' ')[2] ? b.name.split(' ')[2] : b.name.split(' ')[1]) }
            else {
            textA = a[input];
            textB = b[input];
            }
            return ((textA < textB) ? -1 : (textA > textB) ? 1 : 0);
        })
       
        return ( arrangedEmployees && setEmployees(arrangedEmployees) )
    }    

return (
    <div className={"ArrangeSelectors"}>
        <div className={"arrangeTitle"}>Select title to arrange
            <select onChange={(e) => HandleArrange(e.target.value)}>
                <option key={"name"} value={"name"}>Default</option>
                <option key={"first_name"} value={"first_name"}>First name</option>
                <option key={"last_name"} value={"last_name"}>Last name</option>
                <option key={"middle_name"} value={"middle_name"}>Middle name</option>
                <option key={"position"} value={"position"}>Position</option>
                <option key={"level"} value={"level"}>Level</option>
            </select>
        </div>
    </div>

)

}

export default ArrangeSelectors