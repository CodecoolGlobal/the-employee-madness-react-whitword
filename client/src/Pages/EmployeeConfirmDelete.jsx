// import { useState } from "react";
import "./EmployeeConfirmDelete.css";

function ConfirmDeleteModal({ show, setShow, onDelete, id }) {
        return (
            <>
                <div className={show ? "modal" : "modal hidden"}>
                    <div className="singleCard">
                        <p><b>Are you sure?</b></p>
                        <button onClick={() => {onDelete(id); setShow(false)} }>
                            Delete
                        </button>
                        <button onClick={()=>{setShow(false)}}>
                            Cancel
                        </button>
                    </div>
                </div>
            </>
        );
    }

    export default ConfirmDeleteModal