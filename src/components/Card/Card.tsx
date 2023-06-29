import {FC} from "react";
import {FaComments, FaEdit, FaTrash, FaHeart} from 'react-icons/fa'
import styles from './Card.module.scss'
import {CardProps} from "./Card.props.ts";
import Button from "../button";

export const Card: FC<CardProps> = ({post, user}) => {
  return (
    <div className={styles.card}>
      <div className={styles.content}>
        <h3 className={styles.title}>{post?.title}</h3>
        <p className={styles.body}>{post?.body}</p>
        <h5 className={styles.username}>{user?.username}</h5>
      </div>
      <div className={styles.btns}>
        <Button className={styles.button} >
          <FaComments className={styles.comment}/>
        </Button>
        <Button className={styles.button} >
          <FaEdit className={styles.edit}/>
        </Button>
        <Button className={styles.button} >
          <FaTrash className={styles.delete}/>
        </Button>
        <Button className={styles.button} >
          <FaHeart className={styles.favorite}/>
        </Button>
      </div>
    </div>
  );
};