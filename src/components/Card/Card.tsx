import {FC, useState} from "react";
import {Stack} from "@mui/material";
import {FaComments, FaEdit, FaTrash, FaHeart} from 'react-icons/fa'
import {CardProps} from "./Card.props.ts";
import Button from "../button";
import styles from './Card.module.scss'
import {clsx} from "clsx";

export const Card: FC<CardProps> = ({post, user, comments}) => {
  const [showComments, setShowComments] = useState<boolean>(false)
  // const [commentBtnActive, setCommentBtnActive] = useState<boolean>(false)

  const commentHandler = () => {
    setShowComments(!showComments)

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
            <Button className={clsx(styles.button, showComments ? styles.commentBtnActive : styles.commentBtn)}
                    onClick={commentHandler}>
              <FaComments className={clsx(showComments ? styles.commentActive : styles.comment)}/>
            </Button>
            <Button className={clsx(styles.button, styles.editBtn)}>
              <FaEdit className={clsx(styles.edit)}/>
            </Button>
            <Button className={clsx(styles.button, styles.deleteBtn)}>
              <FaTrash className={clsx(styles.delete)}/>
            </Button>
            <Button className={clsx(styles.button, styles.favoriteBtn)}>
              <FaHeart className={clsx(styles.favorite)}/>
            </Button>
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
    </div>
  );
};