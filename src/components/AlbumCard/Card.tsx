import {FC} from "react"
import {CardProps} from './Card.props.ts'
import styles from './Card.module.scss'

export const AlbumCard: FC<CardProps> = ({album, user}) => {
  return (
    <div className={styles.card}>
      <div className={styles.usernameBox}>
        <h5 className={styles.username}>{user?.username}</h5>
      </div>
      <h3 className={styles.title}>{album?.title}</h3>
    </div>
  );
};