import { useState, useEffect } from "react";

const Tools = () => {
    const [tools, setTools] = useState();
    const [toolName, setToolName] = useState("");
    const [toolWeight, setToolweight] = useState("");
    const [filteredTools, setFilteredTools] = useState("");

    useEffect(() => {
        fetch(`/tools/`)
            .then((res) => res.json())
            .then((res) => {setTools(res); setFilteredTools(res)})
        return () => {

        };
    }, []);

    const HandleFilter = (value) =>{
        const newFilteredList = tools.filter((e)=> e.name.toLowerCase().includes(value.toLowerCase()))
        setFilteredTools(newFilteredList)
    }

    const HandleInput = (value, input) => {
        if (input === "name") setToolName(value)
        if (input === "weight") setToolweight(value)
    }

    const HandleSubmit = () => {
        const newTool = {
            name: toolName,
            weight: toolWeight,
        }
        setToolName('');
        setToolweight('')
        const newTools = [...tools, newTool]

        fetch("/tools", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newTool),
        }).then((res) => res.json())
            .then((res) => console.log(res))
            .then((res)=> setFilteredTools(newTools))
    }

    return (
        <>
            {filteredTools &&
                <div style={{ width: 500, fontSize: 15, margin: "auto" }}>
                    <h1 style={{ textAlign:"center"}}>Tools</h1>
                    <input style={{ marginLeft:150, width: 150,}} placeholder={"filter by name"} onChange={(e)=>HandleFilter(e.target.value)}></input>
                    {filteredTools.map((tool, index) =>
                        <div style={{ marginLeft: 100, padding: 10 }} key={index} >name: {tool.name} --- weight: {tool.weight}kg</div>
                    )}
                    <form style={{ width: 200, fontSize: 20, margin: "auto" }} onSubmit={(e) => { e.preventDefault() }}>
                        <h2>Add new tool</h2>
                        <input id="name" value={toolName} placeholder={"Tool name"} onChange={(e) => { HandleInput(e.target.value, "name") }}></input>
                        <input id="weight" value={toolWeight} placeholder={"Tool weight"} onChange={(e) => { HandleInput(e.target.value, "weight") }}></input>
                        <button style={{ margin: "auto" }} onClick={HandleSubmit}>Save</button>
                    </form>
                </div>
            }
        </>
    )

}

export default Tools;