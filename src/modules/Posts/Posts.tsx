import {useEffect, useState} from "react"
import axios from '../../api/axios'
import {Container, Pagination, Stack} from '@mui/material'
import {Card, DefaultSelect} from "../../components"
import styles from './Posts.module.scss'

interface IPost {
  body: string
  id: number
  title: string
  userId: number
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

interface IComment {
  postId: number
  id: number
  name: string
  email: string
  body: string
}

export const Posts = () => {
  const [posts, setPosts] = useState<IPost[]>([])
  const [users, setUsers] = useState<IUser[]>([])
  const [comments, setComments] = useState<IComment[]>([])

  const lmt: string | null | number = localStorage.getItem('lmt')
  const [limit, setLimit] = useState<number>(parseInt(lmt as string) || 10)

  const [page, setPage] = useState<number>(1)

  const qyt: string | null | number = localStorage.getItem('qyt')
  const [pageQyt, setPageQyt] = useState<number>(parseInt(qyt as string) || 10)

  if (pageQyt < page) {
    setPage(1)
  }

  const favKey = "favorites"
  const favorites: number[] = JSON.parse(localStorage.getItem(favKey) as string ?? '[]')
  const [favArr, setFavArray] = useState<number[]>(favorites)

  const getPosts = async (): Promise<void> => {
    try {
      const response = await axios.get<IPost[]>(`posts?_page=${page}&_limit=${limit}`)
      setPosts(response?.data)
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

  const getComments = async (): Promise<void> => {
    try {
      const response = await axios.get<IComment[]>(`comments`)
      setComments(response?.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getPosts()
    getUsers()
    getComments()
  }, [page, limit])

  return (
    <div className={styles.posts}>
      <Stack spacing={3}>
        <Container maxWidth={`sm`}>
          <div className={styles.wrap}>
            {posts && users ? (
              <>
                {posts?.map(post => {
                  const user = users.find(user => {
                    if (user.id === post.userId) {
                      return user
                    }
                  })

                  const commentsList = comments.filter(comment => {
                    if (comment.postId === post.id) {
                      return comment
                    }
                  })

                  return (
                    <Card
                      key={post.id}
                      post={post}
                      setPosts={setPosts}
                      user={user as IUser}
                      setUsers={setUsers}
                      comments={commentsList}
                      favArr={favArr}
                      setFavArray={setFavArray}
                    />
                  )
                })}
              </>
            ) : (
              <div style={{display: 'flex', justifyContent: 'center'}}>
                <h1 style={{textAlign: 'center'}}>Loading...</h1>
              </div>
            )}
          </div>
        </Container>
        {posts && users && (
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
        )}
      </Stack>
    </div>
  );
};