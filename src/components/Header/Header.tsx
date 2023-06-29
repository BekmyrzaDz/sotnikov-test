import {NavLink} from "react-router-dom";
import styles from './Header.module.scss'

const setActive = ({ isActive }: {isActive: boolean}) => isActive ? styles.active : ''

export const Header = () => {
  return (
    <div className={styles.root}>
     <NavLink to={`/`} className={setActive}>Posts</NavLink>
     <NavLink to={`/albums`} className={setActive}>Photos</NavLink>
     <NavLink to={`/todos`} className={setActive}>Todos</NavLink>
    </div>
  );
};