import {FC, useState} from "react"
import {FaComments, FaEdit, FaTrash, FaHeart} from 'react-icons/fa'
import {clsx} from "clsx"
import axios from "../../api/axios.ts"
import {CardProps, IPost, IUser} from "./Card.props.ts"
import {Stack, TextField} from "@mui/material"
import {Modal} from '../ModalPopup/Modal.tsx'
import {Button} from "../button"
import styles from './Card.module.scss'

export const Card: FC<CardProps> =
  ({
     post,
     setPosts,
     user,
     setUsers,
     comments,
     favArr,
     setFavArray
   }) => {
    const [showComments, setShowComments] = useState<boolean>(false)
    const [active, setActive] = useState<boolean>(false)
    const [deleteActive, setDeleteActive] = useState<boolean>(false)

    const [title, setTitle] = useState<string>(post?.title as string)
    const [body, setBody] = useState<string>(post?.body as string)
    const [username, setUsername] = useState<string>(user?.username as string)

    const editPostById = async (id: number, data: IPost): Promise<void> => {
      try {
        const response = await axios.patch<IPost>(`posts/${id}`, data)
        console.log(response)
      } catch (error) {
        console.log(error)
      }
    }

    const editUserById = async (id: number, data: IUser): Promise<void> => {
      try {
        const response = await axios.patch<IUser>(`users/${id}`, data)
        console.log(response)
      } catch (error) {
        console.log(error)
      }
    }

    const deleteUserById = async (id: number): Promise<void> => {
      try {
        const response = await axios.delete<number>(`users/${id}`)
        console.log(response)
      } catch (error) {
        console.log(error)
      }
    }

    const commentHandler = (): void => {
      setShowComments(!showComments)
    }

    const editHandler = (): void => {
      setActive(true)
    }

    const deleteHandler = (): void => {
      setPosts(prevState => prevState.filter(item => item.id !== post.id))
      deleteUserById(post.id as number)
      setDeleteActive(false)
    }

    const onSubmit = (): void => {
      setPosts(prevState =>
        prevState.map(item =>
          item.id === post.id
            ? {...item, title, body}
            : item)
      )

      setUsers(prevState =>
        prevState.map(item =>
          item.id === user.id
            ? {...item, username}
            : item)
      )

      const newPost: IPost = {
        ...post,
        title,
        body
      }

      const newUser: IUser = {
        ...user,
        username,
      }

      editPostById(post.id as number, newPost)
      editUserById(user.id as number, newUser)

      setActive(false)
    }

    const favKey = "favorites"
    const [isFav, setIsFav] = useState<boolean>(favArr.includes(post?.id as number))

    const addFavorite = (item: number): void => {
      const newState = [...favArr, item]

      setFavArray(newState)
      localStorage.setItem(favKey, JSON.stringify(newState))
      setIsFav(true)
    }

    const removeFavorite = (item: number): void => {
      const newState = favArr.filter(f => f !== item)

      setFavArray(newState)
      localStorage.setItem(favKey, JSON.stringify(newState))
      setIsFav(false)
    }

    return (
      <div className={styles.card}>
        <Stack spacing={2}>
          <div className={styles.top}>
            <div className={styles.content}>
              <div className={styles.usernameBox}>
                <h5 className={styles.username}>{user?.username}</h5>
              </div>
              <h3 className={styles.title}>{post?.title}</h3>
              <p className={styles.body}>{post?.body}</p>
            </div>
            <div className={styles.btns}>
              <Button
                className={clsx(styles.button, showComments ? styles.commentBtnActive : styles.commentBtn)}
                onClick={commentHandler}>
                <FaComments className={clsx(showComments ? styles.commentActive : styles.comment)}/>
              </Button>
              <Button className={clsx(styles.button, styles.editBtn)} onClick={editHandler}>
                <FaEdit className={clsx(styles.edit)}/>
              </Button>
              <Button className={clsx(styles.button, styles.deleteBtn)} onClick={() => setDeleteActive(true)}>
                <FaTrash className={clsx(styles.delete)}/>
              </Button>
              {!isFav && (
                <Button className={clsx(styles.button, styles.favoriteBtn)}
                        onClick={() => addFavorite(post?.id as number)}>
                  <FaHeart className={clsx(styles.favorite)}/>
                </Button>
              )}
              {isFav && (
                <Button className={clsx(styles.button, styles.favoriteRedBtn)}
                        onClick={() => removeFavorite(post.id as number)}>
                  <FaHeart className={clsx(styles.favorite)}/>
                </Button>
              )}
            </div>
          </div>

          {showComments && (
            <div className={styles.wrap}>
              {comments.map(comment => (
                <div className={styles.comment}>
                  <div className={styles.emailBox}>
                    <h3 className={styles.email}>{comment.email}</h3>
                  </div>
                  <h3 className={styles.name}>{comment.name}</h3>
                  <p className={styles.body}>{comment.body}</p>
                </div>
              ))}
            </div>
          )}
        </Stack>

        {active && (
          <Modal active={active} setActive={setActive}>
            <div className={styles.modalWrap}>
              <div className={styles.top}>
                <TextField type={`text`} value={title} onChange={e => setTitle(e.target.value)}/>
                <TextField type={`text`} value={body} onChange={e => setBody(e.target.value)}/>
                <TextField type={`text`} value={username} onChange={e => setUsername(e.target.value)}/>
              </div>
              <div className={styles.modalBtns}>
                <div className={styles.saveBtn}>
                  <Button onClick={onSubmit}>
                    <p>Save</p>
                  </Button>
                </div>
                <div className={styles.closeBtn}>
                  <Button onClick={() => setActive(false)}>
                    <p>Close</p>
                  </Button>
                </div>
              </div>
            </div>
          </Modal>
        )}

        {deleteActive && (
          <Modal active={deleteActive} setActive={setDeleteActive}>
            <div className={styles.deleteModalWrap}>
              <h2 className={styles.title}>Want to delete this post?</h2>
              <div className={styles.modalBtns}>
                <div className={styles.saveBtn}>
                  <Button onClick={deleteHandler}>
                    <p>Delete</p>
                  </Button>
                </div>
                <div className={styles.closeBtn}>
                  <Button onClick={() => setDeleteActive(false)}>
                    <p>Cancel</p>
                  </Button>
                </div>
              </div>
            </div>
          </Modal>
        )}
      </div>
    );
  };