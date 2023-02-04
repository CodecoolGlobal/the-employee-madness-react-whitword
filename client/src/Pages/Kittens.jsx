import { useState, useEffect } from "react";
import { Link } from "react-router-dom";


const Kittens = () => {

    const [kittens, setkittens] = useState([]);

    useEffect(() => {
        fetch("/api/kittens")
            .then((res) => res.json())
            .then((res) => setkittens(res))
    }, []);

    return ( 
        <>
        {kittens &&
        <table>
            <thead>
                <tr>
                <th>Name</th>
                <th>Weight</th>
                <th>Owner</th>
                <th />
                </tr>
            </thead>
            <tbody>
                {kittens.map((kitty, index) =>(
                <tr key={kitty._id}>
                    <td>{kitty.name}</td>
                    <td>{kitty.weight}kg</td>
                    <td>
                    <Link to={`/kittens/${kitty.employee}`}>
                    <button type="button">Owner</button>
                    </Link>
                    </td>
                </tr>
                ))}
            </tbody>                                                                    
        </table>
        }
        </>
     );
}
 
export default Kittens;