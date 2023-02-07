import { useEffect, useState } from "react";



const Locations = () => {

    const [locations, setLocations] = useState()
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    useEffect(() => {
        fetch(`/locations`)
        .then((res) => res.json())
        .then((res) => setLocations(res))
        return () => {
        };
    }, []);

    const onSubmit = ()=>{
        const newLocation = {
            city,
            country
        }

        fetch("/locations/",
        {method: "POST", headers: {"Content-type": "application/json"}, 
        body: JSON.stringify(newLocation)})
       .then((res)=> res.json())
       .then((res)=> console.log(res))
   
       setCity('');
       setCountry('');
       setLocations([...locations, newLocation])
    }

    return ( 
        <>
        <h1>Locations</h1>
        {locations&&
            <ul>
                {locations.map((location, index)=>
                <li key={index}>{location.city} {location.country}</li>
                )}
            </ul>
        }
        <form onSubmit={(e)=>e.preventDefault()}>
        <label htmlFor={"city"}>Please give the city</label>
        <input id={"city"} value={city} onChange={(e)=>{setCity(e.target.value)}}></input>
        <label htmlFor={"country"}>Please give the country</label>
        <input id={"country"} value={country} onChange={(e)=>{setCountry(e.target.value)}}></input>
        <button onClick={onSubmit}>Save</button>

        </form>
        
        
        </>
     );
}
 
export default Locations;