import {useEffect, useState} from "react"
import axios from '../../api/axios'
import {Container, Pagination, Stack} from "@mui/material";
import {AlbumCard, DefaultSelect} from "../../components";
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
  const [albums, setAlbums] = useState<IAlbums[]>([])
  const [users, setUsers] = useState<IUser[]>([])

  const lmt: string | null | number = localStorage.getItem('lmt')
  const [limit, setLimit] = useState<number>(parseInt(lmt as string) || 10)

  const [page, setPage] = useState<number>(1)

  const qyt: string | null | number = localStorage.getItem('qyt')
  const [pageQyt, setPageQyt] = useState<number>(parseInt(qyt as string) || 10)

  if (pageQyt < page) {
    setPage(1)
  }

  console.log('albums', albums)
  console.log('users', users)

  const getAlbums = async (): Promise<void> => {
    try {
      const response = await axios.get<IAlbums[]>(`albums?_page=${page}&_limit=${limit}`)
      setAlbums(response?.data)
      console.log(response)
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
  }, [page, limit])

  return (
    <div className={styles.wrap}>
      <Stack spacing={3}>
        <Container maxWidth={'sm'}>
          <div className={styles.albums}>
            {albums?.map(album => {
                const user = users?.find(user => {
                  if (user.id === album.userId) {
                    return user
                  }
                })

                return (
                  <AlbumCard key={album.id} album={album} user={user as IUser}/>
                )
              }
            )}
          </div>
        </Container>

        <div className={styles.pagination}>
          <Pagination
            count={pageQyt}
            page={page as number}
            variant="outlined"
            color="primary"
            showFirstButton
            showLastButton
            onChange={(_, num) => setPage(num)}
          />
          <DefaultSelect limit={`${limit}`} setLimit={setLimit} setPageQyt={setPageQyt}/>
        </div>
      </Stack>
    </div>
  );
};