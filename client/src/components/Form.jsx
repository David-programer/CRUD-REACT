import {useState, useEffect} from 'react';
import '../styles/form.css';
import config from '../config.js'

const Formulario = () => {
    const [tasks, setTasks] = useState([]);
    const [task, setTask] = useState('');

    useEffect(() => {
        const readTask = async () =>{
            const request = await fetch(`${config.server}/task`);
            const respuesta = await request.json();
            setTasks(respuesta);
        }
        readTask();
    },[]);

    const readTask = async () =>{
        const request = await fetch(`${config.server}/task`);
        const respuesta = await request.json();
        setTask(respuesta);
    }

    const createTask = async (e) =>{
        e.preventDefault();
        if(!task.trim()) return alert('Ingrese correctamente todos los campos');

        const request = await fetch(`${config.server}/task`, {
            method: 'POST',
            body: JSON.stringify({text: task}),
            headers: {'Content-Type': 'application/json'}
        });

        const respuesta = await request.json();

        setTasks([
            ...tasks,
            {_id: respuesta._id, text: respuesta.text}
        ]);
        setTask('');
    }

    const dropTask = async (id) =>{
        await fetch(`${config.server}/task`, {
            method: 'DELETE',
            body: JSON.stringify({id}),
            headers: {'Content-Type': 'application/json'}
        })

        const tasksFilter = tasks.filter(item => item._id !== id);
        setTasks(tasksFilter);
    }

    const editTask = async (value, item) =>{
        await fetch(`${config.server}/task`, {
            method: 'PUT',
            body: JSON.stringify({id: item.id, text: value} ),
            headers: {'Content-Type': 'application/json'}
        });

        const taskEdit = tasks.map(element => element._id === item._id ? {_id: item._id, text: value} : element)
        setTasks(taskEdit);
    }

    return (
        <div className="crud-container">
            <div className="form">
                <form onSubmit={createTask}>
                    <input type="text" placeholder="Tarea" onChange={e => setTask(e.target.value)} value={task}/>
                    <button type="submit">AGREGAR</button>
                </form>
            </div>
            <div className="task">
                {tasks.length === 0 ? <ul>No hay tareas</ul> : null }
                <ul>
                    {
                        tasks.map(item => (
                            <li key={item._id}>
                                <input type="text" value={item.text} onChange={e => editTask(e.target.value ,item)}/>
                                <button onClick={()=> dropTask(item._id)}>Eliminar</button>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    )
}

export default Formulario
