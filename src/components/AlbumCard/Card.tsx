import {FC, useState} from "react"
import {CardProps, IAlbum, IUser} from './Card.props.ts'
import styles from './Card.module.scss'
import {Button} from "../button";
import {clsx} from "clsx";
import {FaEdit, FaHeart, FaTrash} from "react-icons/fa";
import axios from "../../api/axios.ts";
import {Modal} from "../ModalPopup/Modal.tsx";
import {TextField} from "@mui/material";

export const AlbumCard: FC<CardProps> =
  ({
     album,
     setAlbums,
     user,
     setUsers,
     favArr,
     setFavArray
   }) => {
    const [active, setActive] = useState<boolean>(false)
    const [deleteActive, setDeleteActive] = useState<boolean>(false)

    const [title, setTitle] = useState<string>(album?.title as string)
    // const [body, setBody] = useState<string>(post?.body as string)
    const [username, setUsername] = useState<string>(user?.username as string)

    const editPostById = async (id: number, data: IAlbum): Promise<void> => {
      try {
        const response = await axios.patch<IAlbum>(`albums/${id}`, data)
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

    const editHandler = (): void => {
      setActive(true)
    }

    const deleteHandler = (): void => {
      setAlbums(prevState => prevState.filter(item => item.id !== album.id))
      deleteUserById(album.id as number)
      setDeleteActive(false)
    }

    const onSubmit = (): void => {
      setAlbums(prevState =>
        prevState.map(item =>
          item.id === album.id
            ? {...item, title}
            : item)
      )

      setUsers(prevState =>
        prevState.map(item =>
          item.id === user.id
            ? {...item, username}
            : item)
      )

      const newAlbum: IAlbum = {
        ...album,
        title
      }

      const newUser: IUser = {
        ...user,
        username,
      }

      editPostById(album.id as number, newAlbum)
      editUserById(user.id as number, newUser)

      setActive(false)
    }

    const favKey = "albumFavorites"
    const [isFav, setIsFav] = useState<boolean>(favArr.includes(album?.id as number))

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
        <div className={styles.usernameBox}>
          <h5 className={styles.username}>{user?.username}</h5>
        </div>
        <h3 className={styles.title}>{album?.title}</h3>

        <div className={styles.btns}>
          <Button className={clsx(styles.button, styles.editBtn)} onClick={editHandler}>
            <FaEdit className={clsx(styles.edit)}/>
          </Button>
          <Button className={clsx(styles.button, styles.deleteBtn)} onClick={() => setDeleteActive(true)}>
            <FaTrash className={clsx(styles.delete)}/>
          </Button>
          {!isFav && (
            <Button className={clsx(styles.button, styles.favoriteBtn)}
                    onClick={() => addFavorite(album?.id as number)}>
              <FaHeart className={clsx(styles.favorite)}/>
            </Button>
          )}
          {isFav && (
            <Button className={clsx(styles.button, styles.favoriteRedBtn)}
                    onClick={() => removeFavorite(album.id as number)}>
              <FaHeart className={clsx(styles.favorite)}/>
            </Button>
          )}
        </div>

        {active && (
          <Modal active={active} setActive={setActive}>
            <div className={styles.modalWrap}>
              <TextField type={`text`} value={title} onChange={e => setTitle(e.target.value)}/>
              <TextField type={`text`} value={username} onChange={e => setUsername(e.target.value)}/>
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