import notFoundImg from '../../assets/images/notFoundImg.svg'
import styles from './Page404.module.scss'
import {Button} from '../../components'
import { useNavigate } from 'react-router-dom'

export const Page404 = () => {
  const navigate = useNavigate()

  return (
    <section className={styles.page404}>
      <div className={styles.wrapper}>
        <div className={styles.img}>
          <img
            className={styles.imgItem}
            src={notFoundImg}
            alt='notFound-img'
          />
        </div>
        <Button onClick={() => navigate(-1)} className={styles.button}>
          Вернуться назад
        </Button>
      </div>
    </section>
  )
}
