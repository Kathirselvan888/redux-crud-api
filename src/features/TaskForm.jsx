import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createTaskAsync, updateTaskAsync } from './TaskActions'

const TaskForm = () => {
  const [task, setTask] = useState({ name: '', completed: false })
  const { editTask } = useSelector((state) => state.tasks)
  const dispatch = useDispatch()

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setTask({ ...task, [name]: type === 'checkbox' ? checked : value })
  }

  useEffect(() => {
    if (editTask) {
      setTask(editTask)
    }
  }, [editTask])

  const handleClick = (e) => {
    e.preventDefault()
    if (editTask._id) {
      dispatch(updateTaskAsync({ id: editTask._id, updatedTask: task }))
    } else {
      dispatch(createTaskAsync(task))
    }
  }

  return (
    <form>
      <label>Name</label>
      <input
        type='text'
        onChange={handleChange}
        name='name'
        value={task.name}
      />
      <label>
        Completed{' '}
        <input
          type='checkbox'
          name='completed'
          onChange={handleChange}
          checked={task.completed}
        />
      </label>
      <button onClick={handleClick}>Submit</button>
    </form>
  )
}

export default TaskForm
