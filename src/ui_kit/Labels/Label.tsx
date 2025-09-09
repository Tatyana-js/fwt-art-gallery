import { FC } from 'react'
import type { theme } from '@/types/types'
import clsx from 'clsx'
import styles from './Label.module.scss'
import ClearIcon from '@/assets/icons/clearIcon'

export interface LabelProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    theme: theme
    onClick?: () => void
}

const Label: FC<LabelProps> = ({ theme, children, onClick, ...props }) => {
    const labelClass = clsx(styles.label, styles[`label--${theme}`])
    return (
        <button
            className={labelClass}
            type="button"
            {...props}
            onClick={onClick}
        >
            {children}
            {onClick && <ClearIcon />}
        </button>
    )
}
export default Label
