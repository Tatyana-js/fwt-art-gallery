import { FC } from 'react'
import clsx from 'clsx'
import type { theme } from '@/types/types'
import styles from './Button.module.scss'

type ButtonVariant = 'defaultButton' | 'text' | 'icon' | 'circleIcon'

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: ButtonVariant
  theme: theme
}

const Button: FC<ButtonProps> = ({ variant, children, theme, ...props }) => (
  <button
    className={clsx(styles[variant], styles[`${variant}--${theme}`])}
    type="button"
    {...props}
  >
    {children}
  </button>
)

export default Button
