import {FC} from "react"
import {CardProps} from './Card.props.ts'
import styles from './Card.module.scss'

export const AlbumCard: FC<CardProps> =
  () => {


    return (
      <div className={styles.card}>
        <h1>Album Card</h1>
      </div>
    );
  };