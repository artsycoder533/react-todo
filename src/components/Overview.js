import React from "react";
import { FiEdit3 } from "react-icons/fi";
import { FiTrash2 } from "react-icons/fi";
import { FiCheck } from "react-icons/fi";
import { FiCheckCircle } from "react-icons/fi";

const Overview = (props) => {
    const { tasks, count, deleteTask, allowEdit, handleEditChange, replaceTask} = props;

    //if isEditable is true rerender and swap out span for an input with value of the task that was clicked to be edited
    const showInput = (isEditable, message, id) => {
        // console.log(task);
        if (isEditable === true) {
            return (
                <>
                    <input onChange={handleEditChange} type="text" placeholder={message}></input>
                    <button
                        onClick={() => replaceTask(id, message)}
                        type="submit"
                        className="btn btn-check"
                        id="check">
                        <FiCheck />
                    </button>
                </>
            );
        }
        else {
            return (
                <>
                    <span className="text">{message}</span>
                    <button
                        onClick={() => allowEdit(id, message)}
                        className="btn btn-edit"
                        id="edit">
                        <FiEdit3 />
                    </button>
                </>
            );
        }
    }

    return (
        <ul>
            {tasks.map((task, index) => {
                return (
                    <li key={task.id}>
                        <span className="count">({index + 1}/{count}) - </span>
                        {showInput(task.isEditable, task.message, task.id, index)}
                        <button onClick={() => deleteTask(task.id)}className="btn btn-delete" id="delete">
                            <FiTrash2 />
                        </button>
                    </li>
                )
            })}
        </ul>
    );
};

export default Overview;