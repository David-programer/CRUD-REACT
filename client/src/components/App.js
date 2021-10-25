import {useState, useEffect} from 'react';
import '../styles/App.css';
import config from '../config.js'

function App() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState('');
  const [window, setWindow] = useState(false);
  const [editarTask, setEditTask] = useState(false);
  const [taskEdit, setTaskEdit] = useState({});

  useEffect(() => {
        const readTask = async () =>{
            const request = await fetch(`${config.server}/task`);
            const respuesta = await request.json();
            setTasks(respuesta);
        }
        readTask();
  },[]);

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

  const editTask = async (value, id) =>{
        await fetch(`${config.server}/task`, {
            method: 'PUT',
            body: JSON.stringify({id, text: value} ),
            headers: {'Content-Type': 'application/json'}
        });

        const taskEdit = tasks.map(element => element._id === id ? {_id: id, text: value} : element)
        setTasks(taskEdit);
        setWindow(false);
  }

  const openEdit = item =>{
    setWindow(true)
    setTaskEdit(item)
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
                          <p>{item.text}</p>
                          <button onClick={() => openEdit(item)} className="btn-editar">Editar</button>
                          <button onClick={()=> dropTask(item._id)} className="btn-eliminar">Eliminar</button>
                      </li>
                  ))
              }
          </ul>
      </div>
      {  
        window === true ? (
          <div className="ventana-emergente">
              <div className="container-div">
                  <h2>EDITAR TAREA</h2>
                  <input placeholder={taskEdit.text} onChange={e => setEditTask(e.target.value)}></input>
                  <hr/>
                  <div>
                      <button onClick={() => setWindow(false)} className="btn-cerrar">CERRAR</button>
                      <button onClick={() => editTask(editarTask, taskEdit._id)} className="btn-guardar">GUARDAR</button>
                  </div>
              </div>
          </div>
          ): null
      }
  </div>
)}

export default App;
