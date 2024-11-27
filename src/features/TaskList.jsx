import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteTaskAsync, fetchTasksAsync } from './TaskActions'
import { editingTask } from './taskSlice'

const TaskList = () => {
  const {
    tasks: { tasks },
    loading,
  } = useSelector((state) => state.tasks)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchTasksAsync())
  }, [dispatch])

  const deleteTask = (id) => {
    dispatch(deleteTaskAsync(id))
  }

  const editTask = (task) => {
    dispatch(editingTask(task))
  }
  if (loading) {
    return <h3>Loading ...</h3>
  }
  return (
    <div>
      {tasks?.map((task, index) => {
        return (
          <h4 key={index}>
            {task.name} <button onClick={() => editTask(task)}>update</button>
            <button onClick={() => deleteTask(task._id)}>delete</button>
          </h4>
        )
      })}
    </div>
  )
}

export default TaskList
