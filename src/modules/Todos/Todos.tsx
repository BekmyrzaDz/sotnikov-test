import {useEffect, useState} from "react"
import axios from '../../api/axios'

interface ITodos {
  body: string
  id: number
  title: string
  userId: number
}

export const Todos = () => {
  const [todos, setTodos ] = useState<ITodos[]>([])
  console.log(todos)

  useEffect(() => {
    const getTodos = async (): Promise<void> => {
      try {
        const response = await axios.get<ITodos[]>(`posts`)
        setTodos(response?.data)
        console.log(response)
        // response?.data?.map((post) => localStorage.setItem(``, null))
      } catch (error) {
        console.log(error)
      }
    }

    getTodos()
  }, [])

  return (
    <div>
      <h1>Todos page</h1>

    </div>
  );
};