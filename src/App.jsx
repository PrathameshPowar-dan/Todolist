import { useState, useEffect } from 'react'
import { RiDeleteBin6Fill } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
import { v4 as uuidv4 } from 'uuid';
uuidv4()
import './App.css'
import Navbar from './components/navbar'

function App() {
  const [Todo, setTodo] = useState("")
  const [Todos, setTodos] = useState([])
  const [SF, setSF] = useState(true)
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    let TodoString = localStorage.getItem("Todos")
    if (TodoString) {
      let Todos = JSON.parse(localStorage.getItem("Todos"))
      setTodos(Todos)
    }
  }, [])


  const save = () => {
    localStorage.setItem("Todos", JSON.stringify(Todos))
  }

  const togF = (e) => {
    setSF(!SF)
  }

  const AddTodo = () => {
    if (editingId) {
      const updatedTodos = Todos.map(todo =>
        todo.id === editingId ? { ...todo, Todo } : todo
      );
      setTodos(updatedTodos);
      setEditingId(null);
    } else {
      setTodos([...Todos, { id: uuidv4(), Todo, isCompleted: false }]);
    }
    setTodo("");
    save()
  };


  const InChange = (e) => {
    setTodo(e.target.value)
  }

  const CheckChange = (e) => {
    let id = e.target.name
    let index = Todos.findIndex(item => {
      return item.id === id;
    })
    let newTodos = [...Todos]
    newTodos[index].isCompleted = !newTodos[index].isCompleted
    setTodos(newTodos)
    save()
  }

  const DelTodo = (e, id) => {
    if (confirm("Are you sure you want to delete this todo?")) {
      setTodos(Todos.filter(item => item.id !== id));
    }
    save()
  }

  const EditTodo = (e, id) => {
    const t = Todos.find(i => i.id === id);
    setTodo(t.Todo);
    setEditingId(id);
    save()
  };


  return (
    <>
      <div className='w-screen h-screen flex flex-col items-center gap-5'>
        <Navbar />
        <div className="container flex flex-col items-center w-5/6 md:w-2/4 h-10/12 bg-blue-200 rounded-2xl">
          <div className="w-full additon flex items-center flex-col">
            <p className='text-xl font-semibold' style={{ padding: " 8px 0px" }}>Manage your activity in here</p>
            <div className='w-full flex flex-col items-start' style={{ padding: "0px 14px" }}>
              <p className='text-lg font-semibold'>Add Todo</p>
              <div className='w-full flex flex-col gap-2.5'>
                <div className='w-full flex gap-4'>
                  <input type="text" onChange={InChange} value={Todo} placeholder='Wanna Add a Task?' id='add-bar' className='w-[80%] bg-white rounded-xl text-black text-base placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500' style={{ padding: "4px" }} />
                  <button type="button" onClick={AddTodo} disabled={Todo.length <= 2} className='add w-[14%] bg-blue-500 hover:bg-blue-700 rounded-xl' style={{ padding: "4px" }}>{editingId ? "Save" : "Add"}</button>
                </div>
                <div className="boxes w-full flex items-center gap-0.5">
                  <input type="checkbox" onChange={togF} checked={SF} name="Finished" id="showFinished" />
                  <label htmlFor="checkbox" className='text-sm font-medium'>Show Finished</label>
                </div>
              </div>
            </div>
          </div>
          <div className="blank h-0.5 w-11/12 bg-gray-600" style={{ margin: "10px 0px" }}></div>
          <div className="todos w-11/12 h-8/12 overflow-hidden">
            <p className='text-lg font-semibold'>Your Todos</p>

            <ul className='Todo overflow-y-auto flex flex-col gap-1.5 h-full'>
              {Todos.length === 0 && <div className='m-5'>No Todos to display</div>}
              {Todos.map(item => {
                return (SF || !item.isCompleted) && (<li key={item.id} className='flex justify-between break-words whitespace-normal hover:bg-blue-300 rounded-sm'>
                  <div className='flex items-center gap-1'>
                    <input type="checkbox" onChange={CheckChange} name={item.id} checked={item.isCompleted} />
                    <p className={item.isCompleted ? "line-through" : ""}>{item.Todo}</p>
                  </div>
                  <div className="changes w-fit flex gap-3">
                    <button type="button" onClick={(e) => { DelTodo(e, item.id) }} className='flex justify-center items-center h-7 w-7 bg-blue-400 rounded-sm'><RiDeleteBin6Fill /></button>
                    <button type="button" onClick={(e) => { EditTodo(e, item.id) }} className='flex justify-center items-center h-7 w-7 bg-blue-400 rounded-sm'><FaEdit /></button>
                  </div>
                </li>)
              })}
            </ul>

          </div>
        </div>
      </div>
    </>
  )
}

export default App
