import {useEffect, useState} from "react"
import axios from '../../api/axios'

interface IPhotos {
  userId: number
  id: number
  title: string
}

export const Photos = () => {
  const [photos, setPhotos ] = useState<IPhotos[]>([])
  console.log('photos', photos)

  useEffect(() => {
    const getPhotos = async (): Promise<void> => {
      try {
        const response = await axios.get<IPhotos[]>(`albums`)
        setPhotos(response?.data)
        console.log(response)
        // response?.data?.map((post) => localStorage.setItem(``, null))
      } catch (error) {
        console.log(error)
      }
    }

    getPhotos()
  }, [])

  return (
    <div>
      <h1>Photos page</h1>

    </div>
  );
};