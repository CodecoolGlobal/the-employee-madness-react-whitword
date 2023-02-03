import { useState, useEffect } from "react";

const TrainingSessions = () => {

    const [trainings, setTrainings] = useState();

    useEffect(() => {
        fetch("/api/trainings")
            .then((res) => res.json())
            .then((res) => setTrainings(res))

        // return () => {
        // };
    }, []);

    const [newTraining, setNewTraining] = useState({title: "", difficulty: ""})
    const [select, setSelect] = useState(null)

    const HandleSubmit = () => {
        setTrainings([...trainings, newTraining])

            fetch("/api/trainings", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(newTraining),
              }).then((res) => res.json())
              .then((res)=> console.log(res))
    }
    const HandleCheckBox = (select) => {
        const copyOfNewTraining = {...newTraining}
        copyOfNewTraining.difficulty = select
        setSelect(select)
        setNewTraining(copyOfNewTraining)
    }
    const HandleInput = (input) => {
        const copyOfNewTraining = {...newTraining}
        copyOfNewTraining.title = input
        setNewTraining(copyOfNewTraining)
    }
    return (
        <>
        { trainings &&
        <div style={{width:500, fontSize:20, margin:"auto"}}>
            <h1>Training sessions</h1>
            <ul>{trainings.map((training, index) =>
                <li key={index}>{training.title} --- {training.difficulty}</li>)}
            </ul>
            </div>}
            <form style={{width:500, fontSize:20, margin:"auto"}} onSubmit={(e)=>{e.preventDefault(); HandleSubmit()}}>
                <input onChange={(e)=>{HandleInput(e.target.value)}}></input>
               <div style={{margin:"auto", display:"flex", flexWrap:"wrap"}}>
                <input type={"radio"} checked={select==="beginner"} id={"beginner"} value={"beginner"} onChange={() => HandleCheckBox("beginner")}></input>
                <label>beginner</label>
                <input type={"radio"} checked={select==="intermediate"} id={"intermediate"} value={"intermediate"} onChange={() => HandleCheckBox("intermediate")}></input>
                <label>intermediate</label>
                <input type={"radio"} checked={select==="advanced"} id={"advanced"} value={"advanced"} onChange={() => HandleCheckBox("advanced")}></input>
                <label>advanced</label>
               </div>
                <input style={{width:200, fontSize:20, margin:"auto"}} type="submit" value="Submit"/>
            </form>
            </>
            );
}

            export default TrainingSessions;