import {FC, useEffect, useState} from "react"
import {useParams} from "react-router-dom"
import axios from '../../../api/axios.ts'
import styles from './Photo.module.scss'

interface IPhoto {
  albumId: number
  id: number
  title: string
  url: string
  thumbnailUrl: string
}

export const Photo: FC = () => {
  const {id} = useParams()
  // const [photo, setPhoto] = useState<IPhoto>(null)
  const [photos, setPhotos] = useState<IPhoto[]>([])
  // console.log(photo)

  // const getPhotoById = async (id: string | number) => {
  //   try {
  //     const respose = await axios.get<IPhoto>(`photos/${id}`)
  //     console.log(respose)
  //     setPhoto(respose?.data)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  const getPhotos = async () => {
    try {
      const respose = await axios.get<IPhoto[]>(`photos`)
      console.log(respose)
      setPhotos(respose?.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    // getPhotoById(id as string)
    getPhotos()
  }, [id])

  return (
    <div className={styles.wrap}>
      {photos
        ?.filter(photo => photo.albumId === parseInt(id as string))
        ?.map(photo =>
          <div className={styles.photo} key={photo.id}>
            <img className={styles.img} src={photo.url} alt={`image`}/>
            <h1 className={styles.title}>{photo.title}</h1>
          </div>
        )}
    </div>
  )
};