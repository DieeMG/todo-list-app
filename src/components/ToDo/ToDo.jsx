import React, { useState } from "react";
//import { TaskCard } from "../Card/Card";
import {MdDelete , MdFormatListBulleted, MdAddTask} from 'react-icons/md';
import { BiTaskX, BiTask } from "react-icons/bi";
import useForm from "../../hooks/useForm";
import { inputForm } from "./helpers/inputForm";


export const ToDo = () => {
    
    const { form, setForm, handleChange, handleSubmit } = useForm(inputForm);
    
    const [id, setId] = useState(0);
    const [tasks, setTasks] = useState([]);

    const newTask = () => {  
        setId(id + 1);

        const task = {            
            id: id,
            taskSaveName: form.taskName,
            taskSaveDesc: form.taskDesc,
            taskSaveStatus: false
        }

        return task;
    };

    const addTask = () => {
        const task = newTask();
        setTasks([ ...tasks, task ]);

        setForm({
            taskName: '',
            taskDesc: ''
        });
        
        console.log(tasks);
    };

    const deleteTask = (id) => {
        const taskFilter = tasks.filter((task) => task.id !== id); //muestra todas las task menos la id que pase
        setTasks(taskFilter);
    };

    const completedTask = (id) => {
        const taskFilter = tasks.map((task) => {
            if ( task.id === id ) {
                task.taskSaveStatus = ! task.taskSaveStatus;
            }
            return task;
        });
        setTasks(taskFilter);
    };

    let dNone = '';
    
    if ( tasks.length > 0 ) {
        dNone = 'd-none';
    } else {
        dNone = '';
    }

    return(
        <div className="main-layout">
        <form onSubmit={(e) => {handleSubmit(e , addTask)}} className="inputTask">
            <div className="inputTask__box">
                <div className="form__container" >
                    <input className="form__container__input shadow-sm" type="text" name="taskName" id="" placeholder="Nombre de la tarea" value={form.taskName} onChange={handleChange} required/>
                    <label className="form__container__label" htmlFor="taskName">Nombre de la tarea</label>
                </div>
                <div className="form__container" >
                    <textarea className="form__container__input shadow-sm" name="taskDesc" id="" rows="3" placeholder="Descripción de la tarea" value={form.taskDesc} onChange={handleChange} required></textarea>
                    <label className="form__container__label" htmlFor="taskDesc">Descripción de la tarea</label>
                </div>
            </div>
            <div className="inputTask__button">
                <button className="inputTask__button-single" type="submit" ><MdAddTask></MdAddTask></button>
            </div>

        </form>

        <div className="tasks__container">
        
        <h2 className="tasks__title"><MdFormatListBulleted></MdFormatListBulleted> Lista de Tareas </h2>
        
        <p className={dNone}>No hay tareas pendientes</p>

            {tasks.map((task) => {

                let state = task.taskSaveStatus;
                let iconList = <BiTask />

                let completed = 'task__box';
                if ( state ) {
                    completed = 'task__box task__completed';
                    iconList = <BiTaskX />;
                } 

                return (
                    <div className="task">
                        <div className={completed}>
                            <h4 className="task__box-margin">{task.taskSaveName}</h4>
                            <p className="task__box-margin">{task.taskSaveDesc}</p>
                        </div>
                        <div className="task__buttons">
                            <button className="task__buttons-single" onClick={() => {completedTask(task.id)}}>{iconList}</button>
                            <button className="task__buttons-single" onClick={()=>{deleteTask(task.id)}}><MdDelete></MdDelete></button>
                        </div>
                    </div>
                );
            })}
        </div>


        </div>

    );
};

