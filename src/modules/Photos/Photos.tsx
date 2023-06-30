import {useEffect, useState} from "react"
import axios from '../../api/axios'
import styles from './Photos.module.scss'

interface IAlbums {
  userId: number
  id: number
  title: string
}

interface IUser {
  id: number
  name: string
  username: string
  email: string
  address: {
    street: string
    suite: string
    city: string
    zipcode: string
    geo: {
      lat: string
      lng: string
    }
  }
  phone: string
  website: string
  company: {
    name: string
    catchPhrase: string
    bs: string
  }
}

export const Photos = () => {
  const [albums, setAlbums ] = useState<IAlbums[]>([])
  const [users, setUsers] = useState<IUser[]>([])

  console.log('albums', albums)
  console.log('users', users)

  const getAlbums = async (): Promise<void> => {
    try {
      const response = await axios.get<IAlbums[]>(`albums`)
      setAlbums(response?.data)
      console.log(response)
      // response?.data?.map((post) => localStorage.setItem(``, null))
    } catch (error) {
      console.log(error)
    }
  }

  const getUsers = async (): Promise<void> => {
    try {
      const response = await axios.get<IUser[]>(`users`)
      setUsers(response?.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getAlbums()
    getUsers()
  }, [])

  return (
    <div className={styles.albums}>
      <h1>Albums</h1>
    </div>
  );
};