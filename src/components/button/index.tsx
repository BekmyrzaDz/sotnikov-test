import { ButtonProps } from './Button.props'
import styles from './Button.module.scss'
import { clsx } from 'clsx'

export const Button = ({ children, className, ...props }: ButtonProps) => {
  return (
    <button {...props} className={clsx(styles.button, className)}>
      {children}
    </button>
  )
}
